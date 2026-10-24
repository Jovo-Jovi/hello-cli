import { expect, it } from "vitest";
import { run } from "../src/cli.js";
import type { FailureSink } from "../src/errors.js";

function withStderr(body: (read: () => string) => void): void {
  const chunks: string[] = [];
  const original = process.stderr.write;
  process.stderr.write = ((chunk: string | Uint8Array) => {
    chunks.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
    return true;
  }) as typeof process.stderr.write;
  try {
    body(() => chunks.join(""));
  } finally {
    process.stderr.write = original;
  }
}

it("writes the safe message and does not keep the thrown text", () => {
  const recorded: { kind: "failure" }[] = [];
  const sink: FailureSink = {
    error(binding) {
      recorded.push(binding);
    },
  };
  withStderr((read) => {
    const code = run(() => {
      throw new Error("do-not-log-this");
    }, sink);
    expect(code).toBe(1);
    expect(read()).toBe("The command could not be completed.\n");
    expect(recorded).toEqual([{ kind: "failure" }]);
    expect(JSON.stringify(recorded).includes("do-not-log-this")).toBe(false);
  });
});

it("returns 0 and writes nothing when work returns", () => {
  const recorded: { kind: "failure" }[] = [];
  const sink2: FailureSink = {
    error(binding) {
      recorded.push(binding);
    },
  };
  withStderr((read) => {
    const code = run(() => {}, sink2);
    expect(code).toBe(0);
    expect(read()).toBe("");
    expect(recorded).toEqual([]);
  });
});
