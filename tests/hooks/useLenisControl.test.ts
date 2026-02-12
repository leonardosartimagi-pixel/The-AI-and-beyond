import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLenisControl } from '@/hooks';

function createMockLenis() {
  return {
    stop: vi.fn(),
    start: vi.fn(),
  };
}

// Helper to safely access window as a record for mock assignment
function windowRecord(): Record<string, unknown> {
  return window as unknown as Record<string, unknown>;
}

describe('useLenisControl', () => {
  let originalLenis: unknown;

  beforeEach(() => {
    originalLenis = windowRecord().lenis;
  });

  afterEach(() => {
    if (originalLenis !== undefined) {
      windowRecord().lenis = originalLenis;
    } else {
      delete windowRecord().lenis;
    }
  });

  it('stops Lenis when shouldStop is true', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    renderHook(() => useLenisControl(true));

    expect(mockLenis.stop).toHaveBeenCalledOnce();
    expect(mockLenis.start).not.toHaveBeenCalled();
  });

  it('does not call stop or start when shouldStop is false', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    renderHook(() => useLenisControl(false));

    expect(mockLenis.stop).not.toHaveBeenCalled();
    expect(mockLenis.start).not.toHaveBeenCalled();
  });

  it('restarts Lenis on cleanup when shouldStop was true', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    const { unmount } = renderHook(() => useLenisControl(true));

    expect(mockLenis.stop).toHaveBeenCalledOnce();

    unmount();

    expect(mockLenis.start).toHaveBeenCalledOnce();
  });

  it('does not call start on cleanup when shouldStop was false', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    const { unmount } = renderHook(() => useLenisControl(false));

    unmount();

    expect(mockLenis.start).not.toHaveBeenCalled();
  });

  it('stops Lenis when shouldStop transitions from false to true', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    const { rerender } = renderHook(
      ({ shouldStop }) => useLenisControl(shouldStop),
      { initialProps: { shouldStop: false } }
    );

    expect(mockLenis.stop).not.toHaveBeenCalled();

    rerender({ shouldStop: true });

    expect(mockLenis.stop).toHaveBeenCalledOnce();
  });

  it('restarts Lenis when shouldStop transitions from true to false', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    const { rerender } = renderHook(
      ({ shouldStop }) => useLenisControl(shouldStop),
      { initialProps: { shouldStop: true } }
    );

    expect(mockLenis.stop).toHaveBeenCalledOnce();
    expect(mockLenis.start).not.toHaveBeenCalled();

    rerender({ shouldStop: false });

    // Cleanup from previous effect fires start
    expect(mockLenis.start).toHaveBeenCalledOnce();
  });

  it('does not throw when window.lenis is undefined', () => {
    delete windowRecord().lenis;

    expect(() => {
      const { unmount } = renderHook(() => useLenisControl(true));
      unmount();
    }).not.toThrow();
  });

  it('handles multiple stop/start cycles correctly', () => {
    const mockLenis = createMockLenis();
    windowRecord().lenis = mockLenis;

    const { rerender } = renderHook(
      ({ shouldStop }) => useLenisControl(shouldStop),
      { initialProps: { shouldStop: false } }
    );

    // Cycle 1: open
    rerender({ shouldStop: true });
    expect(mockLenis.stop).toHaveBeenCalledTimes(1);

    // Cycle 1: close
    rerender({ shouldStop: false });
    expect(mockLenis.start).toHaveBeenCalledTimes(1);

    // Cycle 2: open
    rerender({ shouldStop: true });
    expect(mockLenis.stop).toHaveBeenCalledTimes(2);

    // Cycle 2: close
    rerender({ shouldStop: false });
    expect(mockLenis.start).toHaveBeenCalledTimes(2);
  });
});
