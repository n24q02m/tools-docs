---
title: Homebrew and Scoop
description: Install the n24q02m command-line tools from the Homebrew tap or the Scoop bucket
---

The command-line tools below ship through two package-manager channels:

| Channel | Repository | Manager | Platforms |
|---|---|---|---|
| `n24q02m/tap` | [n24q02m/homebrew-tap](https://github.com/n24q02m/homebrew-tap) | Homebrew | macOS, Linux |
| `n24q02m` | [n24q02m/scoop-bucket](https://github.com/n24q02m/scoop-bucket) | Scoop | Windows |

## Add the channel once

```sh
# Homebrew: tap once, then install any package by name
brew tap n24q02m/tap
brew install skret
```

```pwsh
# Scoop: add the bucket once, then install any package by name
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install skret
```

The one-shot form works too, without adding the tap first:
`brew install n24q02m/tap/skret`.

## Packages

| Package | Homebrew kind | Scoop manifest | What it does |
|---|---|---|---|
| `skret` | cask | yes | Secret manager CLI — [docs](/skret/overview/) |
| `wet` | formula | yes | Web extraction and search MCP server/CLI — [docs](/tools/wet/) |
| `mnemo` | formula | yes | Episodic and semantic memory MCP server/CLI — [docs](/tools/mnemo/) |
| `crg` | formula | yes | Code-review and AST symbol graph MCP server/CLI — [docs](/tools/crg/) |
| `telegram` | formula | yes | Telegram client and bot MCP server/CLI — [docs](/tools/telegram/) |
| `email` | formula | yes | IMAP and SMTP email MCP server/CLI — [docs](/tools/email/) |
| `notion` | formula | yes | Notion workspace and document MCP server/CLI — [docs](/tools/notion/) |
| `workspace` | formula | yes | Google Workspace MCP server/CLI — [docs](/tools/workspace/) |
| `bsr` | formula | yes | better-semantic-release command line (`bsr`, `better-semantic-release`) — [docs](/bsr/install/) |
| `fastretrieval` | formula | yes | Multi-model retrieval runtime for ONNX and GGUF embeddings and reranking — [docs](/fastretrieval/overview/) |

Ten packages in total: one cask, nine formulae, and a matching Scoop manifest for each.

`skret` is a cask because the tap distributes its prebuilt Go release archives: one
checksummed archive per target (macOS and Linux, arm64 and amd64). The cask installs
the binary and generates bash, zsh and fish completions from `skret completion`.

The nine formulae install the release the package registry serves, with every
dependency pinned by hash. `bsr`, `crg`, `fastretrieval`, `mnemo`, `telegram` and `wet`
install the PyPI wheel into a uv virtualenv on `python@3.13` from a hashed lock of the
release's dependencies; `crg`, `fastretrieval`, `mnemo`, `telegram` and `wet` need Apple
silicon on macOS. `email`, `notion` and `workspace`
install the npm tarball with `npm ci --omit=dev --ignore-scripts` against a pinned
lock file and depend on `node`. Each formula's `brew test` runs the installed binary
with `--version`.

On Windows the Scoop manifests pin every artifact with a `hash`. `skret` uses the
per-architecture Windows release zips. The Python tools install the PyPI wheel into a
uv virtualenv from the same kind of hashed lock and depend on `uv`; the Node tools
install the npm tarball with `npm ci` and depend on `nodejs`.

## How the channels stay current

Both repositories are updated by workflows, not by hand:

- skret's own `CD` workflow rewrites the cask (`Casks/skret.rb`) and its Scoop
  manifest (`bucket/skret.json`) from the `checksums.txt` of a published stable
  release. A stable dispatch does this automatically after publishing and also syncs
  the `skret` plugin into `claude-plugins`; `release_type=update-taps` remains
  available to repair a tap by hand. Prereleases are refused.
- For every other package, the `CD` workflow of the tap and of the bucket
  (`workflow_dispatch`) runs `scripts/bump.py` against the registry release,
  regenerates the lock files, then opens a pull request and merges it once its
  checks pass.
- Every entry pins its artifact by checksum — `sha256` in a cask or formula, `hash`
  in a Scoop manifest — so a changed pin is the visible signal that a new upstream
  release was picked up.

```sh
brew update && brew upgrade skret
```

```pwsh
scoop update && scoop update skret
```

## Verify an install

```sh
brew info n24q02m/tap/skret
```

```pwsh
scoop info skret
```

Both print the version the channel currently pins, which should match the newest
release of the upstream repository. Install methods that do not go through a package
manager (release archives, installers, language registries) are listed on each tool's
own page and in the [tool matrix](/reference/tool-matrix/).
