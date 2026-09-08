---
title: Command reference
description: Core Skret commands, flags and scripting behavior
---

This is the portal copy of the maintained core command reference. The command
interface is also available from `skret --help`.

## Global flags

| Flag | Meaning |
|---|---|
| `-e, --env <name>` | Select an environment, overriding `default_env`. |
| `--provider <aws\|local>` | Override the configured provider. |
| `--path <prefix>` | Override the secret path prefix. |
| `--region <region>` | Override the cloud region. |
| `--profile <name>` | Use a named cloud profile. |
| `--file <path>` | Override the local-provider file. |
| `--config <path>` | Load a specific `.skret.yaml`, bypassing directory discovery. |
| `--log-level <debug\|info\|warn\|error>` | Set logging verbosity; `SKRET_LOG` is equivalent. |

`init`, `setup` and `import` have local flags that shadow same-named global flags.
For Git Bash/MSYS, set `MSYS_NO_PATHCONV=1` when a key or path could be rewritten
as a Windows path.

## Project and authentication

```sh
skret init --provider=aws --path=/myapp/prod --region=ap-southeast-1
skret setup
```

`init` writes `.skret.yaml` in the current directory and adds local secret files to
`.gitignore`. `setup` is idempotent, creates the config and authenticates the
provider. Use `skret bootstrap` to provision a least-privilege identity before
sharing access with contributors.

## Read and write

```sh
skret get DATABASE_URL
skret get DATABASE_URL --plain
skret set API_KEY --from-stdin < api-key.txt
skret list
skret list --format=json
skret delete OLD_TOKEN --confirm
```

`get --plain` emits the exact value bytes without a trailing newline. `list` is
names-only by default; `--values` performs decryption. `delete` is permanent and
requires confirmation unless `--confirm`/`--force` is provided.

## Environment injection

```sh
skret env --format=dotenv > .env
skret env --format=json
skret run -- ./server
skret run --watch -- make up-prod
```

`env` supports `dotenv`, `json`, `yaml` and `export`. `run` passes the command
after `--` through unchanged, injects resolved values into its environment, and
returns `ExitValidationError` (8) when required keys are missing. `--watch` uses
fingerprints and restarts the child when the secret set changes.

## Migration and automation

```sh
skret import --from=dotenv --file=.env
skret import --from=doppler --doppler-project=app --doppler-config=prd
skret diff prod staging --exit-code
skret sync --to=github
skret scan --staged
skret template --input=.env.example --output=.env
```

`import` is a one-time migration; `sync` handles ongoing outward propagation.
`diff --exit-code` is a drift gate, `scan` detects managed values in tracked files,
and `template` renders `${KEY}` placeholders without writing values to logs.

For advanced command behavior, see the [maintained Skret command source](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/reference/commands.md)
and [agent guide](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/guide/agents.md).
