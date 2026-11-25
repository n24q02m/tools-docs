---
title: skret Overview
description: Cloud-provider secret manager CLI with Doppler/Infisical-grade DX
---

`skret` is a secret manager CLI that reads and writes secrets in your cloud provider's secret store and injects them into commands. It calls the provider directly with your cloud IAM identity: there is no self-hosted control plane.

## Key features

- **Providers**: AWS SSM Parameter Store, Azure Key Vault, GCP Secret Manager, OCI Vault, and a local file provider. See [providers](/skret/providers/comparison/).
- **CLI**: `skret get <KEY>`, `skret set <KEY> [VALUE]`, `skret list`, `skret env`, `skret run -- <command>`. See the [command reference](/skret/reference/commands/).
- **Sync**: `skret sync --to=github` pushes secrets to GitHub Actions repository secrets. See [sync](/skret/guide/sync/) for the other targets.
- **Leak guard and audit**: `skret scan` exits `10` when a managed secret value appears in tracked files; `skret audit` shows who changed or read which secret, from the local provider's log or an AWS CloudTrail export. See [scan](/skret/guide/scan/).
- **MCP server & plugin**: `skret mcp` (single `skret` binary subcommand, read-only by default) and Claude Code plugin `skret@n24q02m-plugins`. See [MCP](/skret/guide/mcp/).

## Installation

```sh
# Via Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install skret

# Via Homebrew (macOS / Linux)
brew install n24q02m/tap/skret
```

[Installation](/skret/guide/installation/) covers the one-shot install scripts, `go install`, and release archives.
