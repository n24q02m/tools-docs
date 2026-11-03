---
title: wet
description: Streamable HTTP/stdio MCP server and CLI for web extraction and search
---

`wet` is an agentic web tool providing search, crawling, markdown extraction, and content inspection.

## Surfaces

- **CLI**: `wet search "query"`, `wet extract <url>`
- **MCP Server**: Stdio and Streamable HTTP endpoints powered by `@n24q02m/hull`
- **Plugin**: Packaged in `claude-plugins/plugins/wet-mcp`
- **Skill & Hook**: Session-start lifecycle integrations

## Authentication

De-hosted architecture. Credentials are provided solely via CLI flags (`--api-key`), environment variables (`TAVILY_API_KEY`, `SERPAPI_API_KEY`), or local config (`~/.config/wet/config.json`). No external relay.

## Installation

```sh
# Scoop (Windows)
scoop install wet

# Homebrew (macOS / Linux)
brew install n24q02m/tap/wet

# PyPI
pip install n24q02m-wet
```
