import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";
import { run } from "../src/cli.js";
import { greet, type GreetingCatalogue } from "../src/domain/index.js";
import type { FailureSink } from "../src/errors.js";

const srcRoot = path.resolve("src");
const cataloguePath = path.join(srcRoot, "i18n", "messages", "en.json");
const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8")) as GreetingCatalogue;

const greetingSentence = "Hello, {name}.";
const nameMissingSentence = "A name is required.";
const nameRejectedSentence = "The name is not valid.";
const safeSentence = "The command could not be completed.";

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function stripComments(source: string): string {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      i += 2;
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i += 1;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      out += ch;
      i += 1;
      while (i < source.length) {
        const current = source[i];
        out += current;
        if (current === "\\") {
          i += 1;
          if (i < source.length) {
            out += source[i];
            i += 1;
          }
          continue;
        }
        i += 1;
        if (current === quote) break;
      }
      continue;
    }
    out += ch;
    i += 1;
  }
  return out;
}

it("reads the three catalogue sentences", () => {
  expect(Object.keys(catalogue)).toEqual(["greeting", "nameMissing", "nameRejected"]);
  expect(catalogue.greeting).toBe(greetingSentence);
  expect(catalogue.nameMissing).toBe(nameMissingSentence);
  expect(catalogue.nameRejected).toBe(nameRejectedSentence);
});

it("prints the trimmed name", () => {
  expect(greet(["Ada"], catalogue)).toEqual({ exitCode: 0, stdout: "Hello, Ada.\n", stderr: "" });
  expect(greet(["  Ada Lovelace  "], catalogue)).toEqual({
    exitCode: 0,
    stdout: "Hello, Ada Lovelace.\n",
    stderr: "",
  });
  expect(greet(["Ada  Lovelace"], catalogue)).toEqual({
    exitCode: 0,
    stdout: "Hello, Ada  Lovelace.\n",
    stderr: "",
  });
  expect(greet(["{name}"], catalogue)).toEqual({ exitCode: 0, stdout: "Hello, {name}.\n", stderr: "" });
  expect(greet(["$&"], catalogue)).toEqual({ exitCode: 0, stdout: "Hello, $&.\n", stderr: "" });
});

it("refuses a missing name without echoing it", () => {
  const missing = { exitCode: 1, stdout: "", stderr: "A name is required.\n" };
  expect(greet([], catalogue)).toEqual(missing);
  const two = greet(["Ada", "Lovelace"], catalogue);
  expect(two).toEqual(missing);
  expect(two.stderr.includes("Ada")).toBe(false);
  expect(two.stderr.includes("Lovelace")).toBe(false);
  expect(greet(["   "], catalogue)).toEqual(missing);
});

it("refuses a name that starts with a hyphen without echoing it", () => {
  const rejected = { exitCode: 1, stdout: "", stderr: "The name is not valid.\n" };
  const hyphen = greet(["-Ada"], catalogue);
  const padded = greet(["  -Ada"], catalogue);
  expect(hyphen).toEqual(rejected);
  expect(padded).toEqual(rejected);
  expect(hyphen.stderr.includes("Ada")).toBe(false);
  expect(padded.stderr.includes("Ada")).toBe(false);
});

it("uses the catalogue it is given", () => {
  const standIn: GreetingCatalogue = { greeting: "X{name}Y", nameMissing: "M", nameRejected: "R" };
  expect(greet(["Ada"], standIn)).toEqual({ exitCode: 0, stdout: "XAdaY\n", stderr: "" });
  expect(greet([], standIn)).toEqual({ exitCode: 1, stdout: "", stderr: "M\n" });
  expect(greet(["-Ada"], standIn)).toEqual({ exitCode: 1, stdout: "", stderr: "R\n" });
});

it("keeps the catalogue sentences and the safe sentence in their files", () => {
  const sentences = [greetingSentence, nameMissingSentence, nameRejectedSentence];
  const catalogueHits: string[] = [];
  const safeHits: string[] = [];
  for (const file of walk(srcRoot)) {
    const stripped = stripComments(readFileSync(file, "utf8"));
    if (sentences.some((sentence) => stripped.includes(sentence)) && path.resolve(file) !== cataloguePath) {
      catalogueHits.push(path.relative(srcRoot, file));
    }
    if (stripped.includes(safeSentence)) safeHits.push(path.relative(srcRoot, file));
  }
  expect(catalogueHits).toEqual([]);
  expect(safeHits).toEqual(["errors.ts"]);
});

it("returns a numeric exit code without writing or logging", () => {
  const recorded: { kind: "failure" }[] = [];
  const sink: FailureSink = {
    error(binding) {
      recorded.push(binding);
    },
  };
  const chunks: string[] = [];
  const original = process.stderr.write;
  process.stderr.write = ((chunk: string | Uint8Array) => {
    chunks.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
    return true;
  }) as typeof process.stderr.write;
  try {
    const code = run(() => 1, sink);
    expect(code).toBe(1);
    expect(chunks.join("")).toBe("");
    expect(recorded).toEqual([]);
  } finally {
    process.stderr.write = original;
  }
});
