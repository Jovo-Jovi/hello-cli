import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";

const srcRoot = path.resolve("src");

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

function specifiers(source: string): string[] {
  const found: string[] = [];
  const patterns = [
    /\bimport\s*(?:type\s*)?(?:[^'"();]*?\bfrom\s*)?["']([^"']+)["']/g,
    /\bexport\s+(?:type\s+)?(?:\*|\{[\s\S]*?\})\s*from\s*["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const specifier = match[1];
      if (specifier !== undefined) found.push(specifier);
    }
  }
  return found;
}

it("keeps domain imports inside the domain directory", () => {
  const domainFiles = walk(path.join(srcRoot, "domain")).filter((file) => file.endsWith(".ts"));
  expect(domainFiles.length).toBeGreaterThan(0);
  for (const file of domainFiles) {
    const stripped = stripComments(readFileSync(file, "utf8"));
    for (const specifier of specifiers(stripped)) {
      expect(specifier.startsWith("./")).toBe(true);
      expect(specifier.includes("..")).toBe(false);
    }
  }
});

it("imports pino only from the logger module", () => {
  const files = walk(srcRoot);
  const hits = files.filter((file) => {
    const stripped = stripComments(readFileSync(file, "utf8"));
    return stripped.includes('"pino"') || stripped.includes("'pino'");
  });
  expect(hits.map((file) => path.relative(srcRoot, file))).toEqual(["logger.ts"]);
});

it("does not call console from src", () => {
  const consoleCall = /\bconsole\.(?:log|info|warn|error|debug)\b/;
  for (const file of walk(srcRoot)) {
    const stripped = stripComments(readFileSync(file, "utf8"));
    expect(consoleCall.test(stripped)).toBe(false);
  }
});

it("has no src/app directory", () => {
  expect(existsSync(path.join(srcRoot, "app"))).toBe(false);
});
