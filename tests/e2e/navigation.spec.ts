import { test, expect } from '@playwright/test';

test.describe('Navigation and Smooth Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/it', { waitUntil: 'domcontentloaded' });
  });

  test('header is visible and contains navigation items', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const nav = page.locator('nav[aria-label="Navigazione principale"]');
    await expect(nav).toBeVisible();
  });

  test('logo button scrolls to hero section', async ({ page }) => {
    // First scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // Click logo
    const logo = page.locator('button[aria-label="Torna alla home"]');
    await logo.click();

    // Verify scroll position is near top
    await expect(async () => {
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeLessThan(100);
    }).toPass({ timeout: 5000 });
  });

  test('desktop navigation links scroll to correct sections', async ({ page, viewport }) => {
    if (viewport && viewport.width < 1024) {
      test.skip();
      return;
    }

    const navItems = [
      { label: 'Chi Sono', section: '#chi-sono' },
      { label: 'Servizi', section: '#servizi' },
      { label: 'Portfolio', section: '#portfolio' },
      { label: 'Come Lavoro', section: '#come-lavoro' },
      { label: 'Contatti', section: '#contatti' },
    ];

    for (const item of navItems) {
      const navButton = page.locator(`nav button:has-text("${item.label}")`);
      await navButton.click();

      // Wait for section to be in viewport after scroll animation
      const section = page.locator(item.section);
      await expect(section).toBeInViewport({ timeout: 5000 });
    }
  });

  test('Parliamone CTA button scrolls to contact section', async ({ page, viewport }) => {
    if (viewport && viewport.width < 1024) {
      test.skip();
      return;
    }

    const ctaButton = page.locator('header button:has-text("Parliamone")');
    await ctaButton.click();

    const contactSection = page.locator('#contatti');
    await expect(contactSection).toBeInViewport({ timeout: 5000 });
  });

  test('header background changes on scroll', async ({ page }) => {
    const header = page.locator('header');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));

    // Header should now have backdrop blur
    await expect(header).toHaveClass(/backdrop-blur-md/, { timeout: 5000 });
  });

  test('all section IDs exist on the page', async ({ page }) => {
    const sections = ['hero', 'chi-sono', 'servizi', 'portfolio', 'come-lavoro', 'contatti'];

    for (const sectionId of sections) {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeAttached();
    }
  });

  test('navigation is keyboard accessible', async ({ page, viewport }) => {
    if (viewport && viewport.width < 1024) {
      test.skip();
      return;
    }

    // Tab to logo
    await page.keyboard.press('Tab');
    const logo = page.locator('button[aria-label="Torna alla home"]');
    await expect(logo).toBeFocused();

    // Tab through nav items
    await page.keyboard.press('Tab');
    const firstNavItem = page.locator('nav button:has-text("Chi Sono")');
    await expect(firstNavItem).toBeFocused();

    // Press Enter to navigate
    await page.keyboard.press('Enter');

    const chiSonoSection = page.locator('#chi-sono');
    await expect(chiSonoSection).toBeInViewport({ timeout: 5000 });
  });
});
