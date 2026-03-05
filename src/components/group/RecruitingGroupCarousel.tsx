import {
  CarouselContainer,
  NavButton,
  ScrollWrapper,
  Item,
} from './RecruitingGroupCarousel.styled';
import type { Group } from './MyGroupBox';
import { RecruitingGroupBox } from './RecruitingGroupBox';
import { useInfiniteCarousel } from '@/hooks/useInfiniteCarousel';
import backIcon from '@/assets/common/back.svg';
import nextIcon from '@/assets/common/next.svg';

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

  const handlePrevClick = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      container.scrollLeft -= cardWidth + 20;
    }
  };

  const handleNextClick = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      container.scrollLeft += cardWidth + 20;
    }
  };

  return (
    <CarouselContainer>
      <NavButton className="nav-button prev" onClick={handlePrevClick}>
        <img src={backIcon} alt="이전" />
      </NavButton>
      <NavButton className="nav-button next" onClick={handleNextClick}>
        <img src={nextIcon} alt="다음" />
      </NavButton>
      <ScrollWrapper
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
