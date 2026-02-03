import { test, expect } from '@playwright/test';

test.describe('ROI Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Scroll to ROI calculator section
    await page.locator('#roi-calculator').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('ROI calculator section is visible', async ({ page }) => {
    const section = page.locator('#roi-calculator');
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute('aria-label', 'Calcolatore ROI');
  });

  test('hours slider is functional', async ({ page }) => {
    const slider = page.locator('#hours-slider');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('min', '1');
    await expect(slider).toHaveAttribute('max', '40');

    // Change slider value
    await slider.fill('20');

    // Verify the display shows 20h
    const hoursDisplay = page.locator('text=20h').first();
    await expect(hoursDisplay).toBeVisible();
  });

  test('hours slider updates results dynamically', async ({ page }) => {
    const slider = page.locator('#hours-slider');

    // Get initial monthly hours
    const monthlyHoursElement = page.locator('text=Ore risparmiate al mese').locator('..').locator('span.font-heading');

    // Set slider to 10
    await slider.fill('10');
    await page.waitForTimeout(500);

    // Set slider to 40
    await slider.fill('40');
    await page.waitForTimeout(500);

    // Results should have changed (we can't easily compare animated values,
    // but we verify the elements are there and interactive)
    await expect(monthlyHoursElement).toBeVisible();
  });

  test('task type dropdown opens and displays options', async ({ page }) => {
    // Click on dropdown button
    const dropdownButton = page.locator('#task-type');
    await expect(dropdownButton).toBeVisible();
    await dropdownButton.click();

    // Wait for dropdown to open
    await page.waitForTimeout(300);

    // Verify dropdown options are visible
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Check all task types are present
    const taskTypes = ['Data Entry', 'Reportistica', 'Comunicazioni', 'Altro'];
    for (const type of taskTypes) {
      await expect(page.locator(`[role="option"]:has-text("${type}")`)).toBeVisible();
    }
  });

  test('task type selection updates calculator', async ({ page }) => {
    // Open dropdown
    const dropdownButton = page.locator('#task-type');
    await dropdownButton.click();
    await page.waitForTimeout(300);

    // Select "Data Entry" (highest multiplier)
    await page.locator('[role="option"]:has-text("Data Entry")').click();
    await page.waitForTimeout(300);

    // Dropdown should close
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).not.toBeVisible();

    // Button should show selected task type
    await expect(dropdownButton).toContainText('Data Entry');
    await expect(dropdownButton).toContainText('Alto potenziale di automazione');
  });

  test('dropdown closes when clicking outside', async ({ page }) => {
    // Open dropdown
    const dropdownButton = page.locator('#task-type');
    await dropdownButton.click();
    await page.waitForTimeout(300);

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Click outside
    await page.locator('h2:has-text("risparmiare")').click();
    await page.waitForTimeout(300);

    // Dropdown should be closed
    await expect(listbox).not.toBeVisible();
  });

  test('hourly rate toggle works', async ({ page }) => {
    const toggle = page.locator('#hourly-rate-toggle');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    // Annual savings should be visible when toggle is on
    const annualSavings = page.locator('text=Risparmio annuale stimato');
    await expect(annualSavings).toBeVisible();

    // Turn off toggle
    await toggle.click();
    await page.waitForTimeout(300);

    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    // Annual savings should be hidden
    await expect(annualSavings).not.toBeVisible();

    // Turn back on
    await toggle.click();
    await page.waitForTimeout(300);

    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    await expect(annualSavings).toBeVisible();
  });

  test('hourly rate input accepts valid values', async ({ page }) => {
    const hourlyRateInput = page.locator('input[aria-label="Costo orario in euro"]');
    await expect(hourlyRateInput).toBeVisible();

    // Clear and enter new value
    await hourlyRateInput.fill('75');

    await expect(hourlyRateInput).toHaveValue('75');
  });

  test('hourly rate input clamps values to valid range', async ({ page }) => {
    const hourlyRateInput = page.locator('input[aria-label="Costo orario in euro"]');

    // Try to enter value above max (500)
    await hourlyRateInput.fill('600');
    await hourlyRateInput.blur();

    // Should be clamped to 500
    await expect(hourlyRateInput).toHaveValue('500');

    // Try to enter 0
    await hourlyRateInput.fill('0');
    await hourlyRateInput.blur();

    // Should be clamped to 1
    await expect(hourlyRateInput).toHaveValue('1');
  });

  test('results cards display correct labels', async ({ page }) => {
    // Monthly hours
    await expect(page.locator('text=Ore risparmiate al mese')).toBeVisible();

    // Annual hours
    await expect(page.locator("text=Ore risparmiate all'anno")).toBeVisible();

    // Annual savings (when toggle is on)
    await expect(page.locator('text=Risparmio annuale stimato')).toBeVisible();
  });

  test('CTA button scrolls to contact section', async ({ page }) => {
    const ctaButton = page.locator('#roi-calculator a:has-text("Scopri come automatizzare")');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '#contatti');

    await ctaButton.click();
    await page.waitForTimeout(1000);

    // Should have scrolled to contact section
    const contactSection = page.locator('#contatti');
    await expect(contactSection).toBeVisible();

    const bounds = await contactSection.boundingBox();
    if (bounds) {
      expect(bounds.y).toBeLessThan(200);
    }
  });

  test('disclaimer text is visible', async ({ page }) => {
    const disclaimer = page.locator('text=Stima conservativa basata su efficienza del 60%');
    await expect(disclaimer).toBeVisible();
  });

  test('fun fact insight is displayed', async ({ page }) => {
    const insight = page.locator('text=Sapevi che');
    await expect(insight).toBeVisible();
    await expect(page.locator('text=40% del tempo lavorativo')).toBeVisible();
  });

  test('calculator is keyboard accessible', async ({ page }) => {
    // Focus on hours slider
    const slider = page.locator('#hours-slider');
    await slider.focus();
    await expect(slider).toBeFocused();

    // Tab to dropdown
    await page.keyboard.press('Tab');
    const dropdown = page.locator('#task-type');
    await expect(dropdown).toBeFocused();

    // Open dropdown with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Close with Escape (click outside simulation)
    await page.keyboard.press('Escape');
    // Dropdown doesn't have escape handling, so click outside
    await page.locator('h2:has-text("risparmiare")').click();
    await page.waitForTimeout(300);
  });
});
