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

Runs: 6 · Not reported: 0 · Last run: 2026-10-24T23:57:01.333Z

## Total

| Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|
| 6 | 588,663 | 215,674 | 11,434,240 | 0 | — |

## By model

| Tool | Model | Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|---|---|
| cursor | grok-4.7-xhigh-fast | 6 | 588,663 | 215,674 | 11,434,240 | 0 | — |

## By stage

| Stage | Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|---|
| blueprint | 1 | 212,976 | 85,924 | 4,518,784 | 0 | — |
| builder | 2 | 240,352 | 77,679 | 5,243,264 | 0 | — |
| reviewer | 3 | 135,335 | 52,071 | 1,672,192 | 0 | — |

## By task

| Task | Runs | Input | Output | Cache read | Cache write | Cost (USD) |
|---|---|---|---|---|---|---|
| blueprint | 1 | 212,976 | 85,924 | 4,518,784 | 0 | — |
| T01 | 3 | 265,912 | 92,256 | 5,288,832 | 0 | — |
| T02 | 2 | 109,775 | 37,494 | 1,626,624 | 0 | — |
