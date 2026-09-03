---
title: Install
description: Installing better-drive
---
Releases live on [GitHub releases](https://github.com/n24q02m/better-drive/releases) with archives per OS/arch plus checksums, SBOMs and provenance.

## Scripts

- **Windows**: `install.ps1`
- **macOS / Linux**: `install.sh`

Both scripts install the binary and print next steps; verify the archive hash against the release `checksums.txt` before running them.

## Package managers

The `n24q02m` Scoop bucket carries better-drive alongside skret:

```
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install better-drive
```

## First steps

1. Connect an account (rclone remote flow).
2. Pick a job model — one-way sync, enrolled bisync or mount.
3. Author `.driveignore` before the first sync; excludes are your deletion guardrail.
