import { test as base, expect, TestInfo } from '@playwright/test';
import { PageFactory } from '../pages/PageFactory';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { BasePage } from '../core/BasePage';

type PageFixtures = {
  pages: PageFactory;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<PageFixtures>({
  pages: async ({ page }, use) => {
    await use(new PageFactory(page));
  },
  loginPage: async ({ pages }, use) => {
    await use(pages.loginPage);
  },
  dashboardPage: async ({ pages }, use) => {
    await use(pages.dashboardPage);
  },
});

export async function failWithEvidence(testInfo: TestInfo, pageObject: BasePage, error: unknown): Promise<never> {
  try {
    await testInfo.attach('failure-screenshot', { body: await pageObject.screenshot(), contentType: 'image/png' });
  } catch (attachError) {
    testInfo.annotations.push({ type: 'evidence-capture-failed', description: String(attachError) });
  }
  throw error;
}

export { expect };
