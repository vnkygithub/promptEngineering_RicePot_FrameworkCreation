import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { FindBy } from '../core/FindBy';
import { AutomationException } from '../core/AutomationException';
import { Environment } from '../config/env';
import { DashboardLocators, DashboardRoutes } from '../locators/DashboardLocators';

export class DashboardPage extends BasePage {
  @FindBy(DashboardLocators.userMenuButton)
  readonly userMenuButton: Locator;

  @FindBy(DashboardLocators.loginForm)
  readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
  }

  async waitUntilLoaded(): Promise<this> {
    try {
      await this.page.waitForURL((url) => !DashboardRoutes.loginRoute.test(url.href), {
        timeout: Environment.defaultTimeout,
      });
      await this.loginForm.waitFor({ state: 'hidden', timeout: Environment.defaultTimeout });
      return this;
    } catch (error) {
      throw new AutomationException('waitUntilLoaded', 'Dashboard page', error);
    }
  }

  currentUrl(): string {
    return this.page.url();
  }
}
