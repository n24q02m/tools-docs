---
title: Sync & restore
description: Job models, filters and getting data back
---

:::caution[Archived]
This project is archived and no longer maintained. The documentation below is kept for reference.
:::
## Job models

| Model | Direction | Use for |
|---|---|---|
| copy | one-way | seeding archives, exports |
| sync | one-way | workstation -> Drive backups |
| bisync | two-way (enrolled) | working folders kept in sync on purpose |
| mount | foreground | treating Drive as a filesystem |

Sync/account jobs require an enrolled absolute `rclone_runtime`; the mount path
stays a separate foreground compatibility flow so long-running syncs and
interactive mounts never fight over the same runtime.

## Filters

`.driveignore` (plus config excludes) is the deletion guardrail — author it before
the first sync. Anything not matched is a candidate for transfer and deletion
propagation, so treat filter changes as production changes.

## Restore

Restores are pull-based: point better-drive (or rclone directly) at the same remote
and read back. Because cleanup operations are quarantine-first and reversible,
deleted-by-policy content is recoverable from quarantine rather than lost.

## Upgrading

Replace the binary and keep the previous one as rollback. Pin upgrades on servers
the same way you would any release artifact: verify the checksum, install, read
back the version. See the [full configuration and command reference](https://github.com/n24q02m/better-drive#configuration).
