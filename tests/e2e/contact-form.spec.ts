import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Scroll to contact section
    await page.locator('#contatti').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('contact form is visible with all fields', async ({ page }) => {
    const form = page.locator('form[aria-label="Form di contatto"]');
    await expect(form).toBeVisible();

    // Check all form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('input[name="privacy"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form shows validation errors for empty required fields', async ({ page }) => {
    // Try to submit empty form by clicking submit
    const submitButton = page.locator('button[type="submit"]');

    // Submit button should be disabled when form is invalid
    await expect(submitButton).toBeDisabled();
  });

  test('name field validates minimum length', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('A');
    await nameInput.blur();

    // Should show error for name too short
    const error = page.locator('text=almeno 2 caratteri');
    await expect(error).toBeVisible();
  });

  test('email field validates email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // Should show email format error
    const error = page.locator('text=email valida');
    await expect(error).toBeVisible();
  });

  test('message field validates minimum length', async ({ page }) => {
    const messageInput = page.locator('textarea[name="message"]');
    await messageInput.fill('Short');
    await messageInput.blur();

    // Should show error for message too short
    const error = page.locator('text=almeno 10 caratteri');
    await expect(error).toBeVisible();
  });

  test('privacy checkbox is required', async ({ page }) => {
    // Fill all fields except privacy
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');

    // Submit button should still be disabled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('form becomes valid when all required fields are filled correctly', async ({ page }) => {
    // Fill all required fields
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    // Submit button should be enabled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('form submission shows loading state', async ({ page }) => {
    // Fill form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    // Mock the API to delay response
    await page.route('/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    // Submit
    await page.locator('button[type="submit"]').click();

    // Should show loading state
    await expect(page.locator('text=Invio in corso...')).toBeVisible();
  });

  test('form submission shows success message on successful submit', async ({ page }) => {
    // Fill form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    // Mock successful API response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    // Submit
    await page.locator('button[type="submit"]').click();

    // Wait for success message
    await expect(page.locator('[role="status"]')).toBeVisible();
    await expect(page.locator('text=Messaggio inviato!')).toBeVisible();
  });

  test('form submission shows error message on API error', async ({ page }) => {
    // Fill form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    // Mock error API response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    // Submit
    await page.locator('button[type="submit"]').click();

    // Wait for error message
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test('form submission shows rate limit error when exceeded', async ({ page }) => {
    // Fill form
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    // Mock rate limit response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 429,
        body: JSON.stringify({ error: 'Troppe richieste. Riprova tra qualche minuto.' }),
      });
    });

    // Submit
    await page.locator('button[type="submit"]').click();

    // Wait for error alert
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test('form is keyboard accessible', async ({ page }) => {
    // Tab to first input
    const nameInput = page.locator('input[name="name"]');
    await nameInput.focus();

    // Type in name
    await page.keyboard.type('Test User');

    // Tab to email
    await page.keyboard.press('Tab');
    await page.keyboard.type('test@example.com');

    // Tab to company
    await page.keyboard.press('Tab');

    // Tab to message
    await page.keyboard.press('Tab');
    await page.keyboard.type('This is a test message with more than 10 characters.');

    // Tab to privacy checkbox
    await page.keyboard.press('Tab');
    // Tab past the privacy link to the checkbox
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    // Verify form is filled
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[name="privacy"]')).toBeChecked();
  });

  test('company field is optional', async ({ page }) => {
    // Fill required fields only
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    // Company is empty but submit should be enabled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('alternative contact email is visible', async ({ page }) => {
    const emailLink = page.locator('a[href="mailto:info@theaiandbeyond.com"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText('info@theaiandbeyond.com');
  });
});
