# Security model

Adapted for a local command. There is no HTTP server, no account, no key, and no database.

## Principals

The person who runs the command is not an account. There is no sign-in, no role, and no session.

## The argument

`src/cli.ts` checks the argument before it is used (`docs/CONTENT_MODEL.md`). A failed check
exits 1 with the fixed refusal. The name is not written to disk and not sent.

The check is a string check in the command. Zod is not a dependency: one argument does not need
a schema library.

## Failures

A throw is caught at the process edge. The log line is `{ "kind": "failure" }` through
`src/logger.ts`. The thrown message, the stack, and the argument are not logged. Stderr receives
`The command could not be completed.` and a newline.

## Logger

`pino` is constructed only in `src/logger.ts`. It writes JSON to stderr (file descriptor 2), so
a later greeting on stdout is not mixed with logs. No transport and no `pino-pretty`. Logs are
not shipped to a vendor.

## Network and headers

The command opens no socket. There is no `next.config.ts` and no security-header file. Adding
either is out of scope.

## Secrets

No credential, token, project ref, or connection string belongs in the tree, the logs, or the
reports. The product has no product secret (`docs/setup-items.json` is not used; there is
nothing to list).

## Dependencies

Direct dependencies are only those a fence names. T01 names TypeScript, Vitest, `@types/node`,
and `pino`.
