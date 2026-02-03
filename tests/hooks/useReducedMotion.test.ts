import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

describe('useReducedMotion', () => {
  let matchMediaMock: {
    matches: boolean;
    media: string;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    matchMediaMock = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi.fn().mockReturnValue(matchMediaMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false by default', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when reduced motion is preferred', () => {
    matchMediaMock.matches = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('adds event listener for changes', () => {
    renderHook(() => useReducedMotion());
    expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('removes event listener on unmount', () => {
    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('updates when preference changes', () => {
    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Get the handler that was passed to addEventListener
    const calls = matchMediaMock.addEventListener.mock.calls;
    const handler = calls[0]?.[1] as ((e: MediaQueryListEvent) => void) | undefined;
    if (!handler) throw new Error('Handler not found');

    // Simulate preference change
    act(() => {
      handler({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
