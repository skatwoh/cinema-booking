import { test, expect } from '@playwright/test';

test('visual verification', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Wait for images to load
  await page.waitForTimeout(2000);

  // Take screenshot of the whole page
  await page.screenshot({ path: 'verification/screenshots/final_full.png', fullPage: true });

  // Verify main elements exist
  await expect(page.locator('text=DECOR HANDICRAFT')).toBeVisible();
  await expect(page.locator('text=Nâng Tầm Không Gian Sống')).toBeVisible();
  await expect(page.locator('text=Khách Hàng Nói Gì Về Chúng Tôi')).toBeVisible();
});
