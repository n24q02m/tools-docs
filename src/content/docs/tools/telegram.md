---
title: telegram
description: Telegram client and bot MCP server and CLI
---

`telegram` enables agents to send messages, manage channels, handle bot updates, and stream notifications via the Telegram Bot API and MTProto client.

## Surfaces

- **CLI**: `telegram send --chat-id <id> "message"`, `telegram listen`
- **MCP Server**: Stdio and Streamable HTTP endpoints
- **Plugin**: Packaged in `claude-plugins/plugins/telegram`
- **Skill & Hook**: Incident alert and monitoring notifications

## Authentication

Uses local `TELEGRAM_BOT_TOKEN`, `TELEGRAM_API_ID`, and `TELEGRAM_API_HASH` from environment or local configuration file. No intermediate servers.

## Installation

```sh
# Scoop (Windows)
scoop install telegram

# Homebrew (macOS / Linux)
brew install n24q02m/tap/telegram

# PyPI
pip install n24q02m-telegram
```
