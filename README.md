# tools-docs

**Docs portal for the n24q02m open-source tool stack (skret, MCP plugins, hull, better-semantic-release and more), built with Astro and deployed to Cloudflare Pages.**

[![CI](https://github.com/n24q02m/tools-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/n24q02m/tools-docs/actions/workflows/ci.yml)
[![CD](https://github.com/n24q02m/tools-docs/actions/workflows/cd.yml/badge.svg)](https://github.com/n24q02m/tools-docs/actions/workflows/cd.yml)
[![Docs](https://img.shields.io/badge/docs-docs.n24q02m.com-blue)](https://docs.n24q02m.com)

[![Astro Starlight](https://img.shields.io/badge/Astro-Starlight-BC52EE?logo=astro&logoColor=white)](https://starlight.astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

Docs portal at **https://docs.n24q02m.com** covering the n24q02m tool stack:

- [skret](https://github.com/n24q02m/skret) — secrets without the server. Start at [/skret/overview/](https://docs.n24q02m.com/skret/overview/) or [/skret/install/](https://docs.n24q02m.com/skret/guide/installation/).
- MCP plugin stack ([claude-plugins](https://github.com/n24q02m/claude-plugins)) — start at [/plugins/get-started/install-claude-code/](https://docs.n24q02m.com/plugins/get-started/install-claude-code/).
- [hull](https://github.com/n24q02m/hull) — shared core for the wet/crg/mnemo stack: [/hull/overview/](https://docs.n24q02m.com/hull/overview/).
- [better-semantic-release](https://github.com/n24q02m/better-semantic-release) — drop-in python-semantic-release fork with release-safety guards. Start at [/bsr/overview/](https://docs.n24q02m.com/bsr/overview/).
- [homebrew-tap](https://github.com/n24q02m/homebrew-tap) and [scoop-bucket](https://github.com/n24q02m/scoop-bucket) — package-manager install channels for skret and the MCP CLIs: [/install/package-managers/](https://docs.n24q02m.com/install/package-managers/).
- [better-drive](https://github.com/n24q02m/better-drive) (archived 2026-09-13) — cross-platform Google Drive sync & virtual-drive mount (rclone engine). Docs: [/bdrive/overview/](https://docs.n24q02m.com/bdrive/overview/).

The `skret/**` and `plugins/**` sections were ported from the skret and
claude-plugins Astro sites on 2026-11-10; `docs-redirects.json` maps every old
page URL on those two domains to its path here.

The portal is the canonical documentation surface. The Skret shell and PowerShell
installer entry points are kept at `/install.sh` and `/install.ps1`; each endpoint
redirects to the tracked installer source in the Skret repository, whose installer
then selects and verifies a versioned release.

## Table of contents

- [Install and run locally](#install-and-run-locally)
- [Deploy](#deploy)
- [License](#license)

## Install and run locally

```
git clone https://github.com/n24q02m/tools-docs.git
cd tools-docs
pnpm install
pnpm run dev     # local preview
pnpm run build   # outputs dist/
```

With [mise](https://mise.jdx.dev/), `mise run setup` installs Node 26, pnpm 12, the
dependencies and the git hooks, and `mise run dev` / `mise run build` run the same scripts.

## Deploy

Deploy is manual: run the **Deploy** workflow (`workflow_dispatch`) -> `wrangler pages deploy dist --project-name=tools-n24q02m --branch=main`.
The Pages project is a Direct Upload project with no git source, so a push to `main` runs CI (build check) but does not publish.
Requires repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`. See `DEPLOY.md`.

<!-- BEGIN: AUTO-GENERATED-CROSS-PROMO -->
<details>
  <summary><strong>Sister projects from n24q02m</strong> (click to expand)</summary>

| Project                                                                       | Tagline                                                                          | Tag         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------- |
| [better-semantic-release](https://github.com/n24q02m/better-semantic-release) | Drop-in python-semantic-release fork with built-in release-safety guards (orp... | Tooling     |
| [claude-plugins](https://github.com/n24q02m/claude-plugins)                   | Claude Code plugin marketplace for the n24q02m MCP servers -- install web sea... | Marketplace |
| [crg](https://github.com/n24q02m/crg)                                         | Knowledge graph for token-efficient code reviews -- semantic search and call-... | MCP         |
| [email](https://github.com/n24q02m/email)                                     | IMAP/SMTP email for AI agents -- read, send, organize folders, and manage att... | MCP         |
| [fastretrieval](https://github.com/n24q02m/fastretrieval)                     | Fast multi-model retrieval runtime: ONNX and GGUF embeddings, reranking, and ... | Tooling     |
| [hull](https://github.com/n24q02m/hull)                                       | hull is the shared monorepo core for the wet, crg and mnemo self-hosted stack    | MCP         |
| [jules-task-archiver](https://github.com/n24q02m/jules-task-archiver)         | Chrome Extension for bulk operations on Jules tasks via batchexecute API -- a... | Tooling     |
| [mnemo](https://github.com/n24q02m/mnemo)                                     | Persistent AI memory with hybrid search. Open, free, unlimited.                  | MCP         |
| [notion](https://github.com/n24q02m/notion)                                   | Markdown-first Notion for AI agents -- pages, databases, blocks, and comments... | MCP         |
| [sillstone](https://github.com/n24q02m/sillstone)                             | Pure-Rust multimedia, hashing, and array suite                                   | Tooling     |
| [skret](https://github.com/n24q02m/skret)                                     | Secrets without the server.                                                      | CLI         |
| [tacet](https://github.com/n24q02m/tacet)                                     | A self-distilling neuro-symbolic cascade that amortises LLM cost across knowl... | Tooling     |
| [telegram](https://github.com/n24q02m/telegram)                               | Telegram for AI agents -- messages, chats, media, and contacts across both bo... | MCP         |
| [tools-docs](https://github.com/n24q02m/tools-docs)                           | Docs portal for the n24q02m open-source tool stack (skret, MCP plugins, hull,... | Tooling     |
| [wet](https://github.com/n24q02m/wet)                                         | Open-source MCP server for AI agents: web search, content extraction, and lib... | MCP         |
| [workspace](https://github.com/n24q02m/workspace)                             | Google Workspace MCP server (Docs/Drive/Calendar/Gmail/Sheets/Slides/Tasks/Ch... | MCP         |

</details>
<!-- END: AUTO-GENERATED-CROSS-PROMO -->

## License

[Apache-2.0](LICENSE) © n24q02m
