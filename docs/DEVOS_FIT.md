# DEVOS_FIT — Hello CLI

Fit of the Dev OS v2 handbook (`docs/method/DEV_OS_V2_REVIEWER.md`) to this project.
The developer signs it by approving the blueprint. Assumptions are in §7. Tooling is in §7a.
No question is left open (§10). `docs/OPEN_QUESTIONS.md` says so.

The handbook's copy of this file would sit at `docs/method/DEVOS_FIT.md`. This run's blueprint
names `docs/DEVOS_FIT.md`, so that is the only copy. `devos/project.json` appends that path to
the builder's deny list so the builder cannot edit it.

Lookup date for versions and the tooling pages: 2026-10-25.

## 1. What this project keeps

Source: handbook §0–§13, §17 and §18, read against `devos/answers.json`. There is no
`devos/intake-docs/` directory.

### Stations

| Station | Decision | Why |
|---|---|---|
| J0 Intake | Adapt | `devos init` already recorded the answers. There is no client, no existing site, and no estate to inventory. |
| J1 Scope | Include | This blueprint writes the brief, glossary, decisions and scope. |
| J2 Models | Adapt | Content, boundary, security and i18n only. No data model. |
| J3 Design | Omit | `devos/project.json` `ui` is false. There is no screen. |
| J4 Foundation | Include | Fence T01, the scaffold. No feature. |
| J5 Public site | Adapt | One task, T02, the greeting command. There is no website. |
| J6 Dashboard | Omit | `sign_in` is `none`. No accounts. |
| J7 Content | Omit | No client supplies content. The greeting text is fixed in `docs/CONTENT_MODEL.md`. |
| J8 Features | Omit | The brief has no feature beyond the greeting. |
| J9 Freeze and hardening | Omit | `scope` is `mvp`. Production hardening is the last phase of a `full` scope only. |
| J10 Cutover | Omit | `deploy` is `none`. No domain and no host. |
| J11 Maintenance | Omit | Nothing is launched. |

### Gates

| Gate | Decision |
|---|---|
| G-Intake | Met by `devos/answers.json`. No owner form is stored. |
| G-Scope | OD-01 through OD-04. The developer signs by approving this blueprint. |
| G-Models | Met by the four model documents below. There is no `DATA_MODEL.md`. |
| G-Design | Does not apply. `ui` is false. |
| G-Foundation | T01. `node scripts/devos/run-checks.mjs --strict` exits 0. |
| G-Public | Adapted. T02 proves the greeting command against `docs/CONTENT_MODEL.md`. |
| G-Dashboard, G-Content, G-Feature, G-Harden, G-Launch | Do not apply. |
| Boundary (handbook §10.2) | Included. Non-waivable. Profile A. No zone holds personal data. |
| Personal-Data Protection (handbook §10.3) | Does not apply. The product stores nothing. |
| Domain / clinical gate | Does not apply. |

### Documents

| Document | Decision |
|---|---|
| `docs/DEVOS_FIT.md` | Include. This file. |
| `docs/PRODUCT_BRIEF.md`, `docs/GLOSSARY.md` | Include. |
| `docs/DECISIONS.md`, `docs/SCOPE.md` | Include. |
| `docs/CONTENT_MODEL.md` | Include. The greeting text. |
| `docs/BOUNDARY_MODEL.md` | Include. Profile A, no zones. |
| `docs/SECURITY_MODEL.md` | Adapt. No HTTP, no accounts, no keys. |
| `docs/I18N_MODEL.md` | Adapt. One locale, `en`. |
| `docs/DATA_MODEL.md`, `docs/PROTECTION_MODEL.md` | Omit. `stores_data` is false. |
| `docs/DESIGN_SYSTEM.md` | Include, as a record that there is no interface. The §1 design contract is not used. |
| `docs/design/UI_ACCEPTANCE.md` | Omit. `ui` is false. |
| `docs/ADMIN_SPEC.md`, `docs/CUTOVER_RUNBOOK.md`, ADRs, `docs/research/**` | Omit. Nothing in the brief needs them. |
| `docs/PHASES.md`, `docs/SESSION_CONTEXT.md`, `docs/DEVELOPMENT_JOURNAL.md` | Include. |
| `docs/method/CARRY_FORWARDS.md` | Include. Empty. |
| `docs/method/PRECEDENTS.md` | Keep. PR-01 rewritten. Live maximum stays PR-53. |
| `docs/STACK.md` | Include. |
| `docs/OPEN_QUESTIONS.md` | Include. One line: no open questions. |
| Quotation, commercial docs, handover, operator guide | Omit. There is no client and no launch. |

