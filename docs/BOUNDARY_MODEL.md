# Boundary model

Profile A, adapted (OD-01). The Boundary gate is non-waivable. No zone is declared. Nothing in
the product accepts, stores, or sends a person's data. The name argument lives in the process
only for the time it takes to print the greeting.

<!-- devos:boundary {"profile":"A","zones":[]} -->

## What the gate forbids

Outside a declared zone — and there is no zone — the tree has no form, no cookie, no
`localStorage` or `sessionStorage`, and no `route.ts` handler. Beacons, analytics, and trackers
are forbidden everywhere, including inside a future zone. `guard:boundary` fails the build on them.

The command does not write the name to a file, a database, a log, or a network request.

## Personal data

No zone has `personal_data` true, so `docs/PROTECTION_MODEL.md` is not required. A change that
stores or sends the name is a new OD and a profile review before any code.

## Public repository

The repository is public (OD-01). It does not contain an assessment of a third party's
operational weaknesses, and it does not contain a workflow that runs fork code with this
repository's secrets.
