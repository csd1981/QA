import { test, expect } from '@playwright/test';

test('Browser should open and navigate to DEMOQA website', async ({ page }) => {
  // Navigate to DemoQA website
  await page.goto('https://demoqa.com');
  
  // Validate that the page title contains DEMOQA
  await expect(page).toHaveTitle(/DEMOQA/);
  
  // Take a screenshot for verification
  await page.screenshot({ path: 'browser-test.png' });
  
  // Log a success message
  console.log('Browser opened successfully and navigated to DEMOQA');
}); 