---
title: Install
description: Installing skret on Windows, macOS and Linux
---
skret ships as static binaries per OS/arch on the [GitHub releases](https://github.com/n24q02m/skret/releases) page (CLI + checksums + SBOMs).

## Scoop (Windows)

```
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install skret
```

## Install scripts / archives

Every release provides `skret_<version>_<os>_<arch>.tar.gz|zip` plus `checksums.txt`.

1. Download the archive for your platform and `checksums.txt`.
2. Verify: `sha256sum skret_...tar.gz` must match `checksums.txt`.
3. Extract and install the binary into your `PATH` (e.g. `/usr/local/bin`).
4. Keep the previous binary as a rollback copy if you manage servers.

## Verify a release

Releases are built reproducibly with SBOMs and provenance attached; compare the archive hash against `checksums.txt` before installing — never skip this on servers.
