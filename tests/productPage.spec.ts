import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/productPage';
import { LoginPage } from './pages/loginPage';

test.describe('E2E Test Suite', () => {
  // Hook beforeEach
  test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);  

  // Navigate to the login page
  await loginPage.goto();

  // Perform login and save session state
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify successful login
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

  // Hook afterEach
  test.afterEach(async ({ page }) => {
    // Logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // Logout verify
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Add item to cart and verify', async ({ page }) => {
  // Create an instance of ProductPage
  const productPage = new ProductPage(page);

  // Navigate to product page
  await productPage.goto();

  // Add an item to the cart
  await productPage.addItemToCart();

  // Verify the cart has 1 items
  const itemCount = await productPage.getCartItemCount();
  expect(itemCount).toBe('1');
});

test('Add multiple items to cart and verify', async ({ page }) => {
  // Create an instance of ProductPage
  const productPage = new ProductPage(page);

  // Navigate to product page
  await productPage.goto();

  // Add an items to the cart
  await productPage.addItemsToCart();

  // Verify the cart has 4 items
  const itemsCount = await productPage.getCartItemsCount();
  expect(itemsCount).toBe('4');
  });
});