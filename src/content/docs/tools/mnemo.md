---
title: mnemo
description: "Persistent AI memory with hybrid search. Open, free, unlimited."
---

`mnemo` is an MCP server and CLI that gives AI agents persistent, searchable long-term memory with hybrid search. State lives under `~/.n24q02m/mnemo/` (auto-migrates once from `~/.mnemo/`).

Full documentation: [overview](/plugins/servers/mnemo/overview/), [setup](/plugins/servers/mnemo/setup/), [tools reference](/plugins/servers/mnemo/tools/), and [troubleshooting](/plugins/servers/mnemo/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | PyPI `n24q02m-mnemo` (Python 3.11–3.14; 3.15 exempt pending `onnxruntime` wheel) |
| Commands | `n24q02m-mnemo` (MCP server and operator subcommands; alias `mnemo-mcp`) and `mnemo` (in-process CLI over memory; alias `mnemo-pilot`) |
| MCP transport | `stdio` via `n24q02m-mnemo mcp` (default); Streamable HTTP via `n24q02m-mnemo mcp --http` or `n24q02m-mnemo server start` on `/mcp` |
| State directory | `~/.n24q02m/mnemo/` (`profiles/<profile>/`, `subs/<sub>/` in multi-user mode) |
| Claude Code plugin | `mnemo@n24q02m-plugins`, from `plugins/mnemo` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/mnemo](https://github.com/n24q02m/mnemo) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/mnemo

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install mnemo

# PyPI (Python 3.11-3.14)
pip install n24q02m-mnemo
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
