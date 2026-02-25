import { useState, useEffect } from 'react';
import type { PostData } from '@/types/post';

const FEED_CACHE_KEY = 'feed_page_cache';
const FEED_CACHE_TTL = 10 * 60 * 1000; // 10분

export interface FeedCache {
  activeTab: string;
  totalFeedPosts: PostData[];
  myFeedPosts: PostData[];
  totalNextCursor: string;
  myNextCursor: string;
  totalIsLast: boolean;
  myIsLast: boolean;
  scrollY: number;
  timestamp: number;
}

type FeedCachePayload = Omit<FeedCache, 'scrollY' | 'timestamp'>;

function readCache(): FeedCache | null {
  try {
    const raw = sessionStorage.getItem(FEED_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as FeedCache;
    if (Date.now() - cache.timestamp < FEED_CACHE_TTL) return cache;
  } catch {
    // ignore
  }
  return null;
}

export function writeFeedCache(payload: FeedCachePayload): void {
  const cache: FeedCache = {
    ...payload,
    scrollY: window.scrollY,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(FEED_CACHE_KEY, JSON.stringify(cache));
}

export function useFeedCache() {
  const [initialCache] = useState<FeedCache | null>(readCache);

  useEffect(() => {
    if (!initialCache) return;
    const y = initialCache.scrollY;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        try {
          const raw = sessionStorage.getItem(FEED_CACHE_KEY);
          if (!raw) return;
          const cache = JSON.parse(raw) as FeedCache;
          cache.scrollY = window.scrollY;
          sessionStorage.setItem(FEED_CACHE_KEY, JSON.stringify(cache));
        } catch {
          // ignore
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return { initialCache };
}
