/**
 * Example Unit Tests
 *
 * This file demonstrates the testing patterns used in this project.
 * Replace with actual tests as the codebase develops.
 *
 * Naming convention: test_[function]_[scenario]_[expected]
 * Pattern: Arrange-Act-Assert
 */

import { describe, it, expect } from 'vitest';

// Example utility function (to be moved to lib/utils.ts)
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

function calculateROISavings(
  hoursPerWeek: number,
  hourlyRate: number = 50,
  efficiencyGain: number = 0.6
): { hoursPerMonth: number; annualSavings: number } {
  const hoursPerMonth = Math.round(hoursPerWeek * 4 * efficiencyGain);
  const annualSavings = hoursPerMonth * 12 * hourlyRate;
  return { hoursPerMonth, annualSavings };
}

// =============================================================================
// UNIT TESTS
// =============================================================================

describe('validateEmail', () => {
  it('test_validateEmail_validEmail_returnsTrue', () => {
    // Arrange
    const validEmail = 'test@example.com';

    // Act
    const result = validateEmail(validEmail);

    // Assert
    expect(result).toBe(true);
  });

  it('test_validateEmail_invalidEmailNoAt_returnsFalse', () => {
    // Arrange
    const invalidEmail = 'testexample.com';

    // Act
    const result = validateEmail(invalidEmail);

    // Assert
    expect(result).toBe(false);
  });

  it('test_validateEmail_invalidEmailNoDomain_returnsFalse', () => {
    // Arrange
    const invalidEmail = 'test@';

    // Act
    const result = validateEmail(invalidEmail);

    // Assert
    expect(result).toBe(false);
  });

  it('test_validateEmail_emptyString_returnsFalse', () => {
    // Arrange
    const emptyEmail = '';

    // Act
    const result = validateEmail(emptyEmail);

    // Assert
    expect(result).toBe(false);
  });

  it('test_validateEmail_emailWithSubdomain_returnsTrue', () => {
    // Arrange
    const emailWithSubdomain = 'user@mail.example.com';

    // Act
    const result = validateEmail(emailWithSubdomain);

    // Assert
    expect(result).toBe(true);
  });
});

describe('formatCurrency', () => {
  it('test_formatCurrency_positiveNumber_formatsCorrectly', () => {
    // Arrange
    const amount = 1234.56;

    // Act
    const result = formatCurrency(amount);

    // Assert
    // Note: Italian format uses comma as decimal separator
    // Different Node/ICU versions may format with/without thousands separator
    expect(result).toMatch(/1\.?234,56/);
    expect(result).toContain('€');
  });

  it('test_formatCurrency_zero_formatsAsZero', () => {
    // Arrange
    const amount = 0;

    // Act
    const result = formatCurrency(amount);

    // Assert
    expect(result).toMatch(/0,00/);
  });

  it('test_formatCurrency_largeNumber_formatsWithThousandsSeparator', () => {
    // Arrange
    const amount = 50000;

    // Act
    const result = formatCurrency(amount);

    // Assert
    // Note: Different Node/ICU versions may format differently
    expect(result).toMatch(/50\.?000/);
  });
});

describe('calculateROISavings', () => {
  it('test_calculateROISavings_defaultParams_calculatesCorrectly', () => {
    // Arrange
    const hoursPerWeek = 10;

    // Act
    const result = calculateROISavings(hoursPerWeek);

    // Assert
    // 10 hours * 4 weeks * 0.6 efficiency = 24 hours/month
    expect(result.hoursPerMonth).toBe(24);
    // 24 hours * 12 months * €50 = €14,400
    expect(result.annualSavings).toBe(14400);
  });

  it('test_calculateROISavings_customHourlyRate_usesProvidedRate', () => {
    // Arrange
    const hoursPerWeek = 10;
    const hourlyRate = 100;

    // Act
    const result = calculateROISavings(hoursPerWeek, hourlyRate);

    // Assert
    // 24 hours * 12 months * €100 = €28,800
    expect(result.annualSavings).toBe(28800);
  });

  it('test_calculateROISavings_customEfficiency_usesProvidedRate', () => {
    // Arrange
    const hoursPerWeek = 10;
    const hourlyRate = 50;
    const efficiencyGain = 0.8;

    // Act
    const result = calculateROISavings(
      hoursPerWeek,
      hourlyRate,
      efficiencyGain
    );

    // Assert
    // 10 * 4 * 0.8 = 32 hours/month
    expect(result.hoursPerMonth).toBe(32);
  });

  it('test_calculateROISavings_zeroHours_returnsZero', () => {
    // Arrange
    const hoursPerWeek = 0;

    // Act
    const result = calculateROISavings(hoursPerWeek);

    // Assert
    expect(result.hoursPerMonth).toBe(0);
    expect(result.annualSavings).toBe(0);
  });
});

// =============================================================================
// EDGE CASES
// =============================================================================

describe('Edge Cases', () => {
  describe('validateEmail edge cases', () => {
    it('test_validateEmail_emailWithPlus_returnsTrue', () => {
      expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('test_validateEmail_emailWithDots_returnsTrue', () => {
      expect(validateEmail('user.name@example.com')).toBe(true);
    });

    it('test_validateEmail_whitespaceOnly_returnsFalse', () => {
      expect(validateEmail('   ')).toBe(false);
    });
  });

  describe('calculateROISavings edge cases', () => {
    it('test_calculateROISavings_fractionalHours_roundsCorrectly', () => {
      // 5.5 * 4 * 0.6 = 13.2, should round to 13
      const result = calculateROISavings(5.5);
      expect(result.hoursPerMonth).toBe(13);
    });

    it('test_calculateROISavings_highHours_handlesLargeNumbers', () => {
      const result = calculateROISavings(40, 150);
      // 40 * 4 * 0.6 = 96 hours/month
      // 96 * 12 * 150 = €172,800/year
      expect(result.hoursPerMonth).toBe(96);
      expect(result.annualSavings).toBe(172800);
    });
  });
});
