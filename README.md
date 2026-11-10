# tools-docs

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

## Develop

```
pnpm install
pnpm run dev     # local preview
pnpm run build   # outputs dist/
```

## Deploy

Deploy is manual: run the **Deploy** workflow (`workflow_dispatch`) -> `wrangler pages deploy dist --project-name=tools-n24q02m --branch=main`.
The Pages project is a Direct Upload project with no git source, so a push to `main` runs CI (build check) but does not publish.
Requires repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`. See `DEPLOY.md`.
