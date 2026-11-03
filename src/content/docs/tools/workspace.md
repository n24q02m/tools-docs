---
title: workspace
description: Google Workspace MCP server and CLI (Docs, Drive, Gmail, Calendar, Sheets)
---

`workspace` provides comprehensive integration with Google Workspace services: Google Drive, Docs, Sheets, Slides, Calendar, Tasks, and Contacts.

## Surfaces

- **CLI**: `workspace drive search "name"`, `workspace docs read <doc-id>`
- **MCP Server**: Stdio and Streamable HTTP endpoints powered by `@n24q02m/hull`
- **Plugin**: Packaged in `claude-plugins/plugins/workspace`
- **Skill & Hook**: Cloud document collaboration and schedule lookup

## Authentication

Local OAuth2 credentials and service account JSON tokens managed securely on the local workstation. No external proxying of Google tokens.

## Installation

```sh
# Scoop (Windows)
scoop install workspace

# Homebrew (macOS / Linux)
brew install n24q02m/tap/workspace

# npm
npm install -g @n24q02m/workspace
```