### Guards

Every installed guard stays. They are method code and this run does not edit them.

| Guard | On this project |
|---|---|
| `guard:secrets`, `guard:phases`, `guard:naming`, `guard:manual`, `guard:config`, `guard:skills` | Run. |
| `guard:design` | Runs once `src/` exists. No CSS and no third-party URL in `src/`. |
| `guard:i18n` | Runs once `src/` exists. One catalogue, `src/i18n/messages/en.json`. |
| `guard:boundary` | Runs once `src/` exists. Profile A, `zones` empty. |
| `guard:literals` | Runs once `src/` exists. No phone or email literal. |
| `guard:design-spec` | A fence without a `- Screens:` line is not a UI fence. T01 has none. |
| `guard:data` | N/A until `supabase/` exists. This project does not create it. |
| `guard:services` | N/A until R2 or Firebase is in the tree. This project does not add either. |

### Modules

`stores_data` is false, so the backend module (`docs/method/FULLSTACK_MODULE.md`) is not adopted.
`devos/answers.json` `modules` is `{}`. No database, storage, or hosting provider was chosen.
No zone is named. `DATA_MODEL.md` and `PROTECTION_MODEL.md` are not planned.
T01 does not create `supabase/`.

`modules.observability` is absent. Treated as `none` (§7, assumption 4). T01 still adds the
structured logger `pino`, because `stack.scaffold.logger` is `pino`. No error-tracking vendor
is added before launch, because there is no launch phase.

## 2. Profile

**Profile A, adapted.** The Boundary gate applies: the command does not collect, store, or send
personal data. Profile B does not apply, because holding personal data is not the product.

The handbook's Profile A is a bilingual public site with a dashboard. This project keeps the
gate and drops the site, the dashboard, the second language, and the client. OD-01 records that.
A later change that stores the name, sends it, or adds an account is a new decision and a profile
review, not a silent edit.

## 3. Layers

Handbook §9, against the brief "A command-line tool that prints a greeting for a name."

