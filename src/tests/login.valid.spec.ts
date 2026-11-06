import * as allure from 'allure-js-commons';
import { test, expect, failWithEvidence } from '../fixtures/customFixtures';
import { Environment } from '../config/env';
import { LoginMessages } from '../locators/LoginLocators';

test.describe('Wingify Login - Valid Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.epic('Wingify Web Application');
    await allure.feature('Login');
    await allure.story('Valid Login Scenarios');
    await allure.owner('QA Automation');
    await loginPage.open();
  });

  test('TC_LOGIN_VALID_01 - Login page renders all mandatory UI elements', async ({ loginPage }, testInfo) => {
    await allure.severity(allure.Severity.CRITICAL);
    try {
      await test.step('Verify page title', async () => {
        expect(await loginPage.title()).toBe(LoginMessages.pageTitle);
      });
      await test.step('Verify Email address field is visible, editable and has placeholder', async () => {
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.emailInput).toBeEditable();
        await expect(loginPage.emailInput).toHaveAttribute('placeholder', LoginMessages.emailPlaceholder);
      });
      await test.step('Verify Password field is visible, editable and has placeholder', async () => {
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeEditable();
        await expect(loginPage.passwordInput).toHaveAttribute('placeholder', LoginMessages.passwordPlaceholder);
      });
      await test.step('Verify Remember me checkbox label is visible', async () => {
        await expect(loginPage.rememberMeLabel).toBeVisible();
      });
      await test.step('Verify Sign in and Forgot Password buttons are visible and enabled', async () => {
        await expect(loginPage.signInButton).toBeVisible();
        await expect(loginPage.signInButton).toBeEnabled();
        await expect(loginPage.forgotPasswordButton).toBeVisible();
      });
      await test.step('Verify no error notification is displayed on initial load', async () => {
        await expect(loginPage.errorNotificationBox).toBeHidden();
      });
    } catch (error) {
      await failWithEvidence(testInfo, loginPage, error);
    }
  });

  test('TC_LOGIN_VALID_02 - Email address field is auto-focused on page load', async ({ loginPage }, testInfo) => {
    await allure.severity(allure.Severity.NORMAL);
    try {
      await test.step('Verify Email address input has focus', async () => {
        await expect(loginPage.emailInput).toBeFocused();
      });
    } catch (error) {
      await failWithEvidence(testInfo, loginPage, error);
    }
  });

  test('TC_LOGIN_VALID_03 - Password is masked and can be revealed with visibility toggle', async ({ loginPage }, testInfo) => {
    await allure.severity(allure.Severity.NORMAL);
    try {
      await test.step('Enter password', async () => {
        await loginPage.enterPassword('Masked@Value1');
      });
      await test.step('Verify password is masked by default', async () => {
        expect(await loginPage.passwordFieldType()).toBe('password');
      });
      await test.step('Toggle visibility and verify password is revealed', async () => {
        await loginPage.togglePasswordVisibility();
        expect(await loginPage.passwordFieldType()).toBe('text');
      });
      await test.step('Toggle visibility again and verify password is masked', async () => {
        await loginPage.togglePasswordVisibility();
        expect(await loginPage.passwordFieldType()).toBe('password');
      });
    } catch (error) {
      await failWithEvidence(testInfo, loginPage, error);
    }
  });

  test('TC_LOGIN_VALID_04 - Remember me checkbox can be checked and unchecked', async ({ loginPage }, testInfo) => {
    await allure.severity(allure.Severity.NORMAL);
    try {
      await test.step('Verify Remember me is unchecked by default', async () => {
        expect(await loginPage.isRememberMeChecked()).toBe(false);
      });
      await test.step('Check Remember me and verify state', async () => {
        await loginPage.setRememberMe(true);
        await expect(loginPage.rememberMeCheckbox).toBeChecked();
      });
      await test.step('Uncheck Remember me and verify state', async () => {
        await loginPage.setRememberMe(false);
        await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
      });
    } catch (error) {
      await failWithEvidence(testInfo, loginPage, error);
    }
  });

  test('TC_LOGIN_VALID_05 - User logs in successfully with valid credentials and Remember me', async ({ loginPage, dashboardPage }, testInfo) => {
    await allure.severity(allure.Severity.BLOCKER);
    const credentials = Environment.validCredentials();
    test.skip(!credentials, 'Insufficient information to determine. Set WINGIFY_EMAIL and WINGIFY_PASSWORD in .env');
    try {
      await test.step('Enter valid credentials, check Remember me and click Sign in', async () => {
        await loginPage.login(credentials!, true);
      });
      await test.step('Verify user is navigated away from the login page', async () => {
        await dashboardPage.waitUntilLoaded();
        expect(dashboardPage.currentUrl()).not.toMatch(/#\/login/);
        await expect(dashboardPage.loginForm).toBeHidden();
      });
      await test.step('Verify no authentication error is displayed', async () => {
        await expect(loginPage.errorNotificationBox).toBeHidden();
      });
    } catch (error) {
      await failWithEvidence(testInfo, dashboardPage, error);
    }
  });
});
