---
title: Overview
description: skret — secrets without the server
---
skret wraps cloud-provider secret managers (currently AWS SSM Parameter Store and a local file provider) with Doppler/Infisical-grade developer experience. It is a single static CLI — no server to run.

## Core ideas

- **Projects declare context** in a `.skret.yaml` (provider, path, region). Everyone in the project resolves the same secrets without sharing `.env` files.
- **Least-privilege bootstrap**: `skret bootstrap` provisions a dedicated key from an admin/root identity instead of handing out the master credential.
- **Values stay behind the CLI**: `skret browse` reveals on demand; `skret env` dumps dotenv/JSON/YAML/export for the current context.

## Command map

| Command | Purpose |
|---|---|
| `skret init` | Initialize `.skret.yaml` in the current directory |
| `skret bootstrap` | Provision a least-privilege skret key |
| `skret get` / `skret env` | Read one secret / dump the whole set |
| `skret import` | Import from dotenv, Doppler or Infisical |
| `skret diff` | Compare two secret sets |
| `skret history` | Version history of a secret |
| `skret hub` | Publish secret inventory to the vault dashboard |
| `skret delete` | Delete a secret |

Full reference lives at [skret.n24q02m.com](https://skret.n24q02m.com).
