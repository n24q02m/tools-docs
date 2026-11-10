---
title: Servers and coordination
description: MCP servers, portable coordination plugins, and the mcp-core foundation library.
---

The stack shares one foundation library (`mcp-core`) and one plugin marketplace. Runnable MCP servers and portable coordination plugins remain distinct capabilities.

## Servers

- [crg](/plugins/servers/crg/) -- Knowledge graph for token-efficient code reviews -- semantic search and call-graph resolution across your codebase.
- [email](/plugins/servers/email/) -- Email management via IMAP/SMTP — multi-account
- [mnemo](/plugins/servers/mnemo/) -- Persistent AI memory — store, search, and recall knowledge across sessions
- [notion](/plugins/servers/notion/) -- Markdown-first Notion API integration — 8 composite tools, ~95% coverage
- [telegram](/plugins/servers/telegram/) -- Telegram dual-mode (Bot API + MTProto) — messages, chats, media, contacts
- [wet](/plugins/servers/wet/) -- Open-source MCP server for AI agents: web search, content extraction, and library docs.
- [workspace](/plugins/servers/workspace/) -- Google Workspace MCP server — Docs/Drive/Calendar/Gmail/Sheets/Slides/Tasks/Chat/People/Forms + multi-account

## Foundation

- [mcp-core](/plugins/servers/mcp-core/) -- Foundation library for the n24q02m MCP stack — shared Streamable HTTP transport, OAuth 2.1 Authorization Server, lifecycle management, and credential-relay primitives consumed by every server. Not a runnable MCP server.

## See also

- [Server comparison](/plugins/reference/server-comparison/)
- [Fastretrieval library](/plugins/reference/fastretrieval/)
- [Modes overview](/plugins/get-started/modes-overview/)
- [Plugin marketplace](/plugins/get-started/plugin-marketplace/)
