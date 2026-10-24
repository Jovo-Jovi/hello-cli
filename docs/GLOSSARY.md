# Glossary

## 1. Entities

| Name | Meaning |
|---|---|
| `Greeting` | The one line the command writes to stdout when the argument is accepted. |

`Greeting` is the only PascalCase entity name. A type, interface, class, or enum may use that
exact name. It may also use a qualified name from §3.

## 2. Terms

| Term | Meaning |
|---|---|
| Name argument | The single command argument the greeting is for. It is a string, not an account and not a stored person. |
| Safe message | The fixed sentence printed when the process throws. It does not contain the argument or the thrown text. |
| Logger | The module `src/logger.ts`. Every log line goes through it. It is not an entity and not a type named `Log`. |

## 3. Forbidden bare nouns

```
event · events · item · items · data · info · user · users · log · logs · record · records · status
```

A bare word above is a defect when it is the whole name of a type, interface, class, enum,
route segment, or content field. Local variables are outside this rule.

Qualified replacements:

- `event` → forbidden. Nothing in the product is an event.
- `item` → forbidden. The entity is `Greeting`.
- `data` → forbidden. The product stores nothing.
- `info` → forbidden. Name the sentence instead.
- `user` → forbidden. There is no account. The argument is not a person record.
- `log` → forbidden as a type. Diagnostics go through the module `logger`.
- `record` → forbidden. Nothing is stored.
- `status` → forbidden as a type. The command returns an exit code, which is a number.
