import { useState, useEffect, useRef } from 'react';
import TitleHeader from '../common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import { Modal, Overlay } from './Modal.styles';
import { getMyRooms, type Room, type RoomType } from '@/api/rooms/getMyRooms';
import { useNavigate } from 'react-router-dom';
import {
  TabContainer,
  Tab,
  Content,
  BottomSpinner,
  ErrorMessage,
  EmptyState,
  EmptyTitle,
  EmptySubText,
} from './MyGroupModal.styled';

interface MyGroupModalProps {
  onClose: () => void;
}

export const MyGroupModal = ({ onClose }: MyGroupModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'진행중' | '모집중' | '완료' | ''>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const convertRoomToGroup = (room: Room): Group => {
    return {
      id: room.roomId.toString(),
      title: room.roomName,
      userName: '',
      participants: room.memberCount,
      maximumParticipants: room.recruitCount,
      coverUrl: room.bookImageUrl,
      deadLine: room.endDate || '',
      genre: '',
      isOnGoing: room.type === 'playing' || room.type === 'playingAndRecruiting',
      isPublic: room.isPublic,
    };
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setNextCursor(null);
        setIsLast(false);

        const roomType: RoomType =
          selected === '진행중'
            ? 'playing'
            : selected === '모집중'
              ? 'recruiting'
              : selected === '완료'
                ? 'expired'
                : 'playingAndRecruiting';

        const response = await getMyRooms(roomType, null);

        if (response.isSuccess) {
          setRooms(response.data.roomList);
          setNextCursor(response.data.nextCursor);
          setIsLast(response.data.isLast);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error('방 목록 조회 실패:', error);
        setError('방 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [selected]);

  const isFetchingRef = useRef(false);

  const loadMore = async () => {
    if (isFetchingRef.current || isLast || !nextCursor) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    try {
      const roomType: RoomType =
        selected === '진행중'
          ? 'playing'
          : selected === '모집중'
            ? 'recruiting'
            : selected === '완료'
              ? 'expired'
              : 'playingAndRecruiting';

      const res = await getMyRooms(roomType, nextCursor);
      if (res.isSuccess) {
        setRooms(prev => [...prev, ...res.data.roomList]);
        setNextCursor(res.data.nextCursor);
        setIsLast(res.data.isLast);
      } else {
        setError(res.message);
      }
    } catch (e) {
      console.log(e);
      setError('방 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      await loadMore();
    }
  };

  useEffect(() => {
    const tryFill = async () => {
      if (!contentRef.current || isLast) return;
      let guard = 2;
      while (
        guard-- > 0 &&
        contentRef.current &&
        contentRef.current.scrollHeight <= contentRef.current.clientHeight &&
        !isLast &&
        nextCursor
      ) {
        await loadMore();
        await new Promise(requestAnimationFrame);
      }
    };
    tryFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, nextCursor, isLast]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  const convertedGroups = rooms.map(convertRoomToGroup);

  const handleGroupCardClick = (group: Group) => {
    if (selected === '완료') {
      navigate(`/group/detail/joined/${group.id}`);
    } else if (selected === '모집중') {
      navigate(`/group/detail/${group.id}`);
    } else if (selected === '진행중') {
      navigate(`/group/detail/joined/${group.id}`);
    } else {
      if (group.isOnGoing) {
        navigate(`/group/detail/joined/${group.id}`);
      } else {
        navigate(`/group/detail/${group.id}`);
      }
    }
  };
  return (
    <Overlay>
      <Modal>
        <TitleHeader
          title="내 모임방"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={onClose}
        />

        <TabContainer>
          {(['진행중', '모집중', '완료'] as const).map(tab => (
            <Tab
              key={tab}
              selected={tab === selected}
              onClick={() => setSelected(prev => (prev === tab ? '' : tab))}
            >
              {tab}
            </Tab>
          ))}
        </TabContainer>

        <Content ref={contentRef} onScroll={handleScroll}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {convertedGroups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              isOngoing={group.isOnGoing}
              type="modal"
              isCompleted={selected === '완료'}
              onClick={() => handleGroupCardClick(group)}
            />
          ))}

          {isLoading && <BottomSpinner>불러오는 중…</BottomSpinner>}

          {!isLoading && convertedGroups.length === 0 && (
            <EmptyState>
              <EmptyTitle>
                {selected === '진행중'
                  ? '진행중인 모임방이 없어요'
                  : selected === '모집중'
                    ? '모집중인 모임방이 없어요'
                    : selected === '완료'
                      ? '완료된 모임방이 없어요'
                      : '참여중인 모임방이 없어요'}
              </EmptyTitle>
              <EmptySubText>
                {selected === '진행중'
                  ? '진행중인 모임방에 참여해보세요!'
                  : selected === '모집중'
                    ? '모집중인 모임방에 참여해보세요!'
                    : selected === '완료'
                      ? '아직 완료된 모임방이 없습니다.'
                      : '첫 번째 모임방에 참여해보세요!'}
              </EmptySubText>
            </EmptyState>
          )}
        </Content>
      </Modal>
    </Overlay>
  );
};
