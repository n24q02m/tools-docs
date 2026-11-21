# Contributing to tools-docs

## Development Setup

1. Install [mise](https://mise.jdx.dev/)
2. Clone [skret](https://github.com/n24q02m/skret) next to this repository, or set
   `SKRET_DIR` to a checkout elsewhere
3. Run `mise run setup`
4. Make your changes. Pages live under `src/content/docs/`, except the `skret/` section:
   the build compiles it from skret, so change those pages there. Portal pages under
   `skret/` that have no source page live in `src/portal-pages/skret/`.
5. Run `mise run test` and `mise run build`, and check the pages with `mise run dev`
6. Commit with `feat:` or `fix:` prefix

## Commit Convention

Only two prefixes allowed:
- `feat:` — new features
- `fix:` — bug fixes

## Pull Requests

- One PR per feature/fix
- `pnpm test` (95% coverage of `scripts/sync-sources.mjs`) and `pnpm run build` must succeed
- All CI checks must pass
