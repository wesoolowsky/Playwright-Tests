import { test, expect } from '@playwright/test';

test('Web Tables Check', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');

  await page.locator("#addNewRecordButton").click(); // Click "Add" button

  // Fill the form
  await page.fill('#firstName', 'Jane'); // First name
  await page.fill('#lastName', 'Smith'); // First name
  await page.fill('#userEmail', 'jane.smith@example.com'); // Email
  await page.fill('#age', '30'); // Age
  await page.fill('#salary', '50000'); // Salary
  await page.fill('#department', 'HR'); // Department
  await page.locator("#submit").click(); // "Submit" button

  await expect(page.locator('div')).toContainText(['Jane', 'Smith', 'jane.smith@example.com', '30', '50000', 'HR']); // Confirm that the record was added

  await page.fill('#searchBox', 'Jane'); // Search Jane
  
  // Verify the first row contains 'Jane'
  const firstRow = page.locator('.rt-tbody .rt-tr').nth(0); // First row
  await expect(firstRow.locator('.rt-td').nth(0)).toHaveText('Jane'); // First column value

  // Verify the second row is empty
  const secondRow = page.locator('.rt-tbody .rt-tr').nth(1); // Second row
  const cells = secondRow.locator('.rt-td');

  // Check all cells in the second row are empty
  for (let i = 0; i < await cells.count(); i++) {
    await expect(cells.nth(i)).toHaveText(''); // Verify each cell has empty text
  }

  // Edit Jane's record
  await page.locator("#edit-record-4").click(); // "Edit" button
  await page.fill('#department', 'Finance'); // Department
  await page.locator("#submit").click(); // "Submit" button
  await expect(page.locator('div')).toContainText(['Finance']); // Confirm that the word "Finance" is visible

  // Delete a record
  await page.locator("#delete-record-4").click(); // "Delete" button
  await expect(page.locator('div')).toContainText(['No rows found']); // Confirm that the Jane's record was deleted
});