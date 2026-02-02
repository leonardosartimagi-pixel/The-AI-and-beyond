# Tests Directory

# The AI and Beyond

## Structure

```
tests/
├── unit/           # Unit tests for utilities, hooks, helpers
├── integration/    # Integration tests for API routes, forms
├── e2e/            # End-to-end tests with Playwright
└── setup.ts        # Test setup and configuration
```

## Running Tests

```bash
# Run all tests
make test

# Run tests in watch mode
make test-watch

# Run tests with coverage
make test-coverage

# Run E2E tests
make e2e
```

## Test Naming Convention

Follow the pattern: `test_[function]_[scenario]_[expected]`

Examples:

- `test_validateEmail_validEmail_returnsTrue`
- `test_validateEmail_invalidEmail_returnsFalse`
- `test_submitForm_emptyFields_showsErrors`

## F.I.R.S.T. Principles

All tests must be:

- **Fast** - Run in milliseconds
- **Independent** - No test depends on another
- **Repeatable** - Same result every time
- **Self-validating** - Pass or fail, no interpretation
- **Timely** - Written with or before the code

## Test Categories

### Unit Tests (`/unit`)

- Pure functions
- Utility helpers
- Validation schemas
- Custom hooks

### Integration Tests (`/integration`)

- API routes
- Form submissions
- Component interactions

### E2E Tests (`/e2e`)

- Full user journeys
- Critical paths (contact form submission)
- Cross-browser compatibility

## Coverage Requirements

- Utility functions: 100%
- API routes: 90%+
- Components: 80%+
- E2E critical paths: 100%

## Writing Tests

### Arrange-Act-Assert Pattern

```typescript
describe('functionName', () => {
  it('test_functionName_scenario_expected', () => {
    // Arrange - Set up test data
    const input = 'test@example.com';

    // Act - Execute the function
    const result = validateEmail(input);

    // Assert - Verify the result
    expect(result).toBe(true);
  });
});
```

### Testing Components

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('test_Button_clickable_callsOnClick', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Testing API Routes

```typescript
import { POST } from '@/app/api/contact/route';

describe('Contact API', () => {
  it('test_contactAPI_validData_returns200', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
  });
});
```
