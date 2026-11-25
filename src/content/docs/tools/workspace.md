---
title: workspace
description: "Google Workspace MCP server: Docs, Drive, Calendar, Gmail, Sheets, Slides, Tasks, Chat, People, Forms."
---

`workspace` is an MCP server and CLI for Google Workspace: Docs, Drive, Calendar, Gmail, Sheets, Slides, Tasks, Chat, People, and Forms.

Full documentation: [overview](/plugins/servers/workspace/overview/), [setup](/plugins/servers/workspace/setup/), [tools reference](/plugins/servers/workspace/tools/), and [troubleshooting](/plugins/servers/workspace/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | npm `@n24q02m/workspace` (Node >= 22.12; LTS matrix 22 / 24 / 26) |
| Commands | `workspace`, also installed as `better-workspace-mcp` |
| MCP transport | stdio by default (local mode; the first run opens the Google consent flow on loopback); multi-user Streamable HTTP with `--http` or `MCP_TRANSPORT=http` |
| Accounts & state | Multi-account OAuth; config and state under `~/.n24q02m/workspace/` |
| Claude Code plugin | `workspace@n24q02m-plugins`, from `plugins/workspace` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/workspace](https://github.com/n24q02m/workspace) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/workspace

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install workspace

# npm
npm install -g @n24q02m/workspace
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
