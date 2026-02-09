import { test, expect } from '@playwright/test';

test.describe('ROI Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('preferred-locale', 'it');
      localStorage.setItem(
        'cookie-consent',
        JSON.stringify({ analytics: true, timestamp: Date.now() })
      );
    });
    await page.goto('/it', { waitUntil: 'domcontentloaded' });
    await page.locator('#roi-calculator').scrollIntoViewIfNeeded();
  });

  test('ROI calculator section is visible', async ({ page }) => {
    const section = page.locator('#roi-calculator');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Calcola il ROI');
  });

  test('hours slider is functional', async ({ page }) => {
    const slider = page.locator('#hours-slider');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('min', '1');
    await expect(slider).toHaveAttribute('max', '40');

    await slider.fill('20');

    const hoursDisplay = page.locator('text=20h').first();
    await expect(hoursDisplay).toBeVisible({ timeout: 5000 });
  });

  test('hours slider updates results dynamically', async ({ page }) => {
    const slider = page.locator('#hours-slider');

    const monthlyHoursElement = page
      .locator('text=Ore/mese risparmiate')
      .locator('..')
      .locator('span.font-heading');

    await slider.fill('10');
    await expect(monthlyHoursElement).toBeVisible();

    await slider.fill('40');
    await expect(monthlyHoursElement).toBeVisible();
  });

  test('task type dropdown opens and displays options', async ({ page }) => {
    const dropdownButton = page.locator('#task-type');
    await expect(dropdownButton).toBeVisible();
    await dropdownButton.click();

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    const taskTypes = [
      'Inserimento dati',
      'Generazione report',
      'Comunicazioni/email',
      'Altro',
    ];
    for (const type of taskTypes) {
      await expect(
        page.locator(`[role="option"]:has-text("${type}")`)
      ).toBeVisible();
    }
  });

  test('task type selection updates calculator', async ({ page }) => {
    const dropdownButton = page.locator('#task-type');
    await dropdownButton.click();

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await page.locator('[role="option"]:has-text("Inserimento dati")').click();

    await expect(listbox).not.toBeVisible();
    await expect(dropdownButton).toContainText('Inserimento dati');
  });

  test('dropdown closes when clicking outside', async ({ page }) => {
    const dropdownButton = page.locator('#task-type');
    await dropdownButton.click();

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Click outside
    await page.locator('#roi-calculator h2').first().click();

    await expect(listbox).not.toBeVisible();
  });

  test('hourly rate toggle works', async ({ page }) => {
    const toggle = page.locator('#hourly-rate-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    const annualSavings = page.locator('text=Risparmio annuale');
    await expect(annualSavings).toBeVisible();

    // Turn off toggle
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await expect(annualSavings).not.toBeVisible();

    // Turn back on
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    await expect(annualSavings).toBeVisible();
  });

  test('hourly rate input accepts valid values', async ({ page }) => {
    const hourlyRateInput = page.locator(
      'input[aria-label="Costo orario in euro"]'
    );
    await expect(hourlyRateInput).toBeVisible();

    await hourlyRateInput.fill('75');
    await expect(hourlyRateInput).toHaveValue('75');
  });

  test('hourly rate input clamps values to valid range', async ({ page }) => {
    const hourlyRateInput = page.locator(
      'input[aria-label="Costo orario in euro"]'
    );

    await hourlyRateInput.fill('600');
    await hourlyRateInput.blur();
    await expect(hourlyRateInput).toHaveValue('500');

    await hourlyRateInput.fill('0');
    await hourlyRateInput.blur();
    await expect(hourlyRateInput).toHaveValue('1');
  });

  test('results cards display correct labels', async ({ page }) => {
    await expect(page.locator('text=Ore/mese risparmiate')).toBeVisible();
    await expect(page.locator('text=Ore/anno risparmiate')).toBeVisible();
    await expect(page.locator('text=Risparmio annuale')).toBeVisible();
  });

  test('CTA button scrolls to contact section', async ({ page }) => {
    const ctaButton = page.locator('#roi-calculator a:has-text("Parliamone")');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '#contatti');

    await ctaButton.click();

    const contactSection = page.locator('#contatti');
    await expect(contactSection).toBeInViewport({ timeout: 5000 });
  });

  test('disclaimer text is visible', async ({ page }) => {
    const disclaimer = page.locator('text=Stima conservativa basata su');
    await expect(disclaimer).toBeVisible();
  });

  test('fun fact insight is displayed', async ({ page }) => {
    const insight = page.locator('text=Sapevi che');
    await expect(insight).toBeVisible();
    await expect(page.locator('text=40% del tempo lavorativo')).toBeVisible();
  });

  test('calculator is keyboard accessible', async ({ page }) => {
    const slider = page.locator('#hours-slider');
    await slider.focus();
    await expect(slider).toBeFocused();

    // Tab to dropdown
    await page.keyboard.press('Tab');
    const dropdown = page.locator('#task-type');
    await expect(dropdown).toBeFocused();

    // Open dropdown with Enter
    await page.keyboard.press('Enter');

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Click outside to close
    await page.locator('#roi-calculator h2').first().click();
    await expect(listbox).not.toBeVisible();
  });
});
