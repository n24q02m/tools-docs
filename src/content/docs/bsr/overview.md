---
title: Overview
description: better-semantic-release — drop-in python-semantic-release fork with release-safety guards
---
better-semantic-release (**bsr**) is a drop-in fork of [python-semantic-release](https://github.com/python-semantic-release/python-semantic-release) with built-in release-safety guards. It keeps the same `[tool.semantic_release]` configuration schema, the same `semantic-release` CLI and the same GitHub Action interface — switching over means pointing the `uses:` line at the fork.

## Install the Python package

Install the package into an isolated environment and invoke the compatible
`semantic-release` command:

```sh
uv tool install better-semantic-release
# or: python -m pip install better-semantic-release
semantic-release --help
```

The package and release notes are published on [PyPI](https://pypi.org/project/better-semantic-release/)
and [GitHub releases](https://github.com/n24q02m/better-semantic-release/releases).

## What the fork adds

- **Release-safety guards** that run before any commit, tag or push (orphan-tag guard, registry-collision guard, and more); opt out per-repository under `[tool.semantic_release.bsr]`.
- **A hardened publish path**: the OCI-based `publish-action` that creates the GitHub release and uploads assets from a digest-pinned container image.
- **A signed action-pin registry** so consumer repos can verify that the pin they use is the genuine, fresh publisher — see [Action-pin registry](/bsr/registry/).

## Using it in a workflow

```yaml
- uses: n24q02m/better-semantic-release@<40-char-sha>  # <release-version>
```

Pin the full commit SHA and keep the version in the trailing comment — that
comment is what Renovate/Dependabot read. See [Action pinning](/bsr/pinning/) and
the [upstream action contract](https://github.com/n24q02m/better-semantic-release/blob/main/action.yml).
