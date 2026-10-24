# Usage

Every agent run of this project, totalled from the records in `docs/usage/`: one line per run, written by the runner
(`scripts/devos/usage.mjs`). Never edit those records by hand.

- **Tokens** are as each tool reported them. Cache read and cache write are kept apart from input.
- **Cost** is the tool's own figure where it gives one (Claude Code). Otherwise it is the tokens priced by
  `devos/prices.json`, which you fill in: US dollars per million tokens, per model. DEV_OS never looks prices up.
  "—" means no price is set.
- **Not in these totals:** runs that leave nothing in the repository. They are the gate doctor's and the
  supervisor's second opinions, and a change request answered without a plan. Each shows its usage on its own run
  page or comment.

Runs: 3 · Not reported: 0 · Last run: 2026-10-24T22:39:29.933Z

## Total

| Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|
| 3 | 388,996 | 141,106 | 8,808,704 | 0 | — |

## By model

| Tool | Model | Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|---|---|
| cursor | grok-4.7-xhigh-fast | 3 | 388,996 | 141,106 | 8,808,704 | 0 | — |

## By stage

| Stage | Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|---|
| blueprint | 1 | 212,976 | 85,924 | 4,518,784 | 0 | — |
| builder | 1 | 173,327 | 54,003 | 3,907,200 | 0 | — |
| reviewer | 1 | 2,693 | 1,179 | 382,720 | 0 | — |

## By task

| Task | Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|---|
| blueprint | 1 | 212,976 | 85,924 | 4,518,784 | 0 | — |
| T01 | 2 | 176,020 | 55,182 | 4,289,920 | 0 | — |
