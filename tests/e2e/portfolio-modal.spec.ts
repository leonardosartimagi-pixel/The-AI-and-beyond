import { test, expect } from '@playwright/test';

test.describe('Portfolio Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/it');
    await page.waitForLoadState('domcontentloaded');
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

    await expect(firstCard.locator('h3')).toContainText('App ESWBS');
    await expect(firstCard.locator('p')).toContainText('manutenzione navale');

    await expect(firstCard.locator('text=React')).toBeVisible();
    await expect(firstCard.locator('text=TypeScript')).toBeVisible();
  });

  test('clicking project card opens modal', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('modal displays full project details', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await expect(modal.locator('#modal-title')).toContainText('App ESWBS');
    await expect(modal.locator('text=Problema')).toBeVisible();
    await expect(modal.locator('text=Soluzione')).toBeVisible();
    await expect(modal.locator('text=Risultati')).toBeVisible();
    await expect(modal.locator('text=Tecnologie')).toBeVisible();

    await expect(modal.locator('text=PostgreSQL')).toBeVisible();
    await expect(modal.locator('text=Tailwind CSS')).toBeVisible();
  });

  test('modal closes when close button is clicked', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const closeButton = page.locator('[role="dialog"] button[aria-label="Chiudi"]');
    await closeButton.click();

    await expect(modal).not.toBeVisible();
  });

  test('modal closes when clicking backdrop', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const backdrop = page.locator('.fixed.inset-0.bg-primary\\/60');
    await backdrop.click({ position: { x: 10, y: 10 }, force: true });

    await expect(modal).not.toBeVisible();
  });

  test('modal closes on Escape key', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal).not.toBeVisible();
  });

  test('modal CTA button scrolls to contact and closes modal', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const cta = page.locator('[role="dialog"] a:has-text("Parliamone")');
    await expect(cta).toBeVisible();
    await cta.click();

    await expect(modal).not.toBeVisible();

    const contactSection = page.locator('#contatti');
    await expect(contactSection).toBeInViewport({ timeout: 5000 });
  });

  test('modal traps focus', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
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
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');

    await firstCard.click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    await expect(firstCard).toBeFocused();
  });

  test('body scroll is locked when modal is open', async ({ page }) => {
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
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
    // Open first project
    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    let title = await page.locator('#modal-title').textContent();
    expect(title).toContain('App ESWBS');

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    // Open second project
    const secondCard = page.locator('button[aria-label="Vedi dettagli: Analisi Dati Manutenzione"]');
    await secondCard.click();
    await expect(modal).toBeVisible();

    title = await page.locator('#modal-title').textContent();
    expect(title).toContain('Analisi Dati Manutenzione');

    await expect(page.locator('[role="dialog"] >> text=Python')).toBeVisible();
    await expect(page.locator('[role="dialog"] >> text=Pandas')).toBeVisible();
  });

  test('project cards show hover overlay', async ({ page, viewport }) => {
    if (viewport && viewport.width < 768) {
      test.skip();
      return;
    }

    const firstCard = page.locator('button[aria-label="Vedi dettagli: App ESWBS"]');

    await firstCard.hover();

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
      const card = page.locator(`button[aria-label="Vedi dettagli: ${projectName}"]`);
      await card.scrollIntoViewIfNeeded();
      await card.click();

      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      await expect(page.locator('#modal-title')).toContainText(projectName);

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });
});
