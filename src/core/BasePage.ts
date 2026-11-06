import { Locator, Page } from '@playwright/test';
import { AutomationException } from './AutomationException';
import { Environment } from '../config/env';
import { PageContext } from './FindBy';

export abstract class BasePage implements PageContext {
  constructor(readonly page: Page) {}

  protected async navigate(path: string): Promise<void> {
    try {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    } catch (error) {
      throw new AutomationException('navigate', path, error);
    }
  }

  protected async click(element: Locator, name: string): Promise<void> {
    try {
      await element.click({ timeout: Environment.defaultTimeout });
    } catch (error) {
      throw new AutomationException('click', name, error);
    }
  }

  protected async type(element: Locator, value: string, name: string): Promise<void> {
    try {
      await element.fill(value, { timeout: Environment.defaultTimeout });
    } catch (error) {
      throw new AutomationException('type', name, error);
    }
  }

  protected async readText(element: Locator, name: string): Promise<string> {
    try {
      await element.waitFor({ state: 'visible', timeout: Environment.defaultTimeout });
      return (await element.innerText()).trim();
    } catch (error) {
      throw new AutomationException('readText', name, error);
    }
  }

  protected async readAttribute(element: Locator, attribute: string, name: string): Promise<string | null> {
    try {
      return await element.getAttribute(attribute, { timeout: Environment.defaultTimeout });
    } catch (error) {
      throw new AutomationException(`readAttribute(${attribute})`, name, error);
    }
  }

  protected async waitForVisible(element: Locator, name: string): Promise<void> {
    try {
      await element.waitFor({ state: 'visible', timeout: Environment.defaultTimeout });
    } catch (error) {
      throw new AutomationException('waitForVisible', name, error);
    }
  }

  async title(): Promise<string> {
    try {
      return await this.page.title();
    } catch (error) {
      throw new AutomationException('title', this.constructor.name, error);
    }
  }

  async screenshot(): Promise<Buffer> {
    try {
      return await this.page.screenshot({ fullPage: true });
    } catch (error) {
      throw new AutomationException('screenshot', this.constructor.name, error);
    }
  }
}
