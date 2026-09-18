# Security Playbook

Use this playbook whenever a Portfolio change introduces security, privacy, credential, submodule-trust, or external-mutation concerns.

## When

- Reviewing or changing secrets, credentials, public content, contact behavior, dependencies, submodules, marketplace source, or deployable output.
- Performing destructive, permission-sensitive, or externally mutating actions.

## Required skills

- `risk-gates` for scope, authority, privacy, and safety decisions.
- `connector-safety` for connector or external mutations.
- `requesting-code-review` when security concerns are part of a formal review.

## Composition

1. Identify the concrete trust or authority boundary introduced by the change.
2. Apply the relevant risk or connector-safety capability before mutation.
3. Inspect public/deployable output and dependency/submodule changes for unintended exposure or trust expansion.
4. Escalate only evidence-backed findings; do not invent threat models unrelated to the changed slice.

## Doctrine and contracts

- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) for scope boundaries.
- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) for marketplace-source and publication requirements.

## Local commands and paths

- Review `.gitmodules`, `.agents/plugins/marketplace.json`, and the marketplace-source gitlink when plugin/source trust changes.
- Treat `src/client/dist/` as the complete deployable product when checking for source maps, private paths, credentials, or runtime-only configuration.
- Review public content under `src/client/src/data/content/` for private filesystem paths, internal URLs, or unpublished contact details.

## Evidence contract

- No secrets, API keys, credentials, private paths, or unintended runtime configuration are introduced into tracked or deployable output.
- Dependency, submodule, and plugin changes have a justified trust boundary.
- Contact delivery remains disabled unless an intentionally reviewed, abuse-resistant endpoint is configured.

## Prohibited combinations

- Do not publish personal email addresses, phone numbers, secrets, or credentials as shortcuts.
- Do not bypass authority gates for destructive or externally visible actions.
- Do not broaden a security review beyond the changed trust boundary without evidence.

## Runbook routing

None.
