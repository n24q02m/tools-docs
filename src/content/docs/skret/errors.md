---
title: Error codes
description: Structured Skret exit codes and remediation
---

Every failure has a structured exit code and a human-readable message on stderr.
Use these codes in scripts instead of matching error text.

| Code | Constant | Meaning | First remediation |
|---:|---|---|---|
| 0 | `ExitSuccess` | Completed successfully | — |
| 1 | `ExitGenericError` | Unclassified error | Read the message; file a bug if unexpected. |
| 2 | `ExitConfigError` | Invalid or missing configuration | Check `.skret.yaml`; run `skret init`. |
| 3 | `ExitProviderError` | Backend/provider failure | Check provider connectivity, region and service status. |
| 4 | `ExitAuthError` | Authentication failed | Refresh credentials and verify IAM grants. |
| 5 | `ExitNotFoundError` | Secret does not exist | Check the key and selected `--env`; run `skret list`. |
| 6 | `ExitConflictError` | Resource conflict | Choose `--on-conflict=overwrite` or `skip` where supported. |
| 7 | `ExitNetworkError` | Network/connectivity failure | Check DNS, firewall and private endpoints. |
| 8 | `ExitValidationError` | Input validation failed | Check key format, required fields and provider size limits. |
| 9 | `ExitDrift` | Secret sets differ | Review `skret diff`; re-sync or import deliberately. |
| 10 | `ExitLeakFound` | Managed value found in a tracked file | Remove the value, rotate if committed, and rerun `skret scan`. |
| 125 | `ExitExecError` | Child process could not execute | Verify the command after `skret run --` exists in `PATH`. |

## Scripting example

```bash
skret get DATABASE_URL >/dev/null 2>&1
case $? in
  0) echo "secret exists" ;;
  2) echo "configuration error" >&2 ;;
  4) echo "authentication error" >&2 ;;
  5) echo "secret not found" >&2 ;;
  *) echo "unexpected skret exit" >&2; exit 1 ;;
esac
```

For JSON-capable commands, use `--format=json` to consume a machine-readable
success or error envelope. Set `SKRET_LOG=debug` for configuration-resolution
context; secret values are redacted from logs.

See the [maintained error-code source](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/reference/error-codes.md)
for typed library errors and provider-specific mappings.
