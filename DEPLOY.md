# Cloudflare Pages wiring

- Pages project: `tools-n24q02m` (production branch `main`)
- Custom domains: `docs.n24q02m.com` (canonical, CNAME -> `tools-n24q02m.pages.dev`) and `tools.n24q02m.com`
  (301 -> `docs.n24q02m.com` via the zone's dynamic-redirect rule)
- Installer aliases: `/install.sh` and `/install.ps1` redirect to the Skret repository's
  tracked installer source. Keep these paths stable; users may pipe either response to
  their shell or PowerShell.
- Repo secrets: `CLOUDFLARE_API_TOKEN` (Pages:Edit + Zone:Read only on n24q02m.com — DNS edit claim removed 2026-09-17, verified false via dns_records 10000 on run 35173109936), `CLOUDFLARE_ACCOUNT_ID`
- Docs consolidation 2026-11-10: `src/content/docs/skret/**` (ported from `n24q02m/skret`
  `docs/`) and `src/content/docs/plugins/**` (ported from `n24q02m/claude-plugins` `docs/`)
  are served from this site, so the former `/skret/*` catch-all in `public/_redirects` is
  gone and only the pre-consolidation short slugs redirect. Old page URLs on
  `skret.n24q02m.com` and `docs.n24q02m.com` map through the root `docs-redirects.json`;
  the redirect-only deployments of those two domains are what must be updated when this
  build is promoted.

The deploy workflow installs pnpm 12 (Node 26) and runs `pnpm install --frozen-lockfile`,
`pnpm run build`, then `wrangler pages deploy dist --project-name=tools-n24q02m`.
The old Skret Astro deployment should be reduced to a redirect-only deployment after
the aliases are live; see the R13 handoff evidence for the exact route map and
post-deploy checks.
