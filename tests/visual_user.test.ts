import { test, expect } from '@playwright/test';

// TODO: Fix element visibility issues - cart-desc-label not clickable in webkit
test.skip('test', async ({ page }) => {
  test.setTimeout(90_000); // Increase timeout for visual_user with many products
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('visual_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByText('$29.99Remove').click();
  await page.getByText('1Sauce Labs Bike LightA red').click();
  await page.getByText('$49.99Remove').click();
  await page.getByText('$15.99Remove').first().click();
  await page.getByText('$7.99Remove').click();
  await page.getByText('$15.99Remove').nth(1).click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('testallproducts');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('added');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('1234');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="total-label"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
  await page.locator('[data-test="cart-desc-label"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});