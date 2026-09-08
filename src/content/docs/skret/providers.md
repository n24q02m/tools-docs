---
title: Provider reference
description: AWS SSM and local provider behavior, limits and safety
---

Skret resolves one provider per environment. Configure the provider in
`.skret.yaml`, then use the same commands regardless of backend.

## AWS SSM Parameter Store

```yaml
environments:
  prod:
    provider: aws
    path: /myapp/prod
    region: ap-southeast-1
    # profile: production
```

The minimum path-scoped policy needs `ssm:GetParameter`,
`ssm:GetParametersByPath`, `ssm:PutParameter` and `ssm:DeleteParameter`. Values
are stored as `SecureString`; KMS permissions are needed when a customer key is
used. Prefer short-lived SSO/OIDC or role credentials over static keys.

Skret writes Standard-tier parameters only:

| Resource | Limit / behavior |
|---|---|
| Parameter value | 4 KB; larger values fail with provider error (exit 3). |
| Parameters | 10,000 per account/region (Standard quota). |
| Read throughput | `GetParametersByPath` service quota applies. |
| Decryption | At read time; values are not cached to disk. |

## Local YAML provider

```yaml
environments:
  dev:
    provider: local
    file: ./.secrets.dev.yaml
```

The local file is plain YAML and is for development/testing only. It is not
encrypted and must never contain production secrets. `skret init` adds
`.secrets.*.yaml`/`.yml` to `.gitignore`; preserve owner-only file permissions.

```yaml
version: "1"
secrets:
  DATABASE_URL: "postgres://dev@localhost/mydb"
```

| Capability | AWS SSM | Local YAML |
|---|---:|---:|
| Read / write | yes | yes |
| Versioning | provider-backed | no |
| Tagging | provider-backed | no |
| Encryption | SecureString/KMS | no |

See the [provider comparison](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/providers/comparison.md)
and [AWS provider reference](https://github.com/n24q02m/skret/blob/main/docs/src/content/docs/providers/aws.md)
for provider-specific IAM and quota details.
