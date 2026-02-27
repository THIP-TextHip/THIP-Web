import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface PageResult<T> {
  items: T[];
  nextCursor: string | null;
  isLast: boolean;
}

interface UseInifinieScrollOptions<T> {
  enabled: boolean;
  reloadKey: string;
  fetchPage: (cursor: string | null) => Promise<PageResult<T>>;
  mergeItems?: (prev: T[], next: T[]) => T[];
  rootRef?: RefObject<HTMLElement | null>;
  rootMargin?: string;
  threshold?: number;
  initialItems?: T[];
  initialCursor?: string | null;
  initialIsLast?: boolean;
}

export const useInifinieScroll = <T>({
  enabled,
  reloadKey,
  fetchPage,
  mergeItems,
  rootRef,
  rootMargin = '200px 0px',
  threshold = 0,
  initialItems,
  initialCursor,
  initialIsLast,
}: UseInifinieScrollOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const fetchPageRef = useRef(fetchPage);
  const initializedRef = useRef(false);

  useEffect(() => {
    fetchPageRef.current = fetchPage;
  }, [fetchPage]);

  const merge = useMemo(
    () =>
      mergeItems ||
      ((prev: T[], next: T[]) => {
        return [...prev, ...next];
      }),
    [mergeItems],
  );

  const loadFirstPage = useCallback(async () => {
    if (!enabled || isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchPageRef.current(null);
      setItems(res.items);
      setNextCursor(res.nextCursor);
      setIsLast(res.isLast);
    } catch (error) {
      setError(error instanceof Error ? error.message : '목록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [enabled]);

  const loadMore = useCallback(async () => {
    if (!enabled || isFetchingRef.current || isLast || !nextCursor) return;
    isFetchingRef.current = true;
    setIsLoadingMore(true);

    try {
      const res = await fetchPageRef.current(nextCursor);
      setItems(prev => merge(prev, res.items));
      setNextCursor(res.nextCursor);
      setIsLast(res.isLast);
    } catch (error) {
      setError(error instanceof Error ? error.message : '추가 목록을 불러오지 못했습니다.');
    } finally {
      setIsLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [enabled, isLast, nextCursor, merge]);

  useEffect(() => {
    if (!enabled) return;

    if (!initializedRef.current && initialItems && initialItems.length > 0) {
      initializedRef.current = true;
      setItems(initialItems);
      setNextCursor(initialCursor ?? null);
      setIsLast(initialIsLast ?? false);
      return;
    }

    initializedRef.current = true;
    setItems([]);
    setNextCursor(null);
    setIsLast(false);
    void loadFirstPage();
  }, [enabled, reloadKey, loadFirstPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          void loadMore();
        }
      },
      { root: rootRef?.current || null, rootMargin, threshold },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [enabled, loadMore, rootMargin, threshold, rootRef]);

  return {
    items,
    setItems,
    nextCursor,
    isLast,
    isLoading,
    isLoadingMore,
    error,
    sentinelRef,
    reload: loadFirstPage,
  };
};
