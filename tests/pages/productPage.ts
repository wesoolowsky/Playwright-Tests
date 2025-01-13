import { Page, Locator } from '@playwright/test';

// Define Products and Cart buttons locators
export class ProductPage {
  private page: Page;
  private backpackButton: Locator;
  private lightButton: Locator;
  private tshirtButton: Locator;
  private jacketButton: Locator;
  private cartButton: Locator;

  // Constructor to initialize page and locators
  constructor(page: Page) {
    this.page = page;
    this.backpackButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.lightButton = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.tshirtButton = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    this.jacketButton = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  // Navigate to product page
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  // Click "Add to Cart" button
  async addItemToCart(): Promise<void> {
    await this.backpackButton.click();
  }

  // Verify item count in the cart
  async getCartItemCount(): Promise<string> {
    return await this.cartButton.innerText();
  }

  // Click "Add to Cart" buttons
  async addItemsToCart(): Promise<void> {
    await this.backpackButton.click();
    await this.lightButton.click();
    await this.tshirtButton.click();
    await this.jacketButton.click();
  }

  // Verify items count in the cart
  async getCartItemsCount(): Promise<string> {
    return await this.cartButton.innerText();
  }
}