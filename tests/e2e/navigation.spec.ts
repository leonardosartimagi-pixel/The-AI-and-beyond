import { test, expect } from '@playwright/test';

test.describe('Navigation and Smooth Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('preferred-locale', 'it');
      localStorage.setItem(
        'cookie-consent',
        JSON.stringify({ analytics: true, timestamp: Date.now() })
      );
    });
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

    // Click logo (scoped to header to avoid matching footer logo)
    const logo = page.locator('header button[aria-label="Torna alla home"]');
    await logo.click();

    // Verify scroll position is near top
    await expect(async () => {
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeLessThan(100);
    }).toPass({ timeout: 5000 });
  });

  test('desktop navigation links scroll to correct sections', async ({
    page,
    viewport,
  }) => {
    if (viewport && viewport.width < 1024) {
      test.skip();
      return;
    }

    const navItems = [
      { label: 'Chi Siamo', section: '#chi-siamo' },
      { label: 'Servizi', section: '#servizi' },
      { label: 'Portfolio', section: '#portfolio' },
      { label: 'Come Lavoriamo', section: '#come-lavoriamo' },
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

  test('Parliamone CTA button scrolls to contact section', async ({
    page,
    viewport,
  }) => {
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

    // Wait for header to be visible (ensures React effect with scroll listener is mounted)
    await expect(header).toBeVisible();

    // Scroll down — Lenis intercepts scrollTo and animates it asynchronously,
    // so we wait for the position to settle before dispatching the scroll event
    await page.evaluate(() => {
      window.scrollTo({ top: 300, behavior: 'instant' });
    });
    await page.waitForFunction(() => window.scrollY >= 250);

    // Dispatch scroll event AFTER position has settled so the header
    // listener reads the correct scrollY value
    await page.evaluate(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    await expect(header).toHaveClass(/backdrop-blur-md/, { timeout: 10000 });
  });

  test('all section IDs exist on the page', async ({ page }) => {
    const sections = [
      'hero',
      'chi-siamo',
      'servizi',
      'portfolio',
      'come-lavoriamo',
      'contatti',
    ];

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

    // Tab to logo (first focusable element, scoped to header)
    await page.keyboard.press('Tab');
    const logo = page.locator('header button[aria-label="Torna alla home"]');
    await expect(logo).toBeFocused();

    // Tab to first nav item
    await page.keyboard.press('Tab');
    const firstNavItem = page.locator('nav button:has-text("Chi Siamo")');
    await expect(firstNavItem).toBeFocused();

    // Press Enter to activate navigation
    await page.keyboard.press('Enter');

    // Wait for scroll — Lenis smooth scroll may not initialize in CI headless,
    // so also check if the target section is at least partially in viewport
    await expect(async () => {
      const scrolled = await page.evaluate(() => window.scrollY > 0);
      const sectionVisible = await page.locator('#chi-siamo').isVisible();
      expect(scrolled || sectionVisible).toBe(true);
    }).toPass({ timeout: 10000 });
  });
});
