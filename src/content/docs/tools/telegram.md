---
title: telegram
description: "Telegram for AI agents: messages, chats, media, and contacts in bot and user-account modes."
---

`telegram` is an MCP server and CLI that gives AI agents Telegram messages, chats, media, and contacts, in bot mode or user-account mode.

Full documentation: [overview](/plugins/servers/telegram/overview/), [setup](/plugins/servers/telegram/setup/), [tools reference](/plugins/servers/telegram/tools/), and [troubleshooting](/plugins/servers/telegram/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | PyPI `n24q02m-telegram` (Python 3.13) |
| Commands | `telegram`, also installed as `n24q02m-telegram` and as the legacy alias `better-telegram-mcp` |
| MCP transport | stdio by default; Streamable HTTP with `--http` or `MCP_TRANSPORT=http` |
| Claude Code plugin | `telegram@n24q02m-plugins`, from `plugins/telegram` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/telegram](https://github.com/n24q02m/telegram) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/telegram

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install telegram

# PyPI (Python 3.13)
pip install n24q02m-telegram
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
