---
title: mnemo
description: Episodic and semantic memory MCP server and CLI
---

`mnemo` provides persistent episodic memory, recall, vector indexing, and relationship graphs for AI assistants.

## Surfaces

- **CLI**: `mnemo remember "fact"`, `mnemo recall "query"`
- **MCP Server**: Stdio and Streamable HTTP endpoints
- **Plugin**: Packaged in `claude-plugins/plugins/mnemo-mcp`
- **Skill & Hook**: Automated memory retrieval hooks

## Authentication & Storage

Local-first or Cloudflare D1/Vectorize storage using locally configured tokens (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`). Never passes data through external third-party relays.

## Installation

```sh
# Scoop (Windows)
scoop install mnemo

# Homebrew (macOS / Linux)
brew install n24q02m/tap/mnemo

# PyPI
pip install n24q02m-mnemo
```
