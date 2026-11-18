---
title: Overview
editUrl: https://github.com/n24q02m/claude-plugins/edit/main/plugins/telegram/overview.md
---

# Telegram MCP -- Overview

Telegram access for AI agents in both Bot API and MTProto (user) modes -- messages, chats, media, and contacts through a small set of composite tools.

## What it does

- **Messages**: send, edit, delete, forward, pin, react, search, and read chat history.
- **Chats**: list, create, join, leave, and manage members, admin roles, settings, and forum topics.
- **Media**: send photos, files, voice, and video, and download media from a message.
- **Contacts** (user mode): list, search, add, and block/unblock users.
- Bot mode uses the Bot API; user mode uses MTProto and unlocks contact management and direct media lookup.

## Tools

Four composite tools -- `message`, `chat`, `media`, and `contact` -- driven by an `action` parameter, plus the universal `config` (status and runtime settings) and `help`. Credentials are never set through a tool. Every action and parameter is listed in the [tools reference](/plugins/servers/telegram/tools/).

## Clients

Runs over stdio by default (single user) and can run as a self-hosted HTTP server with token or per-user (`multi`) auth. There is no hosted public instance. Works with Claude Code (plugin or `claude mcp add`), Cursor, Windsurf, Gemini CLI, and any other MCP client. See the [modes overview](/plugins/get-started/modes-overview/).

## Configuration

Bot mode needs a bot token (`TELEGRAM_BOT_TOKEN`). User mode signs in once from a terminal with `telegram auth --phone <+number>` (OTP and optional 2FA password are prompted there) and stores the MTProto session on disk. Credentials only come from environment variables or this local CLI -- there is no browser form. Use placeholders in shared config and never commit a real token. Full walkthrough in [setup](/plugins/servers/telegram/setup/).

The package is `n24q02m-telegram` (formerly `better-telegram-mcp`), and the legacy `better-telegram-mcp` command is kept as an alias of `telegram`. Local data moves once from `~/.better-telegram-mcp` to `~/.telegram` on first start.

## Next steps

- [Setup](/plugins/servers/telegram/setup/) -- install and configure
- [Tools reference](/plugins/servers/telegram/tools/) -- every action and parameter
- [Troubleshooting](/plugins/servers/telegram/troubleshooting/)
