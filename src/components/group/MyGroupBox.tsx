import { MyGroupCard } from './MyGroupCard';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
import styled from '@emotion/styled';
import rightChevron from '../../assets/common/right-Chevron.svg';
import { useState, useEffect } from 'react';
import { getJoinedRooms, type JoinedRoomItem } from '@/api/rooms/getJoinedRooms';

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

const convertJoinedRoomToGroup = (room: JoinedRoomItem): Group => ({
  id: room.roomId,
  title: room.roomTitle,
  participants: room.memberCount,
  coverUrl: room.bookImageUrl,
  progress: room.userPercentage,
});

interface MyGroupProps {
  onMyGroupsClick: () => void;
}

export function MyGroupBox({ onMyGroupsClick }: MyGroupProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoinedRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getJoinedRooms(1);

      if (response.isSuccess) {
        const convertedGroups = response.data.roomList.map(convertJoinedRoomToGroup);
        setGroups(convertedGroups);
      }
    } catch (error) {
      console.error('가입한 방 목록 조회 오류:', error);
      setError('방 목록을 불러오는데 실패했습니다.');
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedRooms();
  }, []);

  const { scrollRef, cardRefs, infiniteGroups, current } = useInfiniteCarousel(groups);

  return (
    <Container>
      <Header>
        <Title>내 모임방</Title>
        <MoreButton onClick={onMyGroupsClick}>
          <img src={rightChevron} alt="내 모임방 버튼" />
        </MoreButton>
      </Header>
      {loading ? (
        <LoadingContainer>
          <LoadingText>모임방을 불러오는 중...</LoadingText>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      ) : groups.length > 0 ? (
        <>
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
        </>
      ) : (
        <EmptyContainer>
          <EmptyText>가입한 모임방이 없어요</EmptyText>
        </EmptyContainer>
      )}
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

const LoadingText = styled.p`
  color: var(--color-grey-300);
  font-size: var(--font-size-medium02);
  margin: 0;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

const ErrorText = styled.p`
  color: var(--color-red);
  font-size: var(--font-size-medium02);
  margin: 0;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

const EmptyText = styled.p`
  color: var(--color-grey-300);
  font-size: var(--font-size-medium02);
  margin: 0;
`;
