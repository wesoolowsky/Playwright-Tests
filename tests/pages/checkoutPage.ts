import { Page, Locator } from '@playwright/test';

// Define chcekout locators
export class CheckoutPage {
  private page: Page;
  private checkout: Locator;
  private cart: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continue: Locator;
  private finish: Locator;

  // Constructor to initialize page and locators
  constructor(page: Page) {
    this.page = page;
    this.checkout = page.locator('#checkout');
    this.cart = page.locator('.shopping_cart_link');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continue = page.locator('#continue');
    this.finish = page.locator('#finish');
  }

  // Navigate to product page
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  // Click "Cart" button
  async goToCart(): Promise<void> {
    await this.cart.click();
  }

  // Click "Checkout" button
  async goToCheckout(): Promise<void> {
    await this.checkout.click();
  }

  // Chceckout with your information
  async login(firstname: string, lastname: string, postalcode: string): Promise<void> {
    await this.firstNameInput.fill(firstname);
    await this.lastNameInput.fill(lastname);
    await this.postalCodeInput.fill(postalcode);
  }

  // Click "Continue" button
  async goToNextPage(): Promise<void> {
    await this.continue.click();
  }

  // Click "Finish" button
  async goToFinish(): Promise<void> {
    await this.finish.click();
  }
}