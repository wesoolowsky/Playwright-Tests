import { test, expect } from '@playwright/test';

// Test usernames array
const usernames = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user"
];

// Grouped tests
test.describe('Login Tests', () => {

  // Parameterized tests for multiple usernames
  usernames.forEach((username) => {
    test(`Login test for user: ${username}`, async ({ page }) => {
      // Navigate to the login page
      await page.goto('https://www.saucedemo.com/');

      // Fill in the username and password
      await page.fill('#user-name', username); // Corrected username selector
      await page.fill('#password', 'secret_sauce'); // Password

      // Click the login button
      await page.locator("#login-button").click();

      // Verify the result (you may customize this based on user behavior)
      if (username === "locked_out_user") {
        await expect(page.locator('[data-test="error"]')).toBeVisible(); // Error for locked-out user
      } else {
        await expect(page.locator('.inventory_list')).toBeVisible(); // Dashboard for valid users
      }
    });
  });
});