declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initGA() {
  if (!GA_ID) return;

  // gtag.js 로더 주입
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // gtag 초기화
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  // SPA라면 초기 자동 page_view는 끄고 필요 시 수동 전송
  window.gtag('config', GA_ID, { send_page_view: false });
}

// SPA 라우팅 시 수동 전송용
export function sendPageView(path: string) {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
}
