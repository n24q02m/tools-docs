---
title: Tool matrix
description: Active v2 stack — surfaces, runtimes, state roots, and install channels
---

All active MCP/CLI tools follow the 4-surface contract (in-process CLI, MCP `stdio`, MCP Streamable HTTP on `/mcp`, and Claude Code plugin via `n24q02m/claude-plugins`) and keep instance state under `~/.n24q02m/<tool>/`.

| Tool | Runtime | State / Scope | Install | Docs |
|---|---|---|---|---|
| `skret` | Go 1.26 | Cloud IAM + `.skret.yaml` (`skret` + `skret mcp` + plugin) | Homebrew cask, Scoop, `go install` | [skret](/skret/overview/) |
| `wet` | Python 3.11–3.14 (`onnxruntime` cp315 exempt) | `~/.n24q02m/wet/` | Homebrew, Scoop, `pip install n24q02m-wet` | [wet](/tools/wet/) |
| `mnemo` | Python 3.11–3.14 (`onnxruntime` cp315 exempt) | `~/.n24q02m/mnemo/` | Homebrew, Scoop, `pip install n24q02m-mnemo` | [mnemo](/tools/mnemo/) |
| `crg` | Python 3.11–3.14 (`onnxruntime` cp315 exempt) | `<repo>/.crg/` + `~/.n24q02m/crg/` | Homebrew, Scoop, `pip install n24q02m-crg` | [crg](/tools/crg/) |
| `telegram` | Python 3.11–3.15 | `~/.n24q02m/telegram/` (named multi-account) | Homebrew, Scoop, `pip install n24q02m-telegram` | [telegram](/tools/telegram/) |
| `notion` | Node >= 22.12 (LTS 22/24/26) | `~/.n24q02m/notion/` (named multi-account) | Homebrew, Scoop, `npm i -g @n24q02m/notion` | [notion](/tools/notion/) |
| `email` | Node >= 22.12 (LTS 22/24/26) | `~/.n24q02m/email/` (multi-account) | Homebrew, Scoop, `npm i -g @n24q02m/email` | [email](/tools/email/) |
| `workspace` | Node >= 22.12 (LTS 22/24/26) | `~/.n24q02m/workspace/` (multi-account OAuth) | Homebrew, Scoop, `npm i -g @n24q02m/workspace` | [workspace](/tools/workspace/) |
| `better-semantic-release` (`bsr`) | Python 3.11–3.15 | GitHub Action + CLI (`bsr`, `better-semantic-release`) | Homebrew, Scoop, `pip install better-semantic-release` | [bsr](/bsr/overview/) |
| `fastretrieval` | Python 3.11–3.15 | ONNX/GGUF retrieval runtime + HTTP server | Homebrew, Scoop, `pip install fastretrieval` | [fastretrieval](/fastretrieval/overview/) |
| `hull` | Python 3.11–3.15 + Node >= 22.12 | Shared core (`hull_core`, `hull_web`, `@n24q02m/hull`) | `pip install n24q02m-hull`, `npm i @n24q02m/hull` | [hull](/hull/overview/) |

Archived tools preserved for historical reference: [better-drive](/bdrive/overview/) and [sillstone](/sillstone/overview/).

## Cross-tool supply chain

`skret` stores CI credentials; `better-semantic-release` (`bsr`) publishes releases through a digest-pinned, registry-verified publisher; `homebrew-tap` and `scoop-bucket` distribute all 10 CLI/MCP packages with pinned hashes; and `claude-plugins` distributes all 8 agent plugins.
