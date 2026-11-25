---
title: hull Overview
description: Shared monorepo core for the wet, crg and mnemo self-hosted stack — auth, model cells, storage, HTTP MCP server, and the TypeScript CLI core
---

`hull` is the shared monorepo core for the **wet**, **crg** and **mnemo** self-hosted stack. It owns everything the three products share — token auth, per-task model configuration, per-user rate limiting, local SQLite storage, the HTTP MCP server lifecycle, and web scraping/search infrastructure.

It is a library, not a server you install on its own: each product depends on it.

## Packages

| Source dir | Import package | Extra | Purpose |
|---|---|---|---|
| `packages/core-py` | `hull_core` | (base; MTEB boards need `[mteb]`) | Auth (3 modes), 3-layer config/profile/account layout under `~/.n24q02m/<tool>/`, per-task model cells, limiter, SQLite WAL storage, MCP stdio + `/mcp` HTTP lifecycle, SSRF-safe HTTP, `model_selection` leaderboard picker |
| `packages/web` | `hull_web` | `[web]` | Search (SearXNG), scraping strategies, stealth browsers, fingerprinting, HTTP/SSRF security |
| `packages/core-ts` | `@n24q02m/hull` (npm) | n/a | TypeScript core: MCP stdio + Streamable HTTP transport, token-table auth (`token`, `multi`), `buildCli` console builder, `~/.n24q02m/<tool>/` encrypted credential & named-account storage, lockfiles and cache |

## Installation

`hull` ships as one PyPI dist, **`n24q02m-hull`**. The wheel carries both Python import packages; the heavy stacks are opt-in extras:

```bash
pip install n24q02m-hull               # hull_core only (crg, mnemo)
pip install "n24q02m-hull[web]"        # + hull_web scraping/browser stack (wet)
pip install "n24q02m-hull[mteb]"       # + pyarrow for model_selection MTEB fetchers
```

`import hull_web` without the `[web]` extra raises `ImportError` naming the missing modules and the install command.

hull does not run models. The shared embed/rerank HTTP service is `pip install "fastretrieval[server]"` ([`fastretrieval-server`](/fastretrieval/overview/#http-server), serving `/embed` + `/rerank`); hull callers reach it over HTTP.

The TypeScript core ships to npm as **`@n24q02m/hull`**, at the same version as the PyPI dist:

```bash
npm install @n24q02m/hull
```

## Runtime and 3-layer model

- Python 3.11 to 3.15 (CI tests each) in `hull_core`, and Node.js >= 22.12 (LTS matrix 22 / 24 / 26) in `@n24q02m/hull`. Dev with `uv` or `bun`, always-on HTTP hosting optional via Docker.
- **Four surfaces**: tools built on `hull` expose an in-process CLI, MCP `stdio`, MCP Streamable HTTP (`/mcp` via `server start` or `--http`), and IDE plugin skills/hooks.
- **Three isolation layers** under the unified state root `~/.n24q02m/<tool>/` (with one-time migration from legacy `~/.<tool>/`):
  1. **Principal / namespace**: `no-auth` | `token` | `multi` (`users.toml` isolating each subscriber under `subs/<sub>/`).
  2. **Profile / environment**: `--profile` / `<TOOL>_PROFILE` scoping state under `profiles/<prof>/`.
  3. **Named accounts & key pools**: multi-account credentials stored in encrypted local state.
- Provider calls are plain OpenAI-spec HTTP (`httpx`). OpenRouter is the pre-wired default. Each task (`embed`, `rerank`, `chat`, `jev_score`) has its own `base_url + api_key + model` cell — change provider by editing config, never code.
- Storage is local SQLite (WAL) and encrypted config files under `~/.n24q02m/<tool>/`. Backup/sync is `rclone` outside this repo.

## Auth — one mechanism, three modes

Mode is a config state (`[server] auth` in `~/.n24q02m/<tool>/config.toml`):

1. **`no-auth`** — localhost-only bind enforced, one shared namespace.
2. **`token`** — one shared token (`token_hash` in config), still one shared namespace.
3. **`multi`** — `users.toml` maps `uid → {token_hash, enabled, namespace, allowed_roots, limits}`; one process serves N users, each isolated to their namespace (`subs/<sub>/`). Admin is host-side only: edit `users.toml`, restart.

Token hashes are scrypt (`hull token hash`). Wrong token → `401`; disabled user → `403`; over-limit → `429`.

## Quick start

```bash
uv sync
uv run hull config init          # write ~/.n24q02m/hull/config.toml (OpenRouter defaults)
printf '%s' "$TOKEN" | uv run hull token hash  # mint a token_hash for users.toml / config
uv run hull server start         # serves http://127.0.0.1:8000/mcp
```

`hull token hash` reads the token from piped stdin or a hidden prompt; a token on the command line is refused, because it would land in shell history.

## Development

```bash
uv sync --all-extras
uv run pytest -q
uv run ruff check .
uv build
```

## License

Apache-2.0. Source: [n24q02m/hull](https://github.com/n24q02m/hull).
