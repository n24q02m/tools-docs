---
title: notion
description: Notion workspace and document MCP server and CLI
---

`notion` integrates directly with the Notion API to query databases, read pages, update properties, and append rich-text content blocks.

## Surfaces

- **CLI**: `notion search "query"`, `notion pages get <page-id>`
- **MCP Server**: Stdio and Streamable HTTP endpoints
- **Plugin**: Packaged in `claude-plugins/plugins/notion`
- **Skill & Hook**: Document management and knowledge ingestion

## Authentication

Uses `NOTION_API_KEY` (internal integration token) configured in the local environment or configuration store.

## Installation

```sh
# Scoop (Windows)
scoop install notion

# Homebrew (macOS / Linux)
brew install n24q02m/tap/notion

# npm
npm install -g @n24q02m/notion
```
