#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { greet } from "./domain/index.js";
import { logger } from "./logger.js";
import { safeMessage, type FailureSink } from "./errors.js";

export function run(work: () => number | void, log: FailureSink = logger): number {
  try {
    const code = work();
    if (code === undefined) return 0;
    return code;
  } catch {
    process.stderr.write(`${safeMessage(log)}\n`);
    return 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(
    run(() => {
      const text = readFileSync(fileURLToPath(new URL("../src/i18n/messages/en.json", import.meta.url)), "utf8");
      const parsed: unknown = JSON.parse(text);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("greeting" in parsed) ||
        typeof parsed.greeting !== "string" ||
        !("nameMissing" in parsed) ||
        typeof parsed.nameMissing !== "string" ||
        !("nameRejected" in parsed) ||
        typeof parsed.nameRejected !== "string"
      ) {
        throw new Error("The catalogue is missing a sentence.");
      }
      const result = greet(process.argv.slice(2), {
        greeting: parsed.greeting,
        nameMissing: parsed.nameMissing,
        nameRejected: parsed.nameRejected,
      });
      if (result.stdout !== "") process.stdout.write(result.stdout);
      if (result.stderr !== "") process.stderr.write(result.stderr);
      return result.exitCode;
    }),
  );
}
