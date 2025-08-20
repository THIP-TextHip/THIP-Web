import styled from '@emotion/styled';
import type { Group } from './MyGroupBox';
import { RecruitingGroupBox } from './RecruitingGroupBox';
import { useInfiniteCarousel } from '@/hooks/useInfiniteCarousel';

export interface Section {
  title: string;
  groups: Group[];
}

interface Props {
  sections: Section[];
}

export function RecruitingGroupCarousel({ sections }: Props) {
  const sectionGroups = sections.map(sec => ({
    ...sec.groups[0],
    title: sec.title,
    groups: sec.groups,
  }));

  const { scrollRef, cardRefs, infiniteGroups } = useInfiniteCarousel(sectionGroups, {
    scaleAmount: 0.08,
  });

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    document.body.style.userSelect = 'none';
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    isDragging = false;
    document.body.style.userSelect = '';
  };

  let touchStartX = 0;
  let touchScrollLeft = 0;
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging = true;
    touchStartX = e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0);
    touchScrollLeft = scrollRef.current?.scrollLeft ?? 0;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - touchStartX;
    scrollRef.current.scrollLeft = touchScrollLeft - walk;
  };
  const handleTouchEnd = () => {
    isDragging = false;
  };

  return (
    <CarouselContainer>
      <ScrollWrapper
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {infiniteGroups.map((g, i) => (
          <Item
            key={`${g.title}-${i}`}
            ref={el => {
              cardRefs.current[i] = el;
            }}
          >
            <RecruitingGroupBox groups={g.groups} title={g.title} />
          </Item>
        ))}
      </ScrollWrapper>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 20px;
  width: 100%;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex: 0 0 90%;
  max-width: 640px;
  scroll-snap-align: center;
  transition: transform 0.2s;
  height: 800px;
`;
