import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import type { Group } from '../components/group/MyGroup';

const CLONE_COUNT = 10;

export function useInfiniteCarousel(groups: Group[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  const infiniteGroups = useMemo(() => {
    return Array(CLONE_COUNT).fill(groups).flat();
  }, [groups]);

  const middleIndex = useMemo(() => Math.floor(infiniteGroups.length / 2), [infiniteGroups]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const center = container.offsetWidth / 2;
    const scrollLeft = container.scrollLeft;

    let closestIdx = -1;
    let minDist = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - (cardCenter - scrollLeft));
      const scale = Math.max(0.83, 1 - (distance / center) * 0.17);
      card.style.transform = `scale(${scale})`;

      if (distance < minDist) {
        minDist = distance;
        closestIdx = index;
      }
    });

    if (closestIdx !== -1) {
      setCurrent(closestIdx % groups.length);
    }

    const maxScroll = container.scrollWidth;
    if (scrollLeft < 100 || scrollLeft + container.offsetWidth > maxScroll - 100) {
      const middleCard = cardRefs.current[middleIndex];
      if (middleCard) {
        const left = middleCard.offsetLeft + middleCard.offsetWidth / 2 - center;
        container.scrollLeft = left;
      }
    }
  }, [groups.length, middleIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || infiniteGroups.length === 0) return;

    const initializeScroll = () => {
      const card = cardRefs.current[middleIndex];
      if (!card) return;
      const center = container.offsetWidth / 2;
      const left = card.offsetLeft + card.offsetWidth / 2 - center;
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = left;
      container.style.scrollBehavior = '';
      handleScroll();
    };

    const timer = setTimeout(initializeScroll, 0);
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [infiniteGroups.length, handleScroll, middleIndex]);

  return {
    scrollRef,
    cardRefs,
    infiniteGroups,
    middleIndex,
    current,
    handleScroll,
  };
}
