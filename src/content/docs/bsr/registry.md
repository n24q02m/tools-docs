---
title: Action-pin registry
description: Signed registry generations — the freshness contract behind bsr pins
---
The `publish-action` is a Docker-type GitHub Action: it runs from an **OCI container image** published to GHCR. To let consumers verify that a pin is genuine and fresh, bsr publishes a **signed action-pin registry record** (`bsr-action-registry.json` + sigstore bundle) on each release.

## Record contents

- `generation` — monotonic counter chaining to the `previous` record (hashes included, rollback-resistant)
- `phase` — current trust phase (for example, `G1`)
- `head_oid` — the source commit the record certifies
- publisher **image digest** and registry asset names
- `issued_at` / `expires_at` — the freshness window

## Loader

Consumers fresh-load and verify with the `registry-action` composite (or
`scripts/action_pin_registry.py load`): it fetches the live record, verifies the
sigstore signature, checks expiry, and compares the expected tuple (action SHAs +
image digest) against what the workflow actually pins. Any drift fails the release.
See the [registry verifier source](https://github.com/n24q02m/better-semantic-release/tree/main/scripts).

## Freshness

Records carry a finite expiry window. A record for unchanged source can be
re-published at any time (`registry-g1` workflow); a **new generation** is issued
only when bsr source changes — publisher image build first, then registry
publication, then consumer re-pin. Treat the [live release assets](https://github.com/n24q02m/better-semantic-release/releases)
as authoritative rather than copying an old record.
