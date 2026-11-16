# Agent Collaboration

## Quick reference

- Repo: `n24q02m/tools-docs`
- Description: Docs portal for the n24q02m open-source tool stack (skret, MCP plugins, hull, better-semantic-release and more), built with Astro and deployed to Cloudflare Pages.
- Site: <https://docs.n24q02m.com>
- License: none declared yet (the repository has no LICENSE file)

## Build & Test

See [README.md](README.md) for the page map. For development:

```sh
mise run setup     # First-time dev environment: Node, pnpm, dependencies, git hooks
mise run dev       # Local preview server
mise run build     # Production build into dist/ (the check CI runs)
```

Pages live under `src/content/docs/`. There is no unit test suite: CI checks that
`pnpm run build` succeeds and runs CodeQL.

## Deploy

There are no versioned releases and nothing is published to a package registry.
Deploys are manual: run `cd.yml` (`workflow_dispatch`), which builds the site and runs
`wrangler pages deploy dist --project-name=tools-n24q02m --branch=main`. See
[DEPLOY.md](DEPLOY.md).

## Conventions

- Commits: only `feat:` and `fix:` prefixes (enforced by pre-commit `commit-msg` hook)
- No secrets in code, commits, or memory — use [skret](https://skret.n24q02m.com) for secret retrieval
