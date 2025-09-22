import { MyGroupCard } from './MyGroupCard';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
import styled from '@emotion/styled';
import rightChevron from '../../assets/common/right-Chevron.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJoinedRooms, type JoinedRoomItem } from '@/api/rooms/getJoinedRooms';
import { colors, typography } from '@/styles/global/global';
import noneMyGroupCharacter from '../../assets/group/noneMyGroupCharacter.svg';

export interface Group {
  id: number | string;
  title: string;
  participants: number;
  maximumParticipants?: number;
  userName?: string;
  progress?: number;
  coverUrl: string;
  deadLine?: string;
  genre?: string;
  isOnGoing?: boolean;
  isPublic?: boolean;
  type?: string;
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
  const navigate = useNavigate();

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

  const handleCardClick = (roomId: number | string) => {
    navigate(`detail/joined/${roomId}`);
  };

  const isSingle = groups.length === 1;
  const { scrollRef, cardRefs, infiniteGroups } = useInfiniteCarousel(isSingle ? [] : groups);

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
          {isSingle ? (
            <Carousel>
              <MyGroupCard
                group={groups[0]}
                isMine
                onClick={() => navigate(`detail/joined/${groups[0].id}`)}
              />
            </Carousel>
          ) : (
            <Carousel
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
                <MyGroupCard
                  key={`${g.id}-${i}`}
                  group={g}
                  isMine
                  ref={el => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => handleCardClick(g.id)}
                />
              ))}
            </Carousel>
          )}
        </>
      ) : (
        <EmptyContainer>
          <EmptyCard role="status" aria-live="polite">
            <EmptyTexts>
              <EmptyTitle>참여 중인 모임방이 없어요</EmptyTitle>
              <EmptySubtitle>모임방을 찾아 참여해보세요!</EmptySubtitle>
            </EmptyTexts>

            <ArtworkWrapper>
              <Artwork src={noneMyGroupCharacter} alt="" draggable={false} decoding="async" />
            </ArtworkWrapper>
          </EmptyCard>
        </EmptyContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: ${colors.black.main};
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
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
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

  justify-content: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

const LoadingText = styled.p`
  color: ${colors.grey[300]};
  font-size: ${typography.fontSize.base};
  margin: 0;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

const ErrorText = styled.p`
  color: ${colors.red};
  font-size: ${typography.fontSize.base};
  margin: 0;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px 12px;
`;

const EmptyCard = styled.div`
  position: relative;
  width: 90%;
  max-width: 640px;
  min-height: 180px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        120% 80% at 50% -40%,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0) 60%
      ),
      radial-gradient(80% 60% at 50% 120%, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 55%);
    pointer-events: none;
  }
`;

const EmptyTexts = styled.div`
  position: relative;
  z-index: 1;
  padding: 32px 24px 96px;
  text-align: center;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 10px;
  color: ${colors.black.main};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: -0.2px;
`;

const EmptySubtitle = styled.p`
  margin: 0;
  color: ${colors.grey[300]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

const ArtworkWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 12%);
  width: clamp(90px, 42%, 90px);
  pointer-events: none;
  z-index: 0;
`;

const Artwork = styled.img`
  display: block;
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
  user-select: none;
  opacity: 0.98;
`;
