import { Page, Locator } from '@playwright/test';

// Define Username, Password, Login button and Error message
export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  // Set locators
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container');
  }

  // Go to login page
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Login with valid credentials
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Scenario of login in with invalid credentials
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}