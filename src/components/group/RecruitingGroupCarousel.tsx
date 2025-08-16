import styled from '@emotion/styled';
import type { Group } from './MyGroupBox';
import { RecruitingGroupBox } from './RecruitingGroupBox';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';

export interface Section {
  title: string;
  groups: Group[];
}

interface Props {
  sections: Section[];
}

export function RecruitingGroupCarousel({ sections }: Props) {
  const groups = sections.map(sec => ({ ...sec.groups[0], title: sec.title, groups: sec.groups }));

  const sectionGroups = sections.map(sec => ({
    ...sec.groups[0],
    title: sec.title,
    groups: sec.groups,
  }));

  const { scrollRef, cardRefs, infiniteGroups } = useInfiniteCarousel(sectionGroups, {
    scaleAmount: 0.08,
  });

  return (
    <ScrollWrapper ref={scrollRef}>
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
  height: 800px;
`;
