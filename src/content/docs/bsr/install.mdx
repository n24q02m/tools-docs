---
title: Install & usage
description: Wiring bsr (Python Semantic Release action) into a repository workflow
---
`better-semantic-release` (bsr) ships as a composite GitHub Action wrapping
[python-semantic-release](https://python-semantic-release.readthedocs.io/). Add it
to a repo as one release step; it detects the next SemVer from conventional
commits, updates the changelog, tags, and publishes the GitHub release.

## Minimal wiring

```yaml
name: Release
on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  release:
    runs-on: ubuntu-24.04-arm
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
      - uses: n24q02m/better-semantic-release@<full-commit-sha> # v1.6.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

Pin the action to a full commit SHA (see [Action pinning](/bsr/pinning/) and the
[action-pin registry](/bsr/registry/)); the `# v1.6.2` comment is the recorded
version.

## Key inputs

| Input | Required | Purpose |
|---|---|---|
| `github_token` | yes | Token used to push release commits/tags and create the release |
| `config_file` | no | Custom semantic-release config (default: `pyproject.toml` in `directory`) |
| `directory` | no | Sub-directory holding the project (monorepo support) |
| `no_operation_mode` | no | `true` runs `--noop`: dry-run that still reports the next version |
| `strict` | no | Pass `--strict`: fail instead of exiting zero when no release is due |
| `prerelease` / `prerelease_token` | no | Force a prerelease cut (used by beta channels — see [Release channels](/bsr/channels/)) |
| `force` | no | Force release level: `patch`, `minor`, `major`, or `prerelease` |
| `ssh_public_signing_key` / `ssh_private_signing_key` | no | Sign the release commit with SSH |
| `verbosity` | no | Extra `-v` flags passed through (0–3) |

Commit/tag/push/changelog/build/vcs_release toggles map 1:1 onto the
python-semantic-release `version` command defaults; override only when deviating.

## Outputs

| Output | Meaning |
|---|---|
| `released` | `"true"` when a release was made |
| `version`-carrying outputs | `previous_version`, `commit_sha`, `link`, `release_notes`, `is_prerelease` |

Typical downstream use — notify or deploy on release:

```yaml
      - id: bsr
        uses: n24q02m/better-semantic-release@<full-commit-sha> # v1.6.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
      - if: steps.bsr.outputs.released == 'true'
        run: echo "released ${{ steps.bsr.outputs.link }}"
```

## Commit conventions

Versions come from conventional commits: `fix:` → patch, `feat:` → minor,
`feat!:`/`BREAKING CHANGE:` → major. Consumer repos in this stack enforce
`fix|feat`-only PR titles (see the release-ladder rule), so the PR title is the
commit message after squash and drives the bump directly.
