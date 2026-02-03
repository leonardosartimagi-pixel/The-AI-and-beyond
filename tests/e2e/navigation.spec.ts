import { test, expect } from '@playwright/test';

test.describe('Navigation and Smooth Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('header is visible and contains navigation items', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check navigation aria-label
    const nav = page.locator('nav[aria-label="Navigazione principale"]');
    await expect(nav).toBeVisible();
  });

  test('logo button scrolls to hero section', async ({ page }) => {
    // First scroll down to trigger some scroll position
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    // Click logo
    const logo = page.locator('button[aria-label="Torna alla home"]');
    await logo.click();

    // Wait for scroll animation
    await page.waitForTimeout(1000);

    // Verify scroll position is near top
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(100);
  });

  test('desktop navigation links scroll to correct sections', async ({ page, viewport }) => {
    // Skip on mobile viewports
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
      // Click navigation button
      const navButton = page.locator(`nav button:has-text("${item.label}")`);
      await navButton.click();

      // Wait for smooth scroll animation
      await page.waitForTimeout(1000);

      // Verify the target section is in viewport
      const section = page.locator(item.section);
      await expect(section).toBeVisible();

      // Verify section is near top of viewport
      const sectionBounds = await section.boundingBox();
      if (sectionBounds) {
        // Section should be at most 200px from top (accounting for fixed header)
        expect(sectionBounds.y).toBeLessThan(200);
      }
    }
  });

  test('Parliamone CTA button scrolls to contact section', async ({ page, viewport }) => {
    // Skip on mobile viewports
    if (viewport && viewport.width < 1024) {
      test.skip();
      return;
    }

    const ctaButton = page.locator('header button:has-text("Parliamone")');
    await ctaButton.click();

    // Wait for scroll
    await page.waitForTimeout(1000);

    const contactSection = page.locator('#contatti');
    await expect(contactSection).toBeVisible();

    const bounds = await contactSection.boundingBox();
    if (bounds) {
      expect(bounds.y).toBeLessThan(200);
    }
  });

  test('header background changes on scroll', async ({ page }) => {
    const header = page.locator('header');

    // Initially header should be transparent (no shadow class)
    await expect(header).not.toHaveClass(/shadow-sm/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);

    // Header should now have backdrop blur/shadow
    await expect(header).toHaveClass(/backdrop-blur-md/);
  });

  test('all section IDs exist on the page', async ({ page }) => {
    const sections = ['hero', 'chi-sono', 'servizi', 'portfolio', 'come-lavoro', 'contatti'];

    for (const sectionId of sections) {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeAttached();
    }
  });

  test('navigation is keyboard accessible', async ({ page, viewport }) => {
    // Skip on mobile viewports
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
    await page.waitForTimeout(1000);

    const chiSonoSection = page.locator('#chi-sono');
    await expect(chiSonoSection).toBeVisible();
  });
});
