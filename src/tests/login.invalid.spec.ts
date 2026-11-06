import * as allure from 'allure-js-commons';
import { test, expect, failWithEvidence } from '../fixtures/customFixtures';
import { LoginMessages } from '../locators/LoginLocators';
import { invalidLoginCases } from '../data/loginTestData';

test.describe('Wingify Login - Invalid Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.epic('Wingify Web Application');
    await allure.feature('Login');
    await allure.story('Invalid Login Scenarios');
    await allure.owner('QA Automation');
    await loginPage.open();
  });

  for (const scenario of invalidLoginCases) {
    test(`${scenario.id} - ${scenario.title}`, async ({ loginPage, page }, testInfo) => {
      await allure.severity(allure.Severity.CRITICAL);
      await allure.parameter('email', scenario.credentials.email || '<empty>');
      await allure.parameter('password', scenario.credentials.password || '<empty>', { mode: 'masked' });
      try {
        await test.step('Enter credentials and click Sign in', async () => {
          await loginPage.login(scenario.credentials);
        });
        await test.step('Verify authentication error notification is displayed', async () => {
          await expect(loginPage.errorNotificationBox).toBeVisible();
          expect(await loginPage.errorMessage()).toBe(LoginMessages.invalidCredentials);
        });
        await test.step('Verify user remains on the login page', async () => {
          await expect(page).toHaveURL(/#\/login/);
          await expect(loginPage.signInButton).toBeVisible();
        });
      } catch (error) {
        await failWithEvidence(testInfo, loginPage, error);
      }
    });
  }
});
