import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { useFocusTrap } from '@/hooks';

function createContainer(): HTMLDivElement {
  const container = document.createElement('div');
  const button1 = document.createElement('button');
  button1.textContent = 'First';
  const button2 = document.createElement('button');
  button2.textContent = 'Second';
  const button3 = document.createElement('button');
  button3.textContent = 'Third';
  container.append(button1, button2, button3);
  document.body.appendChild(container);
  return container;
}

function fireTabKey(shiftKey = false) {
  const event = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
  return event;
}

describe('useFocusTrap', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = createContainer();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('does nothing when isOpen is false', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    renderHook(() => useFocusTrap(false, containerRef));

    const buttons = container.querySelectorAll('button');
    (buttons[2] as HTMLElement).focus();
    fireTabKey();

    // No cycling — focus trap not active
    expect(document.activeElement).toBe(buttons[2]);
  });

  it('focuses initialFocusRef after delay when isOpen is true', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    const initialFocusRef = createRef<HTMLElement>();
    const firstButton = container.querySelectorAll('button')[0] as HTMLElement;
    Object.defineProperty(initialFocusRef, 'current', {
      value: firstButton,
      writable: true,
    });

    renderHook(() => useFocusTrap(true, containerRef, initialFocusRef));

    expect(document.activeElement).not.toBe(firstButton);

    vi.advanceTimersByTime(100);

    expect(document.activeElement).toBe(firstButton);
  });

  it('cycles focus from last to first element on Tab', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    renderHook(() => useFocusTrap(true, containerRef));

    const buttons = container.querySelectorAll('button');
    const lastButton = buttons[buttons.length - 1] as HTMLElement;
    const firstButton = buttons[0] as HTMLElement;

    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    fireTabKey();

    expect(document.activeElement).toBe(firstButton);
  });

  it('cycles focus from first to last element on Shift+Tab', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    renderHook(() => useFocusTrap(true, containerRef));

    const buttons = container.querySelectorAll('button');
    const firstButton = buttons[0] as HTMLElement;
    const lastButton = buttons[buttons.length - 1] as HTMLElement;

    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    fireTabKey(true);

    expect(document.activeElement).toBe(lastButton);
  });

  it('does not interfere with Tab when focus is on a middle element', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    renderHook(() => useFocusTrap(true, containerRef));

    const buttons = container.querySelectorAll('button');
    const middleButton = buttons[1] as HTMLElement;

    middleButton.focus();
    expect(document.activeElement).toBe(middleButton);

    fireTabKey();

    // Focus trap does not prevent default for middle elements
    expect(document.activeElement).toBe(middleButton);
  });

  it('removes event listener on cleanup', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    const { unmount } = renderHook(() => useFocusTrap(true, containerRef));

    const buttons = container.querySelectorAll('button');
    const lastButton = buttons[buttons.length - 1] as HTMLElement;

    unmount();

    lastButton.focus();
    fireTabKey();

    // After unmount, focus trap is not active — no cycling
    expect(document.activeElement).toBe(lastButton);
  });

  it('works without initialFocusRef parameter', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    // Should not throw when initialFocusRef is omitted
    expect(() => {
      renderHook(() => useFocusTrap(true, containerRef));
    }).not.toThrow();
  });

  it('clears focus timeout on cleanup', () => {
    const containerRef = createRef<HTMLDivElement>();
    Object.defineProperty(containerRef, 'current', {
      value: container,
      writable: true,
    });

    const initialFocusRef = createRef<HTMLElement>();
    const firstButton = container.querySelectorAll('button')[0] as HTMLElement;
    Object.defineProperty(initialFocusRef, 'current', {
      value: firstButton,
      writable: true,
    });

    const { unmount } = renderHook(() =>
      useFocusTrap(true, containerRef, initialFocusRef)
    );

    unmount();
    vi.advanceTimersByTime(100);

    // After unmount, focus should not have been set
    expect(document.activeElement).not.toBe(firstButton);
  });
});
