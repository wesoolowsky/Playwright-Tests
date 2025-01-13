import { test, expect } from '@playwright/test';
import { CheckoutPage } from './pages/checkoutPage';
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

test('Proceed to checkout and place order', async ({ page }) => {
  // Create an instance of CheckoutPage
  const checkoutPage = new CheckoutPage(page);

  // Navigate to the Cart page
  await checkoutPage.goto();

  // Open cart
  await checkoutPage.goToCart();

  // Click checkout
  await checkoutPage.goToCheckout();

  // Perform fill checkout information
  await checkoutPage.login('John', 'Doe', '01-100');

  // Click continue
  await checkoutPage.goToNextPage();

  // Verify chceckout overview
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  // Click finish
  await checkoutPage.goToFinish();

  // Verify that order is complete
  await expect(page.locator('h2')).toContainText(['Thank you for your order!']);
  });
});