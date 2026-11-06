import { Locator, Page } from '@playwright/test';

export interface PageContext {
  readonly page: Page;
}

export function FindBy(xpath: string) {
  return function <T extends PageContext>(
    _target: undefined,
    _context: ClassFieldDecoratorContext<T, Locator>,
  ): (this: T, initial: Locator) => Locator {
    return function (this: T): Locator {
      return this.page.locator(`xpath=${xpath}`);
    };
  };
}
