# Stack — node-cli

The stack is `node-cli` (`devos/project.json` `stack`). Versions below are the stable releases
current on 2026-10-25. Commands that produced them: `npm view typescript version` → 7.0.2,
`npm view vitest version` → 5.0.5, `npm view pino version` → 10.4.0,
`npm view @types/node@22 version` → the last line is 22.20.5,
`npm view pnpm@latest-10 version` → 10.34.8.
Node.js 22.23.4 is the current 22 LTS ([release notes](https://nodejs.org/en/blog/release/v22.23.4)).
The workflows pin `node-version: 22`, so the patch moves with that line (D-01).

## Versions

| Tool | Version | Role |
|---|---|---|
| Node.js | 22 (22.23.4 on the lookup date) | Runtime. Vitest requires Node `>=22.12.0` ([Vitest guide](https://vitest.dev/guide/)). |
| pnpm | 10 (10.34.8 on the lookup date) | Package manager. CI installs `pnpm@10`. Do not set `packageManager` in `package.json`: Corepack would then demand one exact patch. |
| TypeScript | 7.0.2 | Types, `typecheck`, `build`. Package `typescript`. Current stable; 7.1 is beta and is not used ([typescriptlang.org/download](https://www.typescriptlang.org/download/)). |
| Vitest | 5.0.5 | Tests. Package `vitest`. |
| `@types/node` | 22.20.5 | Types for Node 22. Do not install the `latest` tag; that is the Node 26 line. |
| pino | 10.4.0 | The only logger ([getpino.io](https://getpino.io/)). |

Vite may appear in `pnpm-lock.yaml` because Vitest depends on it. It is not a direct dependency
and there is no Vite application.

## Commands

From `devos/project.json` `stack.commands`. The names on the left are the cycle's checks.
The strings on the right are what `package.json` `scripts` must run.

| Check | Cycle command | Script |
|---|---|---|
| install | `pnpm install --frozen-lockfile` | The lockfile T01 generates. |
| typecheck | `pnpm run typecheck` | `tsc --noEmit` |
| lint | `pnpm run lint` | `tsc --noEmit` (D-02). |
| test | `pnpm run test` | `vitest run` |
| build | `pnpm run build` | `tsc -p tsconfig.build.json` |

`vitest` without `run` watches ([Vitest guide](https://vitest.dev/guide/)). The script includes
`run` so a check exits. Do not add a coverage tool, ESLint, or a second test runner.

How to test: `pnpm run test`. The architecture test and the failure-path test live in `tests/`.
How to typecheck: `pnpm run typecheck`. How to build: `pnpm run build`, which writes `dist/`.

## Layout

```
src/cli.ts                 process edge. The framework in the architecture rule.
src/logger.ts              the only module that imports pino
src/errors.ts              safe failure: log a fixed binding, return a fixed sentence
src/domain/                pure code. T01 leaves an empty module. T02 puts the greeting here.
src/i18n/messages/en.json  the en catalogue
tests/                     vitest files
dist/                      tsc output, gitignored
```

There is no `src/app`, no `supabase/`, and no CSS.

## TypeScript

`tsconfig.json` typechecks `src` and `tests` with `noEmit`. `tsconfig.build.json` emits only
`src` to `dist`. Both use `strict`, `module: NodeNext`, `moduleResolution: NodeNext`, and
`target: ES2022`.

Relative imports use the `.js` extension (`import { logger } from "./logger.js"`).
`package.json` `"type"` is `"module"`.

`package.json` `"engines"` is `{ "node": ">=22.12.0" }`. `"private"` is true. `"name"` is
`hello-cli`. The `bin` name is `hello-cli`, pointed at `dist/cli.js`. `src/cli.ts` starts with
`#!/usr/bin/env node`, and the built file must keep that first line.

## Logging

One logger, created in `src/logger.ts`:

- Import `pino` only in that file.
- Write JSON to stderr with `pino.destination(2)`, so stdout stays free for the greeting.
- Other modules import `logger` from that file. They do not import `pino` and they do not call
  `console.log`, `console.info`, `console.warn`, `console.error`, or `console.debug`.
- Do not log the name argument, a thrown message, or a stack.
- Do not add a transport or `pino-pretty`.

The greeting and the refusals are product output (`process.stdout` and `process.stderr`), not
log lines. T02 writes them. T01 writes stderr only on the failure path.

## Architecture

`stack.scaffold.architecture`: code under `src/domain` imports nothing from the framework, the
database client, or `src/app`.

In this stack the framework is `src/cli.ts` and every module outside `src/domain`. There is no
database client and no `src/app`. The test still treats those as failures.

A specifier in `src/domain` is allowed only when it starts with `./` and does not contain `..`.
T01's `src/domain/index.ts` exports nothing and imports nothing.

## Conventions

- The automated profile is the default (PR-01): bash, Node 22, pnpm 10. A fence says so.
- pnpm only. Never `npm install` into this repository.
- A new direct dependency needs a fence line that cites why it is there.
- User-facing sentences live in `src/i18n/messages/en.json` once T02 adds them. T01 leaves `{}`.
- No `http` or `https` URL in `src/` (`guard:design`).
- No phone or email literal (`guard:literals`).
- No author field and no contact URL in `package.json`.
- `pnpm init` is run as `pnpm init --bare` (D-03, [pnpm init](https://pnpm.io/cli/init)).
- Follow this file. Do not add a layer the fence does not name.
