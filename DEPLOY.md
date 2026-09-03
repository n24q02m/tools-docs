# Cloudflare Pages wiring

- Pages project: `tools-n24q02m` (production branch `main`)
- Custom domain: `tools.n24q02m.com` (CNAME -> `tools-n24q02m.pages.dev`)
- Repo secrets: `CLOUDFLARE_API_TOKEN` (Pages:Edit + Zone DNS edit on n24q02m.com), `CLOUDFLARE_ACCOUNT_ID`

The deploy workflow builds with bun and runs `wrangler pages deploy dist --project-name=tools-n24q02m`.
