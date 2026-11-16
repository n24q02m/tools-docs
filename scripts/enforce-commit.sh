#!/usr/bin/env bash
# commit-msg hook: only feat:/fix: prefixes, and no AI attribution.
# AI attribution rule (user order 2026-10-30): no coding-agent harness may sign
# a commit on its own. Rejected: a trailer line (key at line start, any value)
# Co-Authored-By / Claude-Session / Generated-By / Assisted-By, and signature
# lines such as "Generated with [Claude Code]", a claude.ai/code/session_ URL or
# the noreply@anthropic.com address. Naming the tool in a subject or body is fine.
# Keep this list in step with agents/scripts/commit_msg_policy.py in .private.
MSG=$(head -1 "$1")
if ! { [[ "$MSG" =~ ^(feat|fix)(\(.+\))?:.+ ]] || [[ "$MSG" =~ ^chore\(release\):.+ ]]; }; then
  echo "ERROR: Commit blocked. Only 'feat:' and 'fix:' prefixes allowed."
  echo "Got: $MSG"
  exit 1
fi

ROBOT=$(printf '\xf0\x9f\xa4\x96')
# Comment lines (git strips them) become empty and everything from the scissors
# line on is dropped, so grep -n still reports the real line numbers.
# LC_ALL=C: match bytes, not characters. grep -i in a UTF-8 locale (Git Bash
# under pre-commit) misses the 4-byte robot emoji, so the verdict would depend
# on the committer's locale.
HIT=$(tr -d '\r' < "$1" \
  | LC_ALL=C sed -e '/^# -* >8 -* *$/,$d' -e 's/^#.*$//' \
  | LC_ALL=C grep -n -E -i \
      -e '^[[:space:]]*(co-authored-by|claude-session|generated-by|assisted-by)[[:space:]]*:' \
      -e "^[[:space:]]*([-*>][[:space:]]*)?(${ROBOT}[[:space:]]*)?generated with[[:space:]]+\\[?claude" \
      -e "${ROBOT}[[:space:]]*generated with" \
      -e 'claude\.ai/code/session_' \
      -e 'noreply@anthropic\.com' \
  | head -1)
if [ -n "$HIT" ]; then
  echo "ERROR: Commit blocked. AI attribution is not allowed in commit messages."
  echo "Remove this line (line:text): $HIT"
  exit 1
fi
exit 0
