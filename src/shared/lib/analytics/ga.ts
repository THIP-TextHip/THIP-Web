import ReactGA from 'react-ga4';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GA_DEBUG = (import.meta.env.VITE_GA_DEBUG as string | undefined) === 'true';

let isInitialized = false;

function isLocalhost(): boolean {
  const hn = window.location.hostname;
  return hn === 'localhost' || hn === '127.0.0.1' || hn === '::1';
}

export function initGA() {
  if (isInitialized) return;
  if (!GA_ID) return;
  if (isLocalhost()) return;

  ReactGA.initialize(GA_ID, {
    gaOptions: { anonymizeIp: true },
    testMode: false,
  });

  if (GA_DEBUG) {
    console.info('[GA4] initialized:', GA_ID);
  }

  isInitialized = true;
}

export function sendPageView(path: string) {
  if (!GA_ID || !isInitialized) return;
  if (GA_DEBUG) {
    console.info('[GA4] page_view:', path);
  }
  ReactGA.send({ hitType: 'pageview', page: path, title: document.title });
}

type EventParams = Record<string, string | number | boolean | undefined> & { category?: string };

export function trackEvent(eventName: string, params?: EventParams) {
  if (!GA_ID || !isInitialized) return;
  const category = params?.category ?? eventName;
  const entries = Object.entries(params || {}).filter(([k]) => k !== 'category') as Array<
    [string, string | number | boolean | undefined]
  >;
  const rest = Object.fromEntries(entries) as Record<string, string | number | boolean | undefined>;

  const payload = { category, ...rest };
  if (GA_DEBUG) {
    console.info('[GA4] event:', eventName, payload);
  }
  ReactGA.event(eventName, payload);
}
