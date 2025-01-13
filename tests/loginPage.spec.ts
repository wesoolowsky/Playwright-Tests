import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.goto();

   // Perform login and save session state
   await loginPage.login('standard_user', 'secret_sauce');

  // Verify successful login
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.goto();

  // Perform login
  await loginPage.login('invalidUser', 'invalidPassword');

  // Verify error message
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
});