// Google Analytics ID - replace with actual ID when ready
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

let isLoaded = false;

export function loadAnalytics(): void {
  // Prevent multiple loads
  if (isLoaded || typeof window === 'undefined') return;

  // Skip if no measurement ID configured
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: No measurement ID configured');
    return;
  }

  isLoaded = true;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });

  // Load the GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(url: string): void {
  if (!isLoaded || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (!isLoaded || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
