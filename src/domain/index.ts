export type GreetingCatalogue = {
  greeting: string;
  nameMissing: string;
  nameRejected: string;
};

export type GreetingOutcome =
  | { exitCode: 0; stdout: string; stderr: "" }
  | { exitCode: 1; stdout: ""; stderr: string };

export function greet(positional: readonly string[], catalogue: GreetingCatalogue): GreetingOutcome {
  if (positional.length !== 1) {
    return { exitCode: 1, stdout: "", stderr: `${catalogue.nameMissing}\n` };
  }
  const trimmed = positional[0].trim();
  if (trimmed.length === 0) {
    return { exitCode: 1, stdout: "", stderr: `${catalogue.nameMissing}\n` };
  }
  if (trimmed.startsWith("-")) {
    return { exitCode: 1, stdout: "", stderr: `${catalogue.nameRejected}\n` };
  }
  return {
    exitCode: 0,
    stdout: `${catalogue.greeting.split("{name}").join(trimmed)}\n`,
    stderr: "",
  };
}
