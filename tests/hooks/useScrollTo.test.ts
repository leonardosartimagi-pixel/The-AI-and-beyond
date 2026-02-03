import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollTo } from '@/hooks/useScrollTo';

// Mock useReducedMotion
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

describe('useScrollTo', () => {
  const mockScrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = mockScrollTo;
    window.scrollY = 0;
  });

  it('returns a function', () => {
    const { result } = renderHook(() => useScrollTo());
    expect(typeof result.current).toBe('function');
  });

  it('scrolls to element with smooth behavior', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ top: 500 }),
    } as HTMLElement;
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    const { result } = renderHook(() => useScrollTo());

    act(() => {
      result.current('test-section');
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 420, // 500 + 0 (scrollY) - 80 (header height)
      behavior: 'smooth',
    });
  });

  it('does nothing if element is not found', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    const { result } = renderHook(() => useScrollTo());

    act(() => {
      result.current('non-existent');
    });

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('accounts for current scroll position', () => {
    window.scrollY = 200;
    const mockElement = {
      getBoundingClientRect: () => ({ top: 300 }),
    } as HTMLElement;
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    const { result } = renderHook(() => useScrollTo());

    act(() => {
      result.current('test-section');
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 420, // 300 + 200 - 80
      behavior: 'smooth',
    });
  });
});
