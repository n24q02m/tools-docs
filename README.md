# tools-docs

Docs portal at **https://tools.n24q02m.com** covering three open-source tools:

- [skret](https://github.com/n24q02m/skret) — secrets without the server. Start at [/skret/overview/](https://tools.n24q02m.com/skret/overview/) or [/skret/install/](https://tools.n24q02m.com/skret/install/).
- [better-semantic-release](https://github.com/n24q02m/better-semantic-release) — drop-in python-semantic-release fork with release-safety guards. Start at [/bsr/overview/](https://tools.n24q02m.com/bsr/overview/).
- [better-drive](https://github.com/n24q02m/better-drive) — cross-platform Google Drive sync & virtual-drive mount (rclone engine). Start at [/bdrive/overview/](https://tools.n24q02m.com/bdrive/overview/).

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

Push to `main` (or run the **Deploy** workflow) -> `wrangler pages deploy dist --project-name=tools-n24q02m`.
Requires repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`. See `DEPLOY.md`.
