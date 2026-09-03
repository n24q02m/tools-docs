---
title: Release channels
description: Beta-first releases and stable promotion
---
bsr releases beta-first:

- **Beta** (`v1.6.0-beta.N`): pre-releases carrying new publisher work; consumers opt in explicitly by pinning the beta SHA (as the skret publisher tuple does).
- **Stable** (`v1.5.0`): the default pin target for consumer workflows. Promotion is a deliberate, user-gated event — the release workflow computes the version and the protected environment publishes it.

## Choosing a pin

- Most repos: pin the current **stable** release commit.
- Repos needing the publisher flow: pin the **G1 registry tuple** (release + publish-action at the registry-certified head).
- Exceptions (e.g. a targeted fix on fork main) are deliberate and documented beside the pin.
