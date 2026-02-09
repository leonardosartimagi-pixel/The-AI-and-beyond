import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('preferred-locale', 'it');
      localStorage.setItem('cookie-consent', JSON.stringify({ analytics: true, timestamp: Date.now() }));
    });
    await page.goto('/it', { waitUntil: 'domcontentloaded' });
    await page.locator('#contatti').scrollIntoViewIfNeeded();
  });

  test('contact form is visible with all fields', async ({ page }) => {
    const form = page.locator('form[aria-label="Contatti"]');
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
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('name field validates minimum length', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('A');
    await nameInput.blur();

    const error = page.locator('text=almeno 2 caratteri');
    await expect(error).toBeVisible();
  });

  test('email field validates email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    const error = page.locator('text=indirizzo email valido');
    await expect(error).toBeVisible();
  });

  test('message field validates minimum length', async ({ page }) => {
    const messageInput = page.locator('textarea[name="message"]');
    await messageInput.fill('Short');
    await messageInput.blur();

    const error = page.locator('text=almeno 10 caratteri');
    await expect(error).toBeVisible();
  });

  test('privacy checkbox is required', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('form becomes valid when all required fields are filled correctly', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('form submission shows loading state', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    await page.route('/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('button[type="submit"]').click();
    await expect(page.locator('text=Invio in corso...')).toBeVisible();
  });

  test('form submission shows success message on successful submit', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('[role="status"]')).toBeVisible();
    await expect(page.locator('text=Messaggio inviato!')).toBeVisible();
  });

  test('form submission shows error message on API error', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    await page.locator('button[type="submit"]').click();
    await expect(page.locator('form [role="alert"]')).toBeVisible();
  });

  test('form submission shows rate limit error when exceeded', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 429,
        body: JSON.stringify({ error: 'Troppe richieste. Riprova tra qualche minuto.' }),
      });
    });

    await page.locator('button[type="submit"]').click();
    await expect(page.locator('form [role="alert"]')).toBeVisible();
  });

  test('form fields are focusable and accept keyboard input', async ({ page }) => {
    // Focus and type into name field
    const nameInput = page.locator('input[name="name"]');
    await nameInput.focus();
    await expect(nameInput).toBeFocused();
    await page.keyboard.type('Test User');
    await expect(nameInput).toHaveValue('Test User');

    // Focus and type into email field
    const emailInput = page.locator('input[name="email"]');
    await emailInput.focus();
    await page.keyboard.type('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');

    // Focus and type into message field
    const messageInput = page.locator('textarea[name="message"]');
    await messageInput.focus();
    await page.keyboard.type('This is a test message.');
    await expect(messageInput).toHaveValue('This is a test message.');

    // Check privacy checkbox with keyboard
    const privacy = page.locator('input[name="privacy"]');
    await privacy.focus();
    await page.keyboard.press('Space');
    await expect(privacy).toBeChecked();
  });

  test('company field is optional', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a test message with more than 10 characters.');
    await page.locator('input[name="privacy"]').check();

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('alternative contact email is visible', async ({ page }) => {
    const emailLink = page.locator('a[href="mailto:info@theaiandbeyond.it"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText('info@theaiandbeyond.it');
  });
});
