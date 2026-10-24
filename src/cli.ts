#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { logger } from "./logger.js";
import { safeMessage, type FailureSink } from "./errors.js";

export function run(work: () => void, log: FailureSink = logger): number {
  try {
    work();
    return 0;
  } catch {
    process.stderr.write(`${safeMessage(log)}\n`);
    return 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(run(() => {}));
}