| Layer | Decision | Cited need |
|---|---|---|
| Next.js, React, CSS, tokens | Omit | `type` is `cli`, `stack` is `node-cli`, `ui` is false. |
| Locale catalogues and RTL | Adapt | `languages` is `["en"]`. One JSON catalogue. No RTL, because there is no CSS and no second locale. |
| Supabase / Postgres | Omit | `stores_data` is false. |
| Staff and partner auth, TOTP, service role | Omit | `sign_in` is `none`. |
| Media bucket, search index | Omit | Not in the brief. |
| HTTP security headers | Omit | There is no HTTP server. `stack.scaffold.health` is empty, so there is no health route. |
| Other systems on a domain | Omit | `deploy` is `none`. |
| Process entry `src/cli.ts` | Include | The command has to start. This is the framework in the scaffold's architecture rule. |
| `src/domain/` | Include | The architecture rule requires code under `src/domain` that does not import the framework, a database client, or `src/app`. |
| `pino` through `src/logger.ts` | Include | `stack.scaffold.logger` is `pino`, and T01 requires one structured logger. |
| Safe failure path `src/errors.ts` | Include | T01 requires error handling that logs the failure and returns a safe message. |
| Vitest | Include | `stack.scaffold.tests` is `vitest`, and T01 requires the architecture test. |
| TypeScript | Include | The scaffold's create command installs it, and `typecheck` / `build` need it. |
| `@types/node` on the Node 22 line | Include | The create command installs it. The runtime is Node 22, so the types are `@types/node@22`, not the `latest` tag. |
| ESLint, Zod, Commander, Yargs, a web framework, a test watch UI | Omit | No cited need. Argument checks are string checks. `process.argv` is a Node built-in ([process.argv](https://nodejs.org/docs/latest-v22.x/api/process.html#processargv)). |
| Playwright, axe, Sentry, queues, caches | Omit | `ui` is false. Observability is `none`. The brief does not ask for them. |

The architecture that carries the brief is one Node process: `src/cli.ts` reads the argument,
`src/domain/` turns it into the greeting (T02), stdout receives the greeting, stderr receives
refusals and logs. No microservices, no queue, no cache, no plugin host.

## 4. Data and providers

No provider in `modules` is anything but absent. None are named in the phases.

| Choice | Value | Plan |
|---|---|---|
| `stores_data` | false | No database and no files of user input. |
| `sign_in` | none | No accounts. |
| `deploy` | none | No host, no preview, no production URL. |
| `visibility` | public | OD-01. The git repository is public. The npm package is `private` so the scaffold is not published (assumption 6). |
| `languages` | `en` | `docs/I18N_MODEL.md`. |
| `scope` | `mvp` | T01 scaffold, T02 greeting. `docs/SCOPE.md` **Later** is empty. |
| `stack` | `node-cli` | `docs/STACK.md`. |

Keys: this project has no product key. Setup steps in the blueprint summary name the cycle's
Cursor key only.

`devos/project.json` `screens.pages` is `[]`. There is no page. T01 does not add
`@playwright/test`, so the cycle's screenshot step does not run. `stack.preview` stays empty.
That empty value means `next start` inside `screens.mjs`, which this stack does not have.
Adding Playwright later without a preview command would point the screenshots at Next.js.
That package stays out.

## 5. Obligations

The people in the brief are "Developers". No country is named.

A name can be personal data. Regulation (EU) 2016/679, Article 4(1), defines personal data as
information relating to an identified or identifiable natural person, and Article 2(1) covers
processing of that data. Source: [EUR-Lex CELEX:32016R0679](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679).

This command does not store the argument, does not send it, and does not write it to the log.
It is not a service with an account. No national personal-data statute is adopted, because no
country was given and the product has no store and no transmission (assumption 1). Egypt's
Law 151 of 2020 is the handbook's example for Profile B. It is not this project's law.

Public-repository rules from handbook §7 still apply (OD-01): no operational weakness assessment
of a third party's system in the repository, and no workflow that runs fork code with this
repository's secrets. The installed cycle already skips `ci` on pull requests (PR-25). This run
does not edit workflows.

The name is not a contact channel. No phone, email, or address is printed or stored.
`guard:literals` enforces the phone and email ban in source.

## 6. Stack fit

`stack.id` is `node-cli`. The cycle's toolchain is Node, the manifest is `package.json`, and
the five commands are the `stack.commands` in `devos/project.json`. Versions, layout, logging,
and conventions are `docs/STACK.md` (D-01, D-02).

The scaffold recipe is used as written, with one flag the current pnpm documents:

| Recipe field | Value | T01 |
|---|---|---|
| `create` | `pnpm init`, then `pnpm add -D typescript vitest @types/node` | Versions pinned in `docs/STACK.md`. `pnpm init --bare` (D-03). |
| `health` | empty | No health route. |
| `logger` | `pino` | `src/logger.ts`. Dependency `pino@10.4.0`. |
| `tests` | `vitest` | `vitest run`, never the watch default. |
| `architecture` | `src/domain` imports nothing from the framework, the database client, or `src/app` | The framework is `src/cli.ts` and any module outside `src/domain`. There is no database client and no `src/app`. The test forbids both anyway. |

Node.js 24.22.1 is also an LTS release ([nodejs.org download](https://nodejs.org/en/download/current)).
The workflows pin Node 22. They are a method surface, so this project stays on Node 22 (assumption 5).

## 7. Assumptions

1. **No personal-data programme.** The argument is a display string for one local process. It is not stored, transmitted, or logged. No country's statute is adopted until a change stores or sends it.
2. **Greeting text.** The brief does not give the words. The greeting is `Hello, {name}.` because the product name is Hello CLI. The name is exactly one argument, trimmed. Details are `docs/CONTENT_MODEL.md`. Approving the blueprint makes this the spec.
3. **Refusals.** A missing name, extra arguments, a blank name, or a name that starts with `-` is refused on stderr with a fixed sentence. The argument is not echoed. Exit 0 only on success.
4. **Observability is off.** `modules` has no `observability` key. Treated as `none`. `pino` is the scaffold logger, not an error-tracking vendor.
5. **Node 22 stays.** Current 22.x patch on the lookup date is 22.23.4. Node 24 is not adopted.
6. **The npm package is private.** The git repository is public. Nothing in the brief publishes to npm.
7. **`@types/node@22.20.5` is the 22 line.** `npm view @types/node@22 version` on 2026-10-25 ends at 22.20.5. The `latest` tag is Node 26 types and must not be installed.
8. **TypeScript 7.0.2 and Vitest 5.0.5 work together on Node 22.** Both are the current stable releases. If T01 cannot typecheck, the builder halts and reports. It does not downgrade silently.
9. **No quotation.** There is no client and no price. `docs/SCOPE.md` is the scope. Approving OD-02 freezes the MVP.
10. **GitHub owner unknown.** The answers do not name an owner or a repository. Documents do not invent one.

## 7a. Tooling

Read on 2026-10-25: [Cursor Marketplace](https://cursor.com/marketplace) and
[Cursor models](https://cursor.com/docs/models). Plugin pages opened from the marketplace:
Context7, Playwright, Supabase, Vercel, Cloudflare. The marketplace landing also lists Slack,
Granola, Airwallex, n8n, Canvas, and internal engineering automations.

Judged against the Boundary gate, "a tool is never authority", "a connected MCP is not
permission", and the runner owning git (OD-03, OD-04, PR-04, PR-05).

| Tool | Decision | Reason |
|---|---|---|
| Context7 MCP | Include | Read-only library docs for the builder and the reviewer (PR-47). It is not authority. Configured in `.cursor/mcp.example.json` and `devos/ci/mcp.ci.json`. A fence still has to name any other MCP call. |
| Playwright plugin and MCP | Omit | `ui` is false. No browser and no screenshots. The example MCP that shipped with the kit listed Playwright; that entry is removed. |
| Supabase plugin and MCP | Omit | No database. A connected database tool is not permission to create one. |
| Vercel plugin | Omit | `deploy` is `none`. The plugin can deploy and change environment variables. The runner owns deploy. |
| Cloudflare plugin | Omit | No Workers and no object storage. |
| Figma and other design plugins | Omit | No interface. |
| Slack, Granola, Airwallex, n8n, Canvas, marketplace automations | Omit | Not in the brief. An automation that opens a pull request or edits the repository would take git away from the runner. |
| Bugbot, Cloud Agents, Cursor Automations | Omit | The cycle is the only automation. The developer already chose the agents in `devos/project.json`. |
| Design skills under `devos/skills/` | Omit for tasks | `ui` is false, so no task reads them. They stay in the tree. `guard:skills` owns that tree. This run does not add `devos/skills/local.json`. |
| Models other than the developer's | Omit | The models page lists many third-party models. The developer chose Cursor `grok-4.7-xhigh-fast` for the reviewer and the builder pool (`agents.policy` is `always-default`). PR-53: no fallback model and no second tool. This fit does not change the agent. |
| ESLint, Zod, Commander, Sentry, pino transports, `pino-pretty` | Omit | No cited need. `pino` itself is included (§3). |

`devos/ci/mcp.claude.json` already points at Context7 only. It is left as installed. The reviewer
agent is Cursor, so the cycle copies `devos/ci/mcp.ci.json` (PR-47).

## 8. Documents the phases build from

Precedence for product behavior, after the developer approves:

1. `docs/PRODUCT_BRIEF.md` and `docs/GLOSSARY.md`
2. `docs/DECISIONS.md` and `docs/SCOPE.md`
3. `docs/CONTENT_MODEL.md`
4. `docs/BOUNDARY_MODEL.md`
5. `docs/SECURITY_MODEL.md`
6. `docs/I18N_MODEL.md`
7. `docs/DESIGN_SYSTEM.md` (records that there is no UI)
8. `docs/STACK.md` (how the stack is used; it does not add features)

`docs/DEVOS_FIT.md` is the adoption record. A conflict with a signed decision is reported, not
silently rewritten. Omitted handbook documents are omitted in §1, not implied.

## 9. Deviations from the handbook

| Handbook | This project |
|---|---|
| Profile A is a bilingual site with a dashboard. | Profile A keeps the Boundary gate only (OD-01). |
| Private repository by default. | The developer chose `public` (OD-01). |
| Quotation before scope. | No client and no quotation (assumption 9, OD-02). |
| J3 design contract and `UI_ACCEPTANCE.md` when there is a UI. | `ui` is false. `docs/DESIGN_SYSTEM.md` says there is no interface. |
| `DATA_MODEL.md` before code when data is stored. | Data is not stored. |
| Security headers and `next.config.ts` at J4. | No HTTP server. |
| Bilingual RTL rules and a root layout. | `.cursor/rules/20-bilingual-rtl.mdc` is rewritten for one locale and no HTML. The kit text described a website. |
| Reviewer heavyweight model is Claude Opus. | The developer chose a Cursor reviewer. PR-53 already amends the handbook. `CLAUDE.md` follows the choice. |
| Effort: low for mechanical work, medium for risk 2. | The engine's `builder.effort_by_risk` is medium / high / high. Fences follow that. |
| Fit file at `docs/method/DEVOS_FIT.md`. | This blueprint names `docs/DEVOS_FIT.md`. |
| Docker for Supabase in PR-01. | PR-01 rewritten. No Docker service. |
| Last phase before launch: security review, error tracking, backups, page speed. | `scope` is `mvp` and `deploy` is `none`. Those items are not phases. |

## 10. Questions

None. Choices research could not read from the answers are assumptions in §7, and the product
ones are written into `docs/CONTENT_MODEL.md` and `docs/SCOPE.md` so approval fixes them.
