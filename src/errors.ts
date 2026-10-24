export const SAFE_MESSAGE = "The command could not be completed.";

export type FailureSink = {
  error(binding: { kind: "failure" }): void;
};

export function safeMessage(log: FailureSink): string {
  log.error({ kind: "failure" });
  return SAFE_MESSAGE;
}
