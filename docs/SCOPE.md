# Scope

Derived from the brief and from OD-02. There is no quotation. `scope` in `devos/answers.json`
is `mvp`: the phases build the core flow end to end. Anything else waits for a change request.

## In scope

The command prints a greeting for a name.

- One Node command, `hello-cli`, installed from `package.json` `bin`.
- The argument and the greeting text in `docs/CONTENT_MODEL.md`.
- Success writes only that line to stdout and exits 0.
- A refused argument writes only the fixed refusal to stderr and exits 1. The argument is not echoed and not logged.
- An unexpected throw writes only the safe message to stderr, logs a fixed failure binding through `src/logger.ts`, and exits 1.
- English only. One catalogue, `src/i18n/messages/en.json`.

Phases: T01 scaffold (no greeting), T02 the command.

## Later

Nothing. The brief asks for one command and does not ask for another feature.

## Not in this scope

A website, an account, stored names, a config file, a second language, a help screen, a network
call, an error-tracking vendor, a package publish, and a deploy target. Those are omissions, not
a backlog. A change request is how any of them would be added.
