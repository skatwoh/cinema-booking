import { test, expect } from '@playwright/test';

test('verify redesign', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Verify the new title in header
  const header = page.locator('header');
  await expect(header.locator('h1')).toContainText('NOCTURNE');
  await expect(header.locator('h1')).toContainText('CINEMAS');

  // Verify Hero section
  const hero = page.locator('section').first();
  await expect(hero.locator('h2')).toContainText('Neon');
  await expect(hero.locator('h2')).toContainText('Eclipse');

  // Verify Movie grid
  await expect(page.locator('h3').first()).toContainText('Phim Đang Chiếu');

  // Verify a movie card exists
  const movieCards = page.locator('.group');
  await expect(movieCards.first()).toBeVisible();

  // Take a screenshot
  await page.screenshot({ path: '/home/jules/verification/screenshots/verification_final.png', fullPage: true });
});
