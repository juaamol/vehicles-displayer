import { test, expect } from '@playwright/test';

test.describe('Vehicle Display Flow', () => {
  test('should complete the full search and navigation cycle', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page.locator('h1')).toContainText('Vehicle Brand Explorer');
    await expect(page).toHaveScreenshot('01-landing-page.png');

    // Search for a brand
    const searchInput = page.locator('input[matInput]');
    await searchInput.fill('Tesla');

    // Snapshot of the filtered list
    await expect(page).toHaveScreenshot('02-search-results.png');

    // Click first result to go to Information page
    const firstResult = page.locator('.data-row').first();
    await expect(firstResult).toBeVisible();
    await expect(firstResult).toContainText('Tesla');
    await firstResult.click();

    // Information page snapshot
    await expect(page).toHaveScreenshot('03-information-details.png');

    // Using role 'link' is the most reliable way to find your mat-button link
    const backButton = page.getByRole('link', { name: 'Brands catalog' });
    await backButton.click();

    // Back to initial page
    await expect(page).toHaveScreenshot('04-returned-to-catalog.png');
  });
});
