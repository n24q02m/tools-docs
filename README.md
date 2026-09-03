# tools-docs

Docs portal at **https://tools.n24q02m.com** covering three open-source tools:

- [skret](https://github.com/n24q02m/skret) — secrets without the server
- [better-semantic-release](https://github.com/n24q02m/better-semantic-release) — drop-in python-semantic-release fork with release-safety guards
- [better-drive](https://github.com/n24q02m/better-drive) — cross-platform Google Drive sync & virtual-drive mount (rclone engine)

## Develop

```
bun install
bun run dev     # local preview
bun run build   # outputs dist/
```

## Deploy

Push to `main` (or run the **Deploy** workflow) -> `wrangler pages deploy dist --project-name=tools-n24q02m`.
Requires repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`. See `DEPLOY.md`.
