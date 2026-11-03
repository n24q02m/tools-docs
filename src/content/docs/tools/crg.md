---
title: crg
description: Code review and AST symbol graph MCP server and CLI
---

`crg` (Code Review Graph) builds semantic AST graphs, call hierarchies, and change impact analyses for repositories under review.

## Surfaces

- **CLI**: `crg graph <path>`, `crg review --diff <ref>`
- **MCP Server**: Stdio and Streamable HTTP endpoints
- **Plugin**: Packaged in `claude-plugins/plugins/better-code-review-graph`
- **Skill & Hook**: Pre-review inspection and change validation

## Installation

```sh
# Scoop (Windows)
scoop install crg

# Homebrew (macOS / Linux)
brew install n24q02m/tap/crg

# PyPI
pip install n24q02m-crg
```
