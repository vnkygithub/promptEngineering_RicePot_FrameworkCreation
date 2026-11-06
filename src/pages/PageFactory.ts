import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';

export class PageFactory {
  constructor(private readonly page: Page) {}

  get loginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  get dashboardPage(): DashboardPage {
    return new DashboardPage(this.page);
  }
}
