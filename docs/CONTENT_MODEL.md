# Content model

The only product copy. English. No phone, email, or postal address appears here or in source.
`guard:literals` fails the build on a phone or email literal in `src/`.

T01 creates `src/i18n/messages/en.json` as an empty object so the i18n guard has a file.
T02 writes the three keys below. Until T02, the file has no keys.

## Greeting

| Field | Value |
|---|---|
| Key | `greeting` |
| Text | `Hello, {name}.` |
| Where it is written | stdout, plus a newline, and nowhere else |

`{name}` is replaced with the trimmed name argument. The rest of the sentence is fixed.
Example: the argument `Ada` prints `Hello, Ada.` and a newline.

This wording is assumption 2 in `docs/DEVOS_FIT.md`. Approving the blueprint makes it the spec.

## The name argument

The name is the single positional argument (`process.argv` length 3: the node binary, the
script, and the name). The shell does the quoting, so `hello-cli "Ada Lovelace"` is one name.

| Input | Result |
|---|---|
| Exactly one argument, trimmed, not empty, not starting with `-` | Greeting, exit 0. |
| No argument, more than one argument, or only whitespace | Refusal `nameMissing`, exit 1. |
| One argument whose trimmed text starts with `-` | Refusal `nameRejected`, exit 1. |

The printed name is the trimmed argument. Internal spaces of that one argument stay.

## Refusals

Written to stderr with a newline. Stdout is empty. The argument is not part of the sentence
and is not logged.

| Key | Text | When |
|---|---|---|
| `nameMissing` | `A name is required.` | No usable name, or more than one argument. |
| `nameRejected` | `The name is not valid.` | The trimmed argument starts with `-`. |

## Safe message

Not a catalogue key. It is the fixed process failure, including in T01 before the catalogue
has keys.

| Text | `The command could not be completed.` |
| Where | stderr, plus a newline |
| Log | `{ "kind": "failure" }` through `src/logger.ts`, and nothing from the thrown value |

## What is not content

No help text, no version banner, and no second locale.
