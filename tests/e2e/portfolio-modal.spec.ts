import { test, expect } from '@playwright/test';

test.describe('Portfolio Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('preferred-locale', 'it');
      localStorage.setItem(
        'cookie-consent',
        JSON.stringify({ analytics: true, timestamp: Date.now() })
      );
    });
    await page.goto('/it', { waitUntil: 'networkidle' });
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    // Wait for portfolio to be fully hydrated and interactive.
    // The hint text has a 0.8s animation delay — once visible, the component
    // is rendered and animations have started, confirming hydration.
    await expect(
      page.locator('#portfolio >> text=Clicca su un progetto')
    ).toBeVisible();
  });

  test('portfolio section displays project cards', async ({ page }) => {
    const section = page.locator('#portfolio');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Portfolio');

    const projectCards = page.locator('#portfolio article');
    await expect(projectCards).toHaveCount(6);
  });

  test('project cards display real images', async ({ page }) => {
    const firstCard = page.locator('#portfolio article').first();
    const image = firstCard.locator('img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt', /Automazione Processi/);
  });

  test('modal displays video when opened', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const video = modal.locator('video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('loop', '');
    // muted is a DOM property in React, not an HTML attribute
    const isMuted = await video.evaluate((el: HTMLVideoElement) => el.muted);
    expect(isMuted).toBe(true);
  });

  test('project cards display title and description', async ({ page }) => {
    const firstCard = page.locator('#portfolio article').first();
    await expect(firstCard).toBeVisible();

    await expect(firstCard.locator('h3')).toContainText('Automazione Processi');
    await expect(firstCard.locator('p')).toContainText(
      'campagne pubblicitarie'
    );
  });

  test('clicking project card opens modal', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('modal displays full project details', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await expect(modal.locator('#modal-title')).toContainText(
      'Automazione Processi'
    );
    await expect(modal.locator('text=Problema')).toBeVisible();
    await expect(modal.locator('text=Soluzione')).toBeVisible();
    await expect(modal.locator('text=Risultati')).toBeVisible();
  });

  test('modal closes when close button is clicked', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const closeButton = page.locator(
      '[role="dialog"] button[aria-label="Chiudi"]'
    );
    await closeButton.click();

    await expect(modal).not.toBeVisible();
  });

  test('modal closes when clicking outside', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Click outside the modal (on the backdrop overlay)
    await page.mouse.click(10, 10);

    await expect(modal).not.toBeVisible();
  });

  test('modal closes on Escape key', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal).not.toBeVisible();
  });

  test('modal CTA button closes modal and navigates to contact', async ({
    page,
  }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const cta = page.locator('[role="dialog"] button:has-text("Parliamone")');
    await expect(cta).toBeVisible();

    await cta.click();
    await expect(modal).not.toBeVisible();
  });

  test('modal traps focus', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const closeButton = page.locator(
      '[role="dialog"] button[aria-label="Chiudi"]'
    );
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

  test('focus returns to trigger element when modal closes', async ({
    page,
  }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );

    await firstCard.click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    await expect(firstCard).toBeFocused();
  });

  test('body scroll is locked when modal is open', async ({ page }) => {
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    const overflowAfter = await page.evaluate(
      () => document.body.style.overflow
    );
    expect(overflowAfter).toBe('');
  });

  test('different projects show different content', async ({ page }) => {
    // Open first project (consulting)
    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );
    await firstCard.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    let title = await page.locator('#modal-title').textContent();
    expect(title).toContain('Automazione Processi');

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    // Open second project (aiStrategy)
    const secondCard = page.locator('button[aria-label*="Roadmap AI"]');
    await secondCard.scrollIntoViewIfNeeded();
    await secondCard.click();

    await expect(modal).toBeVisible();

    title = await page.locator('#modal-title').textContent();
    expect(title).toContain('Roadmap AI per PMI Manifatturiera');
  });

  test('project cards show hover overlay', async ({ page, viewport }) => {
    if (viewport && viewport.width < 768) {
      test.skip();
      return;
    }

    const firstCard = page.locator(
      'button[aria-label*="Automazione Processi"]'
    );

    await firstCard.hover();

    const overlay = firstCard.locator('text=Vedi dettagli');
    await expect(overlay).toBeVisible();
  });

  test('all six projects can be opened', async ({ page }) => {
    const projects = [
      'Automazione Processi',
      'Roadmap AI',
      'Web App AI-Powered',
      'Agenti AI Custom',
      'Sistema Gestionale Cantiere',
      'Creazione Semplificata Manuali',
    ];

    for (const projectTitle of projects) {
      const card = page.locator(`button[aria-label*="${projectTitle}"]`);
      await card.scrollIntoViewIfNeeded();
      await card.click();

      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
      await expect(page.locator('#modal-title')).toContainText(projectTitle);

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('confidentiality notice is displayed', async ({ page }) => {
    const notice = page.locator(
      '#portfolio >> text=riservatezza verso i nostri clienti'
    );
    await expect(notice).toBeVisible();
  });
});
