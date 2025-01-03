import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  // Fill name.
  const userName = await page.locator("#userName");
  await userName.fill('Janusz Pralczuk');
  userName.inputValue

  // Fill email.
  const userEmail = await page.locator("#userEmail");
  await userEmail.fill('janekzpralek@duzeuszyduzy.com');
  userEmail.inputValue

  // Fill current address.
  const currentAddress =  await page.locator('textarea#currentAddress');
  await currentAddress.fill('Brokułowa 420');
  currentAddress.inputValue

  // Fill permanent address.
  const permanentAddress = await page.locator('textarea#permanentAddress');
  await permanentAddress.fill('Kryształowa 69');
  permanentAddress.inputValue
  
  // Click "Submit" button.
  await page.locator("#submit").click();
   
  // Verify "Name" output.
  const nameLocator = await page.locator('#name');
  console.log('input: ', await nameLocator.textContent());

  const actualName = await nameLocator.textContent(); 
  const expectedName = "Name:" + (await userName.inputValue()); 
  
  await expect(actualName).toBe(expectedName);
   
  // Verify "Email" output.
  const emailLocator = await page.locator('#email');
  console.log('input: ', await emailLocator.textContent());

  const actualEmail = await emailLocator.textContent(); 
  const expectedEmail = "Email:" + (await userEmail.inputValue()); 
  
  await expect(actualEmail).toBe(expectedEmail);
   
  // Verify "Current address" output.
  const currentLocator = await page.locator('p#currentAddress');
  console.log('input: ', await currentLocator.textContent());

  const actualCurrent = await currentLocator.textContent(); 
  const expectedCurrent = "Current Address :" + (await currentAddress.inputValue()); 
  
  await expect(actualCurrent.trim()).toBe(expectedCurrent);
   
  // Verify "Permanent address" output.
  const permanentLocator = await page.locator('p#permanentAddress');
  console.log('input: ', await permanentLocator.textContent());

  const actualPermanent = await permanentLocator.textContent(); 
  const expectedPermanent = "Permananet Address :" + (await permanentAddress.inputValue()); 
  
  await expect(actualPermanent).toBe(expectedPermanent);
});