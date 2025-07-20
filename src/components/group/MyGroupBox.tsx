import { MyGroupCard } from './MyGroupCard';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
import styled from '@emotion/styled';
import rightChevron from '../../assets/common/right-Chevron.svg';

export interface Group {
  id: number | string;
  title: string;
  participants: number;
  maximumParticipants?: number;
  userName?: string;
  progress?: number;
  coverUrl: string;
  deadLine?: number;
  genre?: string;
  isOnGoing?: boolean;
}

interface MyGroupProps {
  groups: Group[];
  onMyGroupsClick: () => void;
}

export function MyGroupBox({ groups, onMyGroupsClick }: MyGroupProps) {
  const { scrollRef, cardRefs, infiniteGroups, current } = useInfiniteCarousel(groups);

  return (
    <Container>
      <Header>
        <Title>내 모임방</Title>
        <MoreButton onClick={onMyGroupsClick}>
          <img src={rightChevron} alt="내 모임방 버튼" />
        </MoreButton>
      </Header>
      <Carousel ref={scrollRef}>
        {infiniteGroups.map((g, i) => (
          <MyGroupCard
            key={`${g.id}-${i}`}
            group={g}
            ref={el => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </Carousel>
      <Dots>
        {groups.map((_, i) => (
          <Dot key={i} active={i === current} />
        ))}
      </Dots>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--color-main-black);
  position: relative;
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

const Title = styled.h2`
  flex: 1;
  font-size: var(--font-size-large02);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  margin: 0;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  > img {
    width: 24px;
    height: 24px;
  }
`;

const Carousel = styled.div`
  display: flex;
  padding: 0;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-snap-type: x mandatory;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 30px 0;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ active }) => (active ? 'var(--color-white)' : `var(--color-grey-300)`)};
  transition: background-color 0.3s;
`;
