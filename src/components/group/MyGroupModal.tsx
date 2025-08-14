import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '../common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import { Modal, Overlay } from './Modal.styles';
import { getMyRooms, type Room, type RoomType } from '@/api/rooms/getMyRooms';

interface MyGroupModalProps {
  onClose: () => void;
}

export const MyGroupModal = ({ onClose }: MyGroupModalProps) => {
  const [selected, setSelected] = useState<'진행중' | '모집중' | ''>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoomType = useCallback((): RoomType => {
    if (selected === '진행중') return 'playing';
    if (selected === '모집중') return 'recruiting';
    return 'playingAndRecruiting';
  }, [selected]);

  const fetchRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const roomType = getRoomType();
      const response = await getMyRooms(roomType, null);
      console.log(response);
      if (response.isSuccess) {
        setRooms(response.data.roomList);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('방 목록 조회 실패:', error);
      setError('방 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [getRoomType]);

  const convertRoomToGroup = (room: Room): Group => {
    return {
      id: room.roomId.toString(),
      title: room.roomName,
      participants: room.memberCount,
      maximumParticipants: room.recruitCount,
      coverUrl: room.bookImageUrl,
      deadLine: 0,
      isOnGoing: room.type === 'playing' || room.type === 'playingAndRecruiting',
    };
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const convertedGroups = rooms.map(convertRoomToGroup);
  return (
    <Overlay>
      <Modal>
        <TitleHeader
          title="내 모임방"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={onClose}
        />

        <TabContainer>
          {(['진행중', '모집중'] as const).map(tab => (
            <Tab
              key={tab}
              selected={tab === selected}
              onClick={() => setSelected(prev => (prev === tab ? '' : tab))}
            >
              {tab}
            </Tab>
          ))}
        </TabContainer>

        <Content>
          {isLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : convertedGroups.length > 0 ? (
            convertedGroups.map(group => (
              <GroupCard key={group.id} group={group} isOngoing={group.isOnGoing} type={'modal'} />
            ))
          ) : (
            <EmptyMessage>
              {selected === '진행중'
                ? '진행중인 모임방이 없습니다.'
                : selected === '모집중'
                  ? '모집중인 모임방이 없습니다.'
                  : '참여한 모임방이 없습니다.'}
            </EmptyMessage>
          )}
        </Content>
      </Modal>
    </Overlay>
  );
};

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 76px 20px 20px 20px;
`;

const Tab = styled.button<{ selected: boolean }>`
  white-space: nowrap;
  padding: 6px 12px;
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-regular);
  border: none;
  border-radius: 16px;
  background: ${({ selected }) =>
    selected ? 'var(--color-purple-main)' : 'var(--color-darkgrey-main)'};
  color: #fff;
  cursor: pointer;
`;

const Content = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: auto;
  padding: 0 20px;

  grid-template-columns: 1fr;

  @media (min-width: 584px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #fff;
  font-size: var(--font-size-regular);
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #ff6b6b;
  font-size: var(--font-size-regular);
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #999;
  font-size: var(--font-size-regular);
`;
