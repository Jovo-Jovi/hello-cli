# Decisions

ODs are drafted for the developer. Approving this blueprint is the confirming act. A signed OD
is not edited in place; a later OD amends it.

Ids: no `docs/DECISIONS.md` existed before this blueprint, so the first id is OD-01.
Precedents stay at live maximum PR-53 (`docs/method/PRECEDENTS.md` states that maximum; this
blueprint adds no PR row). No carry-forward is opened.

## Operational decisions

### OD-01 — Profile, boundary, and a public repository

**Status:** DRAFT — the developer signs by approving this blueprint
**Amends:** none
**Requested by:** the blueprint, from `devos/answers.json` (`visibility` `public`, `stores_data` false, `sign_in` `none`)

**1.** The profile is Profile A, adapted. The non-waivable Boundary gate applies. No zone is declared. The command does not collect, store, or send personal data.
**2.** Profile B and the Personal-Data Protection gate do not apply. There is no `docs/PROTECTION_MODEL.md` and no `docs/DATA_MODEL.md`.
**3.** The git repository is public. Handbook §16.6 prefers private; the developer's answer `public` is the signed choice. Public-repository rules in `docs/BOUNDARY_MODEL.md` apply.
**4.** The name argument is process-local. It is not logged and not written to a file. A later change that stores or sends it is a new OD before code.

**Basis of signature:** the developer, by approving this blueprint.
**Does not decide:** the greeting text (that is `docs/CONTENT_MODEL.md` and OD-02), the agents, or the toolchain versions.

### OD-02 — MVP scope and the node-cli stack

**Status:** DRAFT — the developer signs by approving this blueprint
**Amends:** none
**Requested by:** the blueprint, from the brief and from `scope` `mvp`, `type` `cli`, `stack` `node-cli`

**1.** The MVP is the core flow: a command that prints a greeting for a name, as `docs/SCOPE.md` and `docs/CONTENT_MODEL.md` specify. There is no quotation; the brief is the source.
**2.** **Later** in `docs/SCOPE.md` is empty. The brief asks for no other feature. A further feature needs a change request.
**3.** Phases are T01 (scaffold, no greeting) and T02 (the greeting). There is no launch phase: `deploy` is `none`, and production hardening belongs to scope `full`.
**4.** The stack is `node-cli` as `devos/project.json` already records. No module provider is added. `ui` stays false.
**5.** The greeting wording and the argument rules in `docs/CONTENT_MODEL.md` are the spec (fit assumption 2 and 3).

**Basis of signature:** the developer, by approving this blueprint.
**Does not decide:** agent models, the relay, or tooling (OD-03, OD-04).

### OD-03 — Automated cycle and public relay

**Status:** DRAFT — the developer signs by approving this blueprint
**Amends:** none
**Requested by:** the blueprint, so the installed precedents that cite OD-03 have a decision in this repository

**1.** The project runs on the installed Dev OS cycle (GitHub Actions, `devos-cycle`). A local run is not a PASS.
**2.** After this blueprint, the reviewer writes `docs/reviews/**` and `docs/fences/**`. Product code is the builder's (PR-07).
**3.** One task per branch, `task/Tnn` (PR-03).
**4.** `resume.relay` stays `public`. Usage-limit waits longer than the inline maximum are relayed by `devos-wait`, because this repository is public and the relay is free there (PR-31).
**5.** In automated runs the runner owns git. The builder does not commit, push, or open a pull request (PR-04).
**6.** The builder writes `docs/reports/Tnn.md` with one section per attempt (PR-10).
**7.** If a required check fails, the verdict is FAIL even when the review says PASS (PR-08).

**Basis of signature:** the developer, by approving this blueprint.
**Does not decide:** product behavior (OD-01, OD-02) or which MCP servers are configured (OD-04).

### OD-04 — Tooling

**Status:** DRAFT — the developer signs by approving this blueprint
**Amends:** none
**Requested by:** the blueprint, handbook §17 step 3 and §7a of `docs/DEVOS_FIT.md`

**1.** `docs/DEVOS_FIT.md` §7a is the tooling decision. Include and Omit in that table are binding.
**2.** Context7 is the only MCP server, read-only, for library documentation. A connected server is not permission. Any other MCP call has to be named by a fence (PR-05).
**3.** No marketplace plugin, skill, or automation is added. The design skills already in `devos/skills/` stay for the engine's guard and are not read by a task while `ui` is false.
**4.** The runner owns git and, if a deploy is ever chosen, the deploy. No plugin is given that work.
**5.** The agents in `devos/project.json` stay as the developer set them. This OD does not change a model id.

**Basis of signature:** the developer, by approving this blueprint.
**Does not decide:** a future plugin. That would be a new OD.

## D-rows

### D-01 — Versions current on 2026-10-25

The versions in `docs/STACK.md` are the ones the registry and Node's release notes showed on that date. The runtime stays Node 22 because the workflows pin it. `@types/node` stays on the 22 line.

### D-02 — Lint is the TypeScript compiler

`pnpm run lint` runs `tsc --noEmit`. The cycle requires a lint script. The product has no style rules beyond the type checker, so ESLint is not a dependency.

### D-03 — `pnpm init --bare`

The scaffold's create line is `pnpm init`. pnpm 10.25.0 and later document `--bare`, which writes only the required manifest fields and so does not write an author ([pnpm init](https://pnpm.io/cli/init)). T01 uses `--bare` and reports the flag. If the flag is rejected, T01 runs `pnpm init` and deletes any `author` field.
