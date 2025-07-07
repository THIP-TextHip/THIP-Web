import { useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import type { Group } from './MyGroup';
import { RecruitingGroup } from './RecruitingGroup';

export interface Section {
  title: string;
  groups: Group[];
}

interface Props {
  sections: Section[];
}

export function RecruitingGroupCarousel({ sections }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const centerX = container.offsetWidth / 2;
    const scrollLeft = container.scrollLeft;

    itemRefs.current.forEach(item => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(itemCenter - scrollLeft - centerX);
      const ratio = Math.min(dist / centerX, 1);
      const scale = 1 - ratio * 0.1;
      item.style.transform = `scale(${scale})`;
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || sections.length === 0) return;

    const mid = Math.floor(sections.length / 2);
    const midItem = itemRefs.current[mid];
    if (midItem) {
      const centerX = container.offsetWidth / 2;
      const targetScroll = midItem.offsetLeft + midItem.offsetWidth / 2 - centerX;
      container.scrollTo({ left: targetScroll, behavior: 'auto' });
    }
    handleScroll();
  }, [sections.length, handleScroll]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <ScrollWrapper ref={scrollRef}>
      {sections.map((sec, i) => (
        <Item
          key={i}
          ref={el => {
            itemRefs.current[i] = el;
          }}
        >
          <RecruitingGroup groups={sec.groups} title={sec.title} />
        </Item>
      ))}
    </ScrollWrapper>
  );
}

const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 20px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex: 0 0 90%;
  max-width: 640px;
  scroll-snap-align: center;
  transition: transform 0.2s;
`;
