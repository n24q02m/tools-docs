---
title: skret Overview
description: Cloud-provider secret manager CLI with Doppler/Infisical-grade DX
---

`skret` is a fast, multi-backend secret management CLI and agent tool that integrates local and cloud secret stores (AWS Secrets Manager, GCP Secret Manager, OCI Vault, Vault, 1Password, age encryption, GitHub Secrets).

## Key Features

- **CLI-First**: Run `skret get <key>`, `skret set <key> <val>`, `skret list`, `skret run -- <command>`.
- **Zero-Relay**: Secrets decrypt locally in-process without passing through unverified intermediary servers.
- **Multi-backend sync**: Projection to GitHub Actions Secrets (`skret sync --to=github`).
- **Audit & Leak Detection**: Integrated detection of leaked credentials and rotation triggers.

## Installation

```sh
# Via Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install skret

# Via Homebrew (macOS / Linux)
brew install n24q02m/tap/skret
```
