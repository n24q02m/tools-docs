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
mise run test      # Tests of scripts/sync-sources.mjs (95% coverage gate)
```

Pages live under `src/content/docs/`, except `skret/` and `plugins/`. Those sections are
compiled at build time from the [skret](https://github.com/n24q02m/skret) and
[claude-plugins](https://github.com/n24q02m/claude-plugins) repositories by
`scripts/sync-sources.mjs`, which `pnpm run dev` and `pnpm run build` run first: edit
those pages in their source repository. The per-server pages under `plugins/servers/`
come from `plugins/<name>/*.md` in claude-plugins, rendered by its
`docs/scripts/sync-plugin-docs.mjs`, which the compile runs. The script reads the
sibling checkouts `../skret` and `../claude-plugins` unless `SKRET_DIR` or
`CLAUDE_PLUGINS_DIR` is set, and fails if either is missing. Portal pages under
`skret/` or `plugins/` that have no source page live in `src/portal-pages/`.

CI runs `pnpm test`, which fails below 95% line, branch or function coverage of the
script. It also fails if anything under `src/content/docs/skret/` or
`src/content/docs/plugins/` is committed, checks that `pnpm run build` succeeds against
the `main` branches of skret and claude-plugins, and runs CodeQL.

## Deploy

There are no versioned releases and nothing is published to a package registry.
Deploys are manual: run `cd.yml` (`workflow_dispatch`), which builds the site, compiling
`skret/` and `plugins/` from the `main` branches of skret and claude-plugins, and runs
`wrangler pages deploy dist --project-name=tools-n24q02m --branch=main`. See
[DEPLOY.md](DEPLOY.md).

## Conventions

- Commits: only `feat:` and `fix:` prefixes (enforced by pre-commit `commit-msg` hook)
- No secrets in code, commits, or memory — use [skret](https://skret.n24q02m.com) for secret retrieval
