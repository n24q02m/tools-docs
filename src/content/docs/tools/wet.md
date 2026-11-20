---
title: wet
description: "Open-source MCP server for AI agents: web search, content extraction, and library docs."
---

`wet` is a self-hosted MCP server for AI agents: web search, content extraction, and library documentation lookup. Auth, bind address, and providers live in the host-owned `~/.wet/config.toml` (`wet config init`).

Full documentation: [overview](/plugins/servers/wet/overview/), [setup](/plugins/servers/wet/setup/), [tools reference](/plugins/servers/wet/tools/), and [troubleshooting](/plugins/servers/wet/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | PyPI `n24q02m-wet` (Python 3.13) |
| Commands | `wet`, also installed as `n24q02m-wet` and as the legacy alias `wet-mcp` |
| CLI subcommands | `server`, `config`, `token`, `users`, `docs`, `search`, `warmup` |
| MCP transport | Streamable HTTP only, on `/mcp`; start an instance with `wet server start` |
| Claude Code plugin | `wet@n24q02m-plugins`, from `plugins/wet` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/wet](https://github.com/n24q02m/wet) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/wet

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install wet

# PyPI (Python 3.13)
pip install n24q02m-wet
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
