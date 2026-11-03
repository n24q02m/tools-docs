---
title: email
description: Unified IMAP and SMTP email MCP server and CLI
---

`email` connects directly to standard IMAP/SMTP mailboxes (Gmail, Outlook, Yahoo Mail, iCloud, self-hosted) for searching, reading, moving, drafting, and sending email.

## Features

- **Adaptive Geometric Windowing**: Fast IMAP search fallback for mailboxes without ESEARCH capability (eliminates sequential request timeouts).
- **MIME & Attachment Support**: Raw message extraction, sanitized HTML/plain text conversion, and secure attachment handling.
- **Zero-Relay**: Direct TLS connections between the local agent process and the mail provider's IMAP/SMTP servers.

## Surfaces

- **CLI**: `email messages search "query"`, `email messages send`
- **MCP Server**: Stdio and Streamable HTTP endpoints
- **Plugin**: Packaged in `claude-plugins/plugins/email`
- **Skill & Hook**: Inbox triage and outbound notifications

## Installation

```sh
# Scoop (Windows)
scoop install email

# Homebrew (macOS / Linux)
brew install n24q02m/tap/email

# npm
npm install -g @n24q02m/email
```
