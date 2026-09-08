---
title: Install
description: Installing better-drive
---
Releases live on [GitHub releases](https://github.com/n24q02m/better-drive/releases) with archives per OS/arch plus checksums, SBOMs and provenance.

## One-shot installers

The repository publishes installers from its `main` branch:

```sh
curl -fsSL https://raw.githubusercontent.com/n24q02m/better-drive/main/install.sh | sh
```

```powershell
iwr -useb https://raw.githubusercontent.com/n24q02m/better-drive/main/install.ps1 | iex
```

The scripts select the latest release, verify `checksums.txt` and its Sigstore
bundle, then install atomically. Use `--version=<tag>` (shell) or `-Version <tag>`
(PowerShell) to pin a release. For servers, prefer downloading a release archive
and verifying it before extraction.

## Package managers

```powershell
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install better-drive
```

```sh
brew install n24q02m/homebrew-tap/better-drive
```

## First steps

1. Install [rclone](https://rclone.org/install/) (the Scoop/Homebrew packages pull it as a dependency).
2. Connect an account with `better-drive setup` or an existing rclone remote.
3. Pick a job model — one-way sync, enrolled bisync or mount.
4. Author `.driveignore` before the first sync; excludes are your deletion guardrail.
