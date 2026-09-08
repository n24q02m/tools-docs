# Cloudflare Pages wiring

- Pages project: `tools-n24q02m` (production branch `main`)
- Custom domain: `tools.n24q02m.com` (CNAME -> `tools-n24q02m.pages.dev`)
- Installer aliases: `/install.sh` and `/install.ps1` redirect to the Skret repository's
  tracked installer source. Keep these paths stable; users may pipe either response to
  their shell or PowerShell.
- Repo secrets: `CLOUDFLARE_API_TOKEN` (Pages:Edit + Zone DNS edit on n24q02m.com), `CLOUDFLARE_ACCOUNT_ID`

The deploy workflow installs pnpm 10 and runs `pnpm install --frozen-lockfile`,
`pnpm run build`, then `wrangler pages deploy dist --project-name=tools-n24q02m`.
The old Skret Astro deployment should be reduced to a redirect-only deployment after
the aliases are live; see the R13 handoff evidence for the exact route map and
post-deploy checks.
