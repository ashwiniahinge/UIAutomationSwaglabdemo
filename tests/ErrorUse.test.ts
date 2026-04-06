import { test, expect } from '@playwright/test';

// TODO: Fix element wait issues - error_user checkout page elements not loading properly
test.skip('test', async ({ page }) => {
  test.setTimeout(60_000); // Increase timeout for error_user account
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('error_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  // Click login button instead of pressing Enter to avoid double-submit
  await page.locator('[data-test="login-button"]').click();
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('test');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('t');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('t');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('33');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('s');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="cancel"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});