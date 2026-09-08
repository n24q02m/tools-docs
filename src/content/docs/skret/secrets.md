---
title: Secrets workflow
description: How projects consume secrets with skret
---
A project opts in with `.skret.yaml`:

```yaml
version: "1"
default_env: prod
project: my-service
environments:
  prod:
    provider: aws
    path: /my-service/prod
    region: ap-southeast-1
```

- Local development: `skret env --format dotenv > .env` (or read directly in shells with `skret get KEY`).
- CI: prefer OIDC roles; the machine identity reads the configured path directly — no static credentials in the repo.
- Onboarding: run `skret bootstrap` once so each contributor holds a least-privilege key instead of the admin credential.
- Command execution: `skret run -- <command>` injects values into the child process without writing a secret file.

Inventory dashboards are published with `skret hub` to a vault endpoint — key names
and hashes only, never values. Continue to the [portal command reference](/skret/commands/),
[provider reference](/skret/providers/), [error codes](/skret/errors/), or
[maintained agent guide](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/guide/agents.md).
