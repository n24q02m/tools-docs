---
title: Overview
description: better-drive — cross-platform Google Drive sync and virtual-drive mount
---
better-drive is a cross-platform Google Drive sync and virtual-drive mount — copy, sync, explicitly enrolled bisync, or a foreground mounted filesystem. It is a thin wrapper around the [rclone](https://rclone.org) binary: better-drive owns the job schema, `.driveignore`, system-tray daemon, per-OS autostart and the mount contract, while rclone performs transfers and mounting.

## Models

- **Copy / sync jobs** — one-way transfers with filters.
- **Enrolled bisync** — two-way sync that must be explicitly enrolled per pair.
- **Mount** — a separate foreground compatibility path that presents Drive as a filesystem.

Runs on Windows, Linux and macOS. Sync/account jobs require an enrolled absolute `rclone_runtime`; accounts are connected through the standard rclone remote flow.

## Safety model

- Deletions are filtered through `.driveignore` and config excludes.
- Cleanup operations are **quarantine-first and reversible** — no permanent deletes.
- Restores are pull-based from the configured remotes, so recovery never depends on the local machine surviving.
