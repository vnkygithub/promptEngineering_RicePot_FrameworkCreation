export class AutomationException extends Error {
  constructor(
    readonly action: string,
    readonly target: string,
    readonly cause?: unknown,
  ) {
    super(`[${action}] failed on [${target}]: ${AutomationException.describe(cause)}`);
    this.name = 'AutomationException';
  }

  private static describe(cause: unknown): string {
    if (cause instanceof Error) {
      return cause.message.split('\n')[0];
    }
    return cause === undefined ? 'unknown cause' : String(cause);
  }
}
