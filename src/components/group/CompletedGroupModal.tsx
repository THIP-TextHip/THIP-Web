import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import TitleHeader from '../common/TitleHeader';
import { Modal, Overlay } from './Modal.styles';
import { getMyRooms, type Room } from '@/api/rooms/getMyRooms';
import { getMyProfile } from '@/api/users/getMyProfile';
import { colors, typography } from '@/styles/global/global';
import { useNavigate } from 'react-router-dom';

interface CompletedGroupModalProps {
  onClose: () => void;
}

const CompletedGroupModal = ({ onClose }: CompletedGroupModalProps) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');

  const convertRoomToGroup = (room: Room): Group => {
    return {
      id: room.roomId.toString(),
      title: room.roomName,
      userName: '',
      participants: room.memberCount,
      maximumParticipants: room.recruitCount,
      coverUrl: room.bookImageUrl,
      deadLine: '',
      isOnGoing: false,
    };
  };

  const handleGroupCardClick = (group: Group) => {
    navigate(`/group/detail/joined/${group.id}`);
  };

  useEffect(() => {
    const fetchCompletedRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getMyRooms('expired', null);
        if (response.isSuccess) {
          setRooms(response.data.roomList);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error('완료된 방 목록 조회 실패:', error);
        setError('완료된 방 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchNickname = async () => {
      try {
        const profile = await getMyProfile();
        setNickname(profile.nickname);
      } catch {
        setNickname('');
      }
    };

    fetchCompletedRooms();
    fetchNickname();
  }, []);

  const convertedGroups = rooms.map(convertRoomToGroup);
  return (
    <Overlay $whiteBg>
      <Modal>
        <TitleHeader
          title="완료된 모임방"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={onClose}
        />
        <Text>
          {nickname
            ? `${nickname}님이 참여했던 모임방들을 확인해보세요.`
            : '참여했던 모임방들을 확인해보세요.'}
        </Text>
        <Content isEmpty={!isLoading && !error && convertedGroups.length === 0}>
          {isLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : convertedGroups.length > 0 ? (
            convertedGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                type={'modal'}
                onClick={() => handleGroupCardClick(group)}
              />
            ))
          ) : (
            <EmptyState data-empty="true">
              <EmptyTitle>완료된 모임방이 없어요</EmptyTitle>
              <EmptySubText>아직 완료된 모임방이 없습니다.</EmptySubText>
            </EmptyState>
          )}
        </Content>
      </Modal>
    </Overlay>
  );
};

export default CompletedGroupModal;

const Text = styled.p`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.white};
  margin: 96px 20px 20px 20px;
`;

const Content = styled.div<{ isEmpty?: boolean }>`
  display: grid;
  gap: 20px;
  overflow-y: ${({ isEmpty }) => (isEmpty ? 'visible' : 'auto')};
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
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #ff6b6b;
  font-size: ${typography.fontSize.base};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: ${colors.grey[100]};
  text-align: center;
  height: 70%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const EmptyTitle = styled.p`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
  color: ${colors.white};
`;

const EmptySubText = styled.p`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
`;
