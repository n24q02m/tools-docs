---
title: crg
description: "Knowledge graph for token-efficient code reviews -- semantic search and call-graph resolution across your codebase."
---

`crg` is an MCP server and CLI that builds a knowledge graph of your codebase for token-efficient code reviews, with semantic search and call-graph resolution.

Full documentation: [overview](/plugins/servers/crg/overview/), [setup](/plugins/servers/crg/setup/), [tools reference](/plugins/servers/crg/tools/), and [troubleshooting](/plugins/servers/crg/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | PyPI `n24q02m-crg` (Python 3.13) |
| Commands | `crg`, also installed as `n24q02m-crg` and as the legacy alias `better-code-review-graph` |
| CLI subcommands | `config`, `db`, `graph`, `query`, `review`, `security`, `server`, `token` |
| MCP transport | stdio by default; Streamable HTTP with `crg server start` |
| Claude Code plugin | `crg@n24q02m-plugins`, from `plugins/crg` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/crg](https://github.com/n24q02m/crg) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/crg

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install crg

# PyPI (Python 3.13)
pip install n24q02m-crg
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
