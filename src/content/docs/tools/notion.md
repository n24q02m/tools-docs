---
title: notion
description: "Markdown-first Notion for AI agents -- pages, databases, blocks, and comments in one call."
---

`notion` is an MCP server and CLI that gives AI agents Markdown-first access to Notion pages, databases, blocks, and comments.

Full documentation: [overview](/plugins/servers/notion/overview/), [setup](/plugins/servers/notion/setup/), [tools reference](/plugins/servers/notion/tools/), and [troubleshooting](/plugins/servers/notion/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | npm `@n24q02m/notion` (Node >= 22.12; LTS matrix 22 / 24 / 26) |
| Commands | `notion`, also installed as `better-notion-mcp` |
| MCP transport | stdio by default (token from `NOTION_TOKEN` or `notion auth`); Streamable HTTP with `--http` or `MCP_TRANSPORT=http` |
| Accounts & state | Named multi-account support (`NOTION_ACCOUNT`, `notion auth`); config and state under `~/.n24q02m/notion/` |
| Claude Code plugin | `notion@n24q02m-plugins`, from `plugins/notion` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/notion](https://github.com/n24q02m/notion) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/notion

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install notion

# npm
npm install -g @n24q02m/notion
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
