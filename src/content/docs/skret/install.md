---
title: Install
description: Installing skret on Windows, macOS and Linux
---
skret ships as static binaries for Linux, macOS and Windows (amd64 and arm64) on the [GitHub releases](https://github.com/n24q02m/skret/releases) page, with checksums, SBOMs and provenance.

## Verified one-shot installers

The stable portal entry points are:

```sh
# macOS / Linux (cosign must already be installed)
curl -fsSL https://tools.n24q02m.com/install.sh | sh
```

```powershell
# Windows (PowerShell 5+; cosign must already be installed)
iwr -useb https://tools.n24q02m.com/install.ps1 | iex
```

The portal keeps `/install.sh` and `/install.ps1` as stable paths. They resolve to
the Skret installer source, which selects the latest release, verifies checksums
and the Sigstore bundle, validates the archive, and performs an atomic install.
Use `--version=<tag>` (shell) or `-Version <tag>` (PowerShell) to pin a release.
Set `SKRET_INSECURE_SKIP_VERIFY=1` only when an explicit signature-verification
bypass is intended; checksum, archive, path and rollback checks remain enabled.

## Package managers

```powershell
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install skret
```

```sh
brew install n24q02m/tap/skret
```

## Direct archives

1. Download the platform archive and `checksums.txt` from the [release](https://github.com/n24q02m/skret/releases).
2. Verify the archive hash against the matching row before extraction.
3. Keep the prior binary as a rollback copy when managing a server.
4. Run `skret --version` and compare its version with the selected release tag.

For the full platform matrix, Go install path and release verification procedure,
see the [Skret installation guide](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/guide/installation.md).
