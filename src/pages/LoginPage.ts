import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
import { FindBy } from '../core/FindBy';
import { AutomationException } from '../core/AutomationException';
import { Credentials, Environment } from '../config/env';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage extends BasePage {
  @FindBy(LoginLocators.loginForm)
  readonly loginForm: Locator;

  @FindBy(LoginLocators.emailInput)
  readonly emailInput: Locator;

  @FindBy(LoginLocators.passwordInput)
  readonly passwordInput: Locator;

  @FindBy(LoginLocators.passwordVisibilityToggle)
  readonly passwordVisibilityToggle: Locator;

  @FindBy(LoginLocators.forgotPasswordButton)
  readonly forgotPasswordButton: Locator;

  @FindBy(LoginLocators.rememberMeCheckbox)
  readonly rememberMeCheckbox: Locator;

  @FindBy(LoginLocators.rememberMeLabel)
  readonly rememberMeLabel: Locator;

  @FindBy(LoginLocators.signInButton)
  readonly signInButton: Locator;

  @FindBy(LoginLocators.errorNotificationBox)
  readonly errorNotificationBox: Locator;

  @FindBy(LoginLocators.errorNotificationMessage)
  readonly errorNotificationMessage: Locator;

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<this> {
    await this.navigate(Environment.loginPath);
    await this.waitForVisible(this.loginForm, 'Login form');
    await this.waitForVisible(this.signInButton, 'Sign in button');
    return this;
  }

  async enterEmail(email: string): Promise<this> {
    await this.type(this.emailInput, email, 'Email address input');
    return this;
  }

  async enterPassword(password: string): Promise<this> {
    await this.type(this.passwordInput, password, 'Password input');
    return this;
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton, 'Sign in button');
  }

  async togglePasswordVisibility(): Promise<this> {
    await this.click(this.passwordVisibilityToggle, 'Password visibility toggle');
    return this;
  }

  async setRememberMe(shouldBeChecked: boolean): Promise<this> {
    try {
      if ((await this.rememberMeCheckbox.isChecked()) !== shouldBeChecked) {
        await this.click(this.rememberMeLabel, 'Remember me label');
      }
      return this;
    } catch (error) {
      throw error instanceof AutomationException
        ? error
        : new AutomationException(`setRememberMe(${shouldBeChecked})`, 'Remember me checkbox', error);
    }
  }

  async isRememberMeChecked(): Promise<boolean> {
    try {
      return await this.rememberMeCheckbox.isChecked();
    } catch (error) {
      throw new AutomationException('isChecked', 'Remember me checkbox', error);
    }
  }

  async passwordFieldType(): Promise<string | null> {
    return this.readAttribute(this.passwordInput, 'type', 'Password input');
  }

  async login(credentials: Credentials, rememberMe: boolean = false): Promise<void> {
    await this.enterEmail(credentials.email);
    await this.enterPassword(credentials.password);
    await this.setRememberMe(rememberMe);
    await this.clickSignIn();
  }

  async errorMessage(): Promise<string> {
    return this.readText(this.errorNotificationMessage, 'Error notification message');
  }
}
