# Contributing to tools-docs

## Development Setup

1. Install [mise](https://mise.jdx.dev/)
2. Run `mise run setup`
3. Make your changes (pages live under `src/content/docs/`)
4. Run `mise run build`, and check the pages with `mise run dev`
5. Commit with `feat:` or `fix:` prefix

## Commit Convention

Only two prefixes allowed:
- `feat:` — new features
- `fix:` — bug fixes

## Pull Requests

- One PR per feature/fix
- `pnpm run build` must succeed (the site has no unit test suite)
- All CI checks must pass
