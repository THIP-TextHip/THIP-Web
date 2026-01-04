import { MyGroupCard } from './MyGroupCard';
import { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';
import rightChevron from '../../assets/common/right-Chevron.svg';
import backIcon from '@/assets/common/back.svg';
import nextIcon from '@/assets/common/next.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJoinedRooms, type JoinedRoomItem } from '@/api/rooms/getJoinedRooms';
import noneMyGroupCharacter from '../../assets/group/noneMyGroupCharacter.svg';
import {
  Container,
  Header,
  Title,
  MoreButton,
  CarouselContainer,
  NavButton,
  Carousel,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  EmptyContainer,
  EmptyCard,
  EmptyTexts,
  EmptyTitle,
  EmptySubtitle,
  ArtworkWrapper,
  Artwork,
} from './MyGroupBox.styled';

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
  deadLine: room.deadlineDate || undefined,
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

  const handlePrevClick = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      container.scrollLeft -= cardWidth + 12;
    }
  };

  const handleNextClick = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      container.scrollLeft += cardWidth + 12;
    }
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
        <CarouselContainer>
          {!isSingle && (
            <>
              <NavButton className="nav-button prev" onClick={handlePrevClick}>
                <img src={backIcon} alt="이전" />
              </NavButton>
              <NavButton className="nav-button next" onClick={handleNextClick}>
                <img src={nextIcon} alt="다음" />
              </NavButton>
            </>
          )}
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
        </CarouselContainer>
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
