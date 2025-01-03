import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://manojkumar4636.github.io/Selenium_Practice_Hub/home.html');

  // "Edit" tab open.
  await page.getByText('Edit').click();

  // Check email.
  await page.locator("#email").fill('testowaniejestsuper@haha.com');

  // Append text.
  await page.locator('input[value="Append "]').fill('janpawel2137');

  // Press "Tab".
  await page.keyboard.down('Tab');

  // Get default text.
  const textboxLocator = await page.locator('input[value="TestLeaf"]');

  const textboxValue = await textboxLocator.inputValue();

  console.log(textboxValue);

  // Clear the textbox.
  await page.locator('input[value="Clear me!!"]').fill('');

  // Check if disabled.
  await expect(page.locator('//label[text()="Confirm that edit field is disabled"]/following-sibling::input')).toBeDisabled();
});