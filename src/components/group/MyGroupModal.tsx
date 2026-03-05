import { useState, useEffect, useRef } from 'react';
import TitleHeader from '../common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import { Modal, Overlay } from './Modal.styles';
import { getMyRooms, type Room, type RoomType } from '@/api/rooms/getMyRooms';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
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
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  const roomType: RoomType =
    selected === '진행중'
      ? 'playing'
      : selected === '모집중'
        ? 'recruiting'
        : selected === '완료'
          ? 'expired'
          : 'playingAndRecruiting';

  const roomList = useInifinieScroll<Room>({
    enabled: true,
    reloadKey: roomType,
    rootRef: contentRef,
    fetchPage: async cursor => {
      const response = await getMyRooms(roomType, cursor);
      if (!response.isSuccess) {
        throw new Error(response.message || '방 목록을 불러오는데 실패했습니다.');
      }
      return {
        items: response.data.roomList,
        nextCursor: response.data.nextCursor,
        isLast: response.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  const convertedGroups = roomList.items.map(convertRoomToGroup);

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

        <Content ref={contentRef}>
          {roomList.error && <ErrorMessage>{roomList.error}</ErrorMessage>}

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

          {!roomList.isLast && (
            <div ref={roomList.sentinelRef} style={{ gridColumn: '1 / -1', height: 20 }} />
          )}
          {roomList.isLoadingMore && (
            <BottomSpinner>
              <LoadingSpinner size="small" fullHeight={false} />
            </BottomSpinner>
          )}

          {!roomList.isLoading && convertedGroups.length === 0 && !roomList.error && (
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
