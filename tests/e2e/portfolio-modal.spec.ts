import { test, expect } from '@playwright/test';

test.describe('Portfolio Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Scroll to portfolio section
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('portfolio section displays project cards', async ({ page }) => {
    const section = page.locator('#portfolio');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Portfolio');

    // Check that project cards are visible
    const projectCards = page.locator('#portfolio article');
    await expect(projectCards).toHaveCount(5);
  });

  test('project cards display title, description, and technologies', async ({ page }) => {
    // Check first project card
    const firstCard = page.locator('#portfolio article').first();
    await expect(firstCard).toBeVisible();

    // Should have title
    await expect(firstCard.locator('h3')).toContainText('App ESWBS');

    // Should have description
    await expect(firstCard.locator('p')).toContainText('manutenzione navale');

    // Should have technology badges
    await expect(firstCard.locator('text=React')).toBeVisible();
    await expect(firstCard.locator('text=TypeScript')).toBeVisible();
  });

  test('clicking project card opens modal', async ({ page }) => {
    // Click on first project card
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();

    // Wait for modal animation
    await page.waitForTimeout(500);

    // Modal should be visible
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('modal displays full project details', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('[role="dialog"]');

    // Check title
    await expect(modal.locator('#modal-title')).toContainText('App ESWBS');

    // Check problem section
    await expect(modal.locator('text=Il Problema')).toBeVisible();

    // Check solution section
    await expect(modal.locator('text=La Soluzione')).toBeVisible();

    // Check results section
    await expect(modal.locator('text=Risultati')).toBeVisible();

    // Check technologies section
    await expect(modal.locator('text=Tecnologie utilizzate')).toBeVisible();

    // Check all technologies are listed (not just preview)
    await expect(modal.locator('text=PostgreSQL')).toBeVisible();
    await expect(modal.locator('text=REST API')).toBeVisible();
  });

  test('modal closes when close button is clicked', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Click close button
    const closeButton = page.locator('[role="dialog"] button[aria-label="Chiudi"]');
    await closeButton.click();
    await page.waitForTimeout(500);

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test('modal closes when clicking backdrop', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Click backdrop (the fixed overlay behind the modal content)
    const backdrop = page.locator('.fixed.inset-0.bg-primary\\/60');
    await backdrop.click({ position: { x: 10, y: 10 }, force: true });
    await page.waitForTimeout(500);

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test('modal closes on Escape key', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Modal should be closed
    await expect(modal).not.toBeVisible();
  });

  test('modal CTA button scrolls to contact and closes modal', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    // Click CTA
    const cta = page.locator('[role="dialog"] a:has-text("Parliamo del tuo progetto")');
    await expect(cta).toBeVisible();
    await cta.click();

    // Wait for modal close and scroll
    await page.waitForTimeout(1000);

    // Modal should be closed
    const modal = page.locator('[role="dialog"]');
    await expect(modal).not.toBeVisible();

    // Should have scrolled to contact
    const contactSection = page.locator('#contatti');
    await expect(contactSection).toBeVisible();
  });

  test('modal traps focus', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Close button should be focused initially
    const closeButton = page.locator('[role="dialog"] button[aria-label="Chiudi"]');
    await expect(closeButton).toBeFocused();

    // Tab through all focusable elements
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
    // Get first project card
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');

    // Open modal
    await firstCard.click();
    await page.waitForTimeout(500);

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Focus should return to the card
    await expect(firstCard).toBeFocused();
  });

  test('body scroll is locked when modal is open', async ({ page }) => {
    // Open modal
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    // Check body overflow
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Body should be scrollable again
    const overflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfter).toBe('');
  });

  test('different projects show different content', async ({ page }) => {
    // Open first project
    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');
    await firstCard.click();
    await page.waitForTimeout(500);

    let title = await page.locator('#modal-title').textContent();
    expect(title).toContain('App ESWBS');

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Open second project
    const secondCard = page.locator('button[aria-label="Vedi dettagli progetto: Analisi Dati Manutenzione"]');
    await secondCard.click();
    await page.waitForTimeout(500);

    title = await page.locator('#modal-title').textContent();
    expect(title).toContain('Analisi Dati Manutenzione');

    // Check technologies are different
    await expect(page.locator('[role="dialog"] >> text=Python')).toBeVisible();
    await expect(page.locator('[role="dialog"] >> text=Pandas')).toBeVisible();
  });

  test('project cards show hover overlay', async ({ page, viewport }) => {
    // Skip on mobile (no hover)
    if (viewport && viewport.width < 768) {
      test.skip();
      return;
    }

    const firstCard = page.locator('button[aria-label="Vedi dettagli progetto: App ESWBS"]');

    // Hover over card
    await firstCard.hover();
    await page.waitForTimeout(300);

    // Should show "Vedi dettagli" overlay
    const overlay = firstCard.locator('text=Vedi dettagli');
    await expect(overlay).toBeVisible();
  });

  test('all five projects can be opened', async ({ page }) => {
    const projectNames = [
      'App ESWBS',
      'Analisi Dati Manutenzione',
      'Web App Professionisti',
      'Automazione Email Coaching',
      'Assistente AI con RAG',
    ];

    for (const projectName of projectNames) {
      // Open modal
      const card = page.locator(`button[aria-label="Vedi dettagli progetto: ${projectName}"]`);
      await card.scrollIntoViewIfNeeded();
      await card.click();
      await page.waitForTimeout(500);

      // Verify modal shows correct project
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      await expect(page.locator('#modal-title')).toContainText(projectName);

      // Close modal
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
  });
});
