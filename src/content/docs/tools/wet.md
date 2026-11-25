---
title: wet
description: "Open-source MCP server for AI agents: web search, content extraction, and library docs."
---

`wet` is an MCP server and CLI for AI agents: web search, content extraction, and library documentation lookup. Auth, bind address, profiles, and providers live under `~/.n24q02m/wet/` (`wet config init`, with one-time migration from `~/.wet/`).

Full documentation: [overview](/plugins/servers/wet/overview/), [setup](/plugins/servers/wet/setup/), [tools reference](/plugins/servers/wet/tools/), and [troubleshooting](/plugins/servers/wet/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | PyPI `n24q02m-wet` (Python 3.11–3.14; 3.15 exempt pending `onnxruntime` wheel) |
| Commands | `wet`, also installed as `n24q02m-wet` and as the legacy alias `wet-mcp` |
| CLI subcommands | `mcp`, `search`, `extract`, `docs`, `doctor`, `server`, `config`, `token`, `users`, `warmup` |
| MCP transport | `stdio` via `wet mcp` (default); Streamable HTTP via `wet mcp --http` or `wet server start` on `/mcp` |
| State directory | `~/.n24q02m/wet/` (`profiles/<profile>/`, `subs/<sub>/` in multi-user mode) |
| Claude Code plugin | `wet@n24q02m-plugins`, from `plugins/wet` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/wet](https://github.com/n24q02m/wet) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/wet

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install wet

# PyPI (Python 3.11-3.14)
pip install n24q02m-wet
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
