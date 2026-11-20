---
title: mnemo
description: "Persistent AI memory with hybrid search. Open, free, unlimited."
---

`mnemo` is a self-hosted MCP server that gives AI agents persistent, searchable long-term memory with hybrid search. All state is one SQLite database under `~/.mnemo/`.

Full documentation: [overview](/plugins/servers/mnemo/overview/), [setup](/plugins/servers/mnemo/setup/), [tools reference](/plugins/servers/mnemo/tools/), and [troubleshooting](/plugins/servers/mnemo/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | PyPI `n24q02m-mnemo` (Python 3.13) |
| Commands | `n24q02m-mnemo` (the server and its operator subcommands; also installed as `mnemo-mcp`) and `mnemo` (a CLI over the memory database; also installed as `mnemo-pilot`) |
| MCP transport | Streamable HTTP only, on `/mcp`; there is no stdio transport |
| Claude Code plugin | `mnemo@n24q02m-plugins`, from `plugins/mnemo` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/mnemo](https://github.com/n24q02m/mnemo) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/mnemo

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install mnemo

# PyPI (Python 3.13)
pip install n24q02m-mnemo
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
