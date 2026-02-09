import { test, expect } from '@playwright/test';

// Use mobile viewport for all tests in this file
test.use({ viewport: { width: 375, height: 812 } });

test.describe('Mobile Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('preferred-locale', 'it');
      localStorage.setItem('cookie-consent', JSON.stringify({ analytics: true, timestamp: Date.now() }));
    });
    await page.goto('/it', { waitUntil: 'domcontentloaded' });
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu opens when hamburger is clicked', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();

    // Menu should be visible
    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).toBeVisible();

    // Hamburger should now show close state
    const closeButton = page.locator('button[aria-label="Chiudi menu"]');
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('mobile menu closes when close button is clicked', async ({ page }) => {
    // Open menu
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Close menu
    const closeButton = page.locator('button[aria-label="Chiudi menu"]');
    await closeButton.click();

    // Menu should be hidden
    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('mobile menu displays all navigation items', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    const navItems = ['Chi Sono', 'Servizi', 'Portfolio', 'Come Lavoro', 'Contatti'];

    for (const item of navItems) {
      const menuItem = page.locator(`[role="dialog"] button:has-text("${item}")`);
      await expect(menuItem).toBeVisible();
    }
  });

  test('mobile menu navigation scrolls to section and closes menu', async ({ page }) => {
    // Open menu
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Click on "Servizi"
    const serviziButton = page.locator('[role="dialog"] button:has-text("Servizi")');
    await serviziButton.click();

    // Menu should be closed
    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).not.toBeVisible();

    // Should have scrolled to Servizi section
    const serviziSection = page.locator('#servizi');
    await expect(serviziSection).toBeInViewport({ timeout: 5000 });
  });

  test('mobile menu closes on Escape key', async ({ page }) => {
    // Open menu
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();

    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Menu should be closed
    await expect(mobileMenu).not.toBeVisible();
  });

  test('mobile menu has proper ARIA attributes', async ({ page }) => {
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();

    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu).toHaveAttribute('aria-modal', 'true');
  });

  test('mobile menu traps focus', async ({ page }) => {
    // Open menu
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Tab through elements - focus should stay within dialog
    await page.keyboard.press('Tab');

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        const dialog = document.querySelector('[role="dialog"]');
        const header = document.querySelector('header');
        return (
          (dialog && dialog.contains(el)) ||
          (header && header.contains(el))
        );
      });
      expect(activeElement).toBe(true);
    }
  });

  test('body scroll is locked when mobile menu is open', async ({ page }) => {
    // Open menu
    const hamburger = page.locator('button[aria-label="Apri menu"]');
    await hamburger.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Check body overflow
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');

    // Close menu
    const closeButton = page.locator('button[aria-label="Chiudi menu"]');
    await closeButton.click();
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();

    // Body should be scrollable again
    const overflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfter).toBe('');
  });
});
