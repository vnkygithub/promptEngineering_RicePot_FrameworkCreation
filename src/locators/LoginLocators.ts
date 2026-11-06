export const LoginLocators = {
  loginForm: "//form[@id='js-login-form']",
  emailInput: "//form[@id='js-login-form']//input[@type='email' and @name='username']",
  passwordInput: "//form[@id='js-login-form']//input[@name='password']",
  passwordVisibilityToggle: "//form[@id='js-login-form']//button[@aria-label='Toggle password visibility']",
  forgotPasswordButton: "//form[@id='js-login-form']//button[normalize-space()='Forgot Password?']",
  rememberMeCheckbox: "//form[@id='js-login-form']//input[@type='checkbox' and @id='checkbox-remember']",
  rememberMeLabel: "//form[@id='js-login-form']//label[@for='checkbox-remember' and normalize-space()='Remember me']",
  signInButton: "//form[@id='js-login-form']//button[@type='submit' and normalize-space()='Sign in']",
  errorNotificationBox: "//div[@id='js-notification-box']",
  errorNotificationMessage: "//div[@id='js-notification-box']//div[@id='js-notification-box-msg']",
} as const;

export const LoginMessages = {
  pageTitle: 'Login - Wingify',
  emailPlaceholder: 'Enter email ID',
  passwordPlaceholder: 'Enter password',
  invalidCredentials: 'Your email, password, IP address or location did not match',
} as const;
