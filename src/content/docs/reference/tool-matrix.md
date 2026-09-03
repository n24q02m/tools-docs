---
title: Tool matrix
description: The three tools at a glance
---
| | skret | better-semantic-release | better-drive |
|---|---|---|---|
| Job | secrets management | release automation | Drive backup/sync |
| Shape | single static CLI | Python package + GitHub Actions (main action + OCI publish-action) | Go binary wrapping rclone |
| Trust anchor | least-privilege bootstrap keys, OIDC in CI | signed action-pin registry generations + digest-pinned publisher image | release checksums + reversible quarantine |
| Install | scoop bucket / release archives | point `uses:` at the fork (pin SHA + version) | install scripts / scoop bucket |
| Repo | [n24q02m/skret](https://github.com/n24q02m/skret) | [n24q02m/better-semantic-release](https://github.com/n24q02m/better-semantic-release) | [n24q02m/better-drive](https://github.com/n24q02m/better-drive) |

## Cross-tool supply chain

skret stores the CI credentials; bsr publishes releases through a digest-pinned, registry-verified publisher; better-drive artifacts follow the same release discipline (checksums, SBOMs, provenance). Verifying one link is the same habit as verifying all: compare against the provider-authoritative source before installing.
