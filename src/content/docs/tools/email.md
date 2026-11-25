---
title: email
description: "IMAP/SMTP email for AI agents -- read, send, organize, and manage attachments across accounts."
---

`email` is an MCP server and CLI that gives AI agents IMAP/SMTP email: read, send, organize, and manage attachments across accounts.

Full documentation: [overview](/plugins/servers/email/overview/), [setup](/plugins/servers/email/setup/), [tools reference](/plugins/servers/email/tools/), and [troubleshooting](/plugins/servers/email/troubleshooting/).

## At a glance

| | |
|---|---|
| Package | npm `@n24q02m/email` (Node >= 22.12; LTS matrix 22 / 24 / 26) |
| Commands | `email`, also installed under its legacy name `better-email-mcp` |
| MCP transport | stdio by default; Streamable HTTP with `--http` or `MCP_TRANSPORT=http` |
| Accounts & state | Multi-account IMAP/SMTP; config and state under `~/.n24q02m/email/` |
| Claude Code plugin | `email@n24q02m-plugins`, from `plugins/email` in [n24q02m/claude-plugins](https://github.com/n24q02m/claude-plugins) |
| Source | [n24q02m/email](https://github.com/n24q02m/email) |

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/email

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install email

# npm
npm install -g @n24q02m/email
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.
