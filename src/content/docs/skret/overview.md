---
title: Overview
description: skret — secrets without the server
---

> [!WARNING]
> **skret đã ARCHIVE** (2026-09-13) — repo read-only, không phát triển thêm. Bản cuối vẫn cài/dùng được; docs dưới đây đóng băng ở trạng thái cuối.

skret wraps cloud-provider secret managers (currently AWS SSM Parameter Store and a local file provider) with a developer-first CLI. It is a single static CLI — no server to run.

## Core ideas

- **Projects declare context** in a `.skret.yaml` (provider, path, region). Everyone in the project resolves the same secrets without sharing `.env` files.
- **Least-privilege bootstrap**: `skret bootstrap` provisions a dedicated key from an admin/root identity instead of handing out the master credential.
- **Values stay behind the CLI**: `skret browse` reveals on demand; `skret env` dumps dotenv/JSON/YAML/export for the current context.

## Command map

| Command | Purpose |
|---|---|
| `skret init` | Initialize `.skret.yaml` in the current directory |
| `skret setup` | Initialize and authenticate the configured provider |
| `skret bootstrap` | Provision a least-privilege skret key |
| `skret get` / `skret env` | Read one secret / dump the whole set |
| `skret import` | Import from dotenv, Doppler or Infisical |
| `skret diff` | Compare two secret sets |
| `skret hub` | Publish a names-only secret inventory |
| `skret delete` | Delete a secret |

## Continue with Skret

- [Install and verify a release](/skret/install/)
- [Configure a project and use secrets](/skret/secrets/)
- [Full command and provider reference](https://github.com/n24q02m/skret/tree/main/docs/src/content/docs)
- [Source and release assets](https://github.com/n24q02m/skret/releases)
