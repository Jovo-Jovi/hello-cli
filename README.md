# Hello CLI

A command-line tool that prints a greeting for a name

- **For:** Developers
- **Type:** CLI or developer tool
- **Stack:** Node TypeScript bin
- **Modules:** none
- **Deploy:** none
- **Languages:** en

## How this project is built

DEV_OS builds this repository on GitHub, one task at a time, with the agents and models chosen at `devos init`:

- The plan is in `docs/`: the brief (`docs/PRODUCT_BRIEF.md`), the scope (`docs/SCOPE.md`) and the task ledger (`docs/PHASES.md`). Each task has a fence in `docs/fences/`.
- `devos-cycle` builds the next open task on a branch `task/Tnn` with the builder agent, runs the checks, and has the reviewer agent review it. A PASS merges by itself, unless the task waits at a human gate for your merge.
- A change is an issue with the "Dev OS change request" form: the reviewer agent plans it in an intake pull request.
- The settings the workflows need are in `SETUP.md`, and the issue "Dev OS: setup needed" on Jovo-Jovi/hello-cli lists what is missing. The method is in `docs/method/`.
