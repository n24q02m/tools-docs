---
title: hull Overview
description: Shared monorepo core for the wet, crg and mnemo self-hosted stack — auth, model cells, storage, HTTP MCP server, and the TypeScript CLI core
---

`hull` is the shared monorepo core for the **wet**, **crg** and **mnemo** self-hosted stack. It owns everything the three products share — token auth, per-task model configuration, per-user rate limiting, local SQLite storage, the HTTP MCP server lifecycle, and web scraping/search infrastructure.

It is a library, not a server you install on its own: each product depends on it.

## Packages

| Source dir | Import package | Extra | Purpose |
|---|---|---|---|
| `packages/core-py` | `hull_core` | (base; MTEB boards need `[mteb]`) | Auth (3 modes), per-task model cells, limiter, `~/.hull/` SQLite WAL storage, `server start` + `/mcp` endpoint, CLI, SSRF-safe HTTP, lifecycle lock, `model_selection` leaderboard picker + runtime registry (refresh → eval-on-change → promote) |
| `packages/web` | `hull_web` | `[web]` | Search (SearXNG), scraping strategies, stealth browsers, fingerprinting, HTTP/SSRF security |
| `packages/core-ts` | `@n24q02m/hull` (npm) | n/a | TypeScript core: MCP Streamable HTTP transport, token-table auth (`token`, `multi`), `buildCli` console builder, encrypted credential storage, lockfiles and cache |

## Installation

`hull` ships as one PyPI dist, **`n24q02m-hull`**. The wheel carries all three import packages; the heavy stacks are opt-in extras:

```bash
pip install n24q02m-hull               # hull_core only (crg, mnemo)
pip install "n24q02m-hull[web]"        # + hull_web scraping/browser stack (wet)
pip install "n24q02m-hull[mteb]"       # + pyarrow for model_selection MTEB fetchers
```

`import hull_web` without the `[web]` extra raises `ImportError` naming the missing modules and the install command.

The local embedding/rerank HTTP daemon moved to [`fastretrieval`](/fastretrieval/overview/#http-server) on 2026-11-10: the runtime that loads ONNX/GGUF models now serves `/embed` and `/rerank` itself, and `n24q02m-hull[embedding]` no longer exists.

The TypeScript core ships to npm as **`@n24q02m/hull`**, at the same version as the PyPI dist:

```bash
npm install @n24q02m/hull
```

## Runtime model

- Python 3.13. Dev with `uv`, always-on with docker.
- `hull server start` is the only way to run a server; MCP is an HTTP endpoint at `http://host:port/mcp` — never a spawned subprocess.
- The CLI is the control plane + consumer. With the server down the CLI tells you to start it first; there is no hidden local-core mode.
- Provider calls are plain OpenAI-spec HTTP (`httpx`). OpenRouter is the pre-wired default. Each task (`embed`, `rerank`, `chat`, `jev_score`) has its own `base_url + api_key + model` cell — change provider by editing config, never code.
- Storage is local SQLite (WAL) under `~/.hull/`. Backup/sync is `rclone` outside this repo.

## Auth — one mechanism, three modes

Mode is a config state (`[server] auth` in `~/.hull/config.toml`):

1. **`no-auth`** — localhost-only bind enforced, one shared namespace.
2. **`token`** — one shared token (`token_hash` in config), still one shared namespace.
3. **`multi`** — `users.toml` maps `uid → {token_hash, enabled, namespace, allowed_roots, limits}`; one process serves N users, each isolated to their namespace. Admin is host-side only: edit `users.toml`, restart.

Token hashes are scrypt (`hull token hash`). Wrong token → `401`; disabled user → `403`; over-limit → `429`.

## Quick start

```bash
uv sync
uv run hull config init          # write ~/.hull/config.toml (OpenRouter defaults)
uv run hull token hash mysecret  # mint a token_hash for users.toml / config
uv run hull server start         # serves http://127.0.0.1:8000/mcp
```

## Development

```bash
uv sync --all-extras
uv run pytest -q
uv run ruff check .
uv build
```

## License

Apache-2.0. Source: [n24q02m/hull](https://github.com/n24q02m/hull).
