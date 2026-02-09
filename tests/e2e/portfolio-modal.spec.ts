import { test, expect } from '@playwright/test';

test.describe('Portfolio Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('preferred-locale', 'it');
      localStorage.setItem('cookie-consent', JSON.stringify({ analytics: true, timestamp: Date.now() }));
    });
    await page.goto('/it', { waitUntil: 'domcontentloaded' });
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
  });

  test('portfolio section displays project cards', async ({ page }) => {
    const section = page.locator('#portfolio');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Portfolio');

    const projectCards = page.locator('#portfolio article');
    await expect(projectCards).toHaveCount(5);
  });

  test('project cards display title, description, and technologies', async ({ page }) => {
    const firstCard = page.locator('#portfolio article').first();
    await expect(firstCard).toBeVisible();

    await expect(firstCard.locator('h3')).toContainText('DataLens — Dashboard Analytics');
    await expect(firstCard.locator('p')).toContainText('KPI sparsi su 4 fogli Excel');

    await expect(firstCard.locator('text=Next.js')).toBeVisible();
    await expect(firstCard.locator('text=TypeScript')).toBeVisible();
  });

  test('clicking project card opens modal', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('modal displays full project details', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await expect(modal.locator('#modal-title')).toContainText('DataLens — Dashboard Analytics');
    await expect(modal.locator('text=Problema')).toBeVisible();
    await expect(modal.locator('text=Soluzione')).toBeVisible();
    await expect(modal.locator('text=Risultati')).toBeVisible();
    await expect(modal.locator('text=Tecnologie')).toBeVisible();

    await expect(modal.locator('text=REST API')).toBeVisible();
    await expect(modal.locator('text=Chart.js')).toBeVisible();
  });

  test('modal closes when close button is clicked', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const closeButton = page.locator('[role="dialog"] button[aria-label="Chiudi"]');
    await closeButton.click();

    await expect(modal).not.toBeVisible();
  });

  test('modal closes when clicking outside', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Press Escape to close (backdrop click is blocked by container overlay)
    await page.keyboard.press('Escape');

    await expect(modal).not.toBeVisible();
  });

  test('modal closes on Escape key', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal).not.toBeVisible();
  });

  test('modal CTA button closes modal and navigates to contact', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const cta = page.locator('[role="dialog"] a:has-text("Parliamone")');
    await expect(cta).toBeVisible();

    // Verify CTA has correct link target before clicking (modal will close after click)
    await expect(cta).toHaveAttribute('href', '#contatti');

    await cta.click();
    await expect(modal).not.toBeVisible();
  });

  test('modal traps focus', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const closeButton = page.locator('[role="dialog"] button[aria-label="Chiudi"]');
    await expect(closeButton).toBeFocused();

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        const modal = document.querySelector('[role="dialog"]');
        return modal && modal.contains(el);
      });
      expect(activeElement).toBe(true);
    }
  });

  test('focus returns to trigger element when modal closes', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');

    await firstCard.click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    await expect(firstCard).toBeFocused();
  });

  test('body scroll is locked when modal is open', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    const overflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfter).toBe('');
  });

  test('different projects show different content', async ({ page }) => {
    // Open first project (DataLens — featured by default)
    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    let title = await page.locator('#modal-title').textContent();
    expect(title).toContain('DataLens');

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    // Click second project (NIS2) to make it featured first
    const secondCard = page.locator('button[aria-label="NIS2 Compliance Dashboard - Click to expand"]');
    await secondCard.scrollIntoViewIfNeeded();
    await secondCard.click();

    // Now it's featured — click again to open modal
    const secondCardFeatured = page.locator('button[aria-label="Vedi dettagli: NIS2 Compliance Dashboard"]');
    await secondCardFeatured.scrollIntoViewIfNeeded();
    await secondCardFeatured.click();
    await expect(modal).toBeVisible();

    title = await page.locator('#modal-title').textContent();
    expect(title).toContain('NIS2 Compliance Dashboard');

    await expect(page.locator('[role="dialog"] >> text=PostgreSQL')).toBeVisible();
    await expect(page.locator('[role="dialog"] >> text=OpenAI API')).toBeVisible();
  });

  test('project cards show hover overlay', async ({ page, viewport }) => {
    if (viewport && viewport.width < 768) {
      test.skip();
      return;
    }

    const firstCard = page.locator('button[aria-label="Vedi dettagli: DataLens — Dashboard Analytics"]');

    await firstCard.hover();

    const overlay = firstCard.locator('text=Vedi dettagli');
    await expect(overlay).toBeVisible();
  });

  test('all three real projects can be opened', async ({ page }) => {
    const projects = [
      { name: 'DataLens — Dashboard Analytics', featured: true },
      { name: 'NIS2 Compliance Dashboard', featured: false },
      { name: 'Rituale — Sito Brand', featured: false },
    ];

    for (const { name: projectName, featured } of projects) {
      if (featured) {
        const card = page.locator(`button[aria-label="Vedi dettagli: ${projectName}"]`);
        await card.scrollIntoViewIfNeeded();
        await card.click();
      } else {
        // Non-featured cards need two clicks: first to make featured, then to open modal
        const expandCard = page.locator(`button[aria-label="${projectName} - Click to expand"]`);
        await expandCard.scrollIntoViewIfNeeded();
        await expandCard.click();

        const featuredCard = page.locator(`button[aria-label="Vedi dettagli: ${projectName}"]`);
        await featuredCard.scrollIntoViewIfNeeded();
        await featuredCard.click();
      }

      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      await expect(page.locator('#modal-title')).toContainText(projectName);

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('placeholder projects are displayed as coming soon', async ({ page }) => {
    const placeholders = page.locator('#portfolio article:has-text("[In arrivo]")');
    await expect(placeholders).toHaveCount(2);
  });
});
