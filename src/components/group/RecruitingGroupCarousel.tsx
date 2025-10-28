import styled from '@emotion/styled';
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

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  &:hover .nav-button {
    opacity: 1;
    visibility: visible;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  visibility: hidden;
  transition: all 0.1s ease;

  &.prev {
    left: 3%;
  }

  &.next {
    right: 3%;
  }

  img {
    filter: invert(1);
  }

  @media (max-width: 768px) {
    display: none;
  }
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

  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

const Item = styled.div`
  flex: 0 0 90%;
  max-width: 640px;
  min-width: 280px;
  scroll-snap-align: center;
  transition: transform 0.3s ease-out;
  will-change: transform;
  transform: translateZ(0);

  @media (max-width: 480px) {
    flex: 0 0 85%;
    min-width: 260px;
  }
`;
