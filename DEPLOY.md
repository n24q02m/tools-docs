# Cloudflare Pages wiring

- Pages project: `tools-n24q02m` (production branch `main`)
- Custom domain: `tools.n24q02m.com` (CNAME -> `tools-n24q02m.pages.dev`)
- Installer aliases: `/install.sh` and `/install.ps1` redirect to the Skret repository's
  tracked installer source. Keep these paths stable; users may pipe either response to
  their shell or PowerShell.
- Repo secrets: `CLOUDFLARE_API_TOKEN` (Pages:Edit + Zone:Read on n24q02m.com — DNS write returns 10000; DEPLOY.md's "Zone DNS edit" claim corrected 2026-09-17), `CLOUDFLARE_ACCOUNT_ID`
- skret docs section removed 2026-09-17: canonical source is the skret repo's own `docs/` synced into the unified hub at `mcp.n24q02m.com/skret/` (soon `docs.n24q02m.com/skret/`); `/skret/*` paths 301 via `public/_redirects`.

The deploy workflow installs pnpm 10 and runs `pnpm install --frozen-lockfile`,
`pnpm run build`, then `wrangler pages deploy dist --project-name=tools-n24q02m`.
The old Skret Astro deployment should be reduced to a redirect-only deployment after
the aliases are live; see the R13 handoff evidence for the exact route map and
post-deploy checks.
