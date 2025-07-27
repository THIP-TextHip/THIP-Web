import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import { colors, typography } from '@/styles/global/global';

const Notice = () => {
  const [selected, setSelected] = useState<string>(''); // ''이면 전체
  const [notifications, setNotifications] = useState(dummyNotifications); // 알림 상태화
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleSelectTab = (tab: string) => {
    setSelected(prev => (prev === tab ? '' : tab)); // 동일한 탭이면 해제
  };

  const handleReadNotification = (index: number) => {
    setNotifications(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, read: true } : item)),
    );
  };

  const filteredNotifications =
    selected === '' ? notifications : notifications.filter(notif => notif.category === selected);

  const tabs = ['피드', '모임'];

  return (
    <Wrapper>
      <TitleHeader
        title="알림"
        leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
        onLeftClick={handleBackButton}
      />

      <TabContainer>
        {tabs.map(tab => (
          <Tab key={tab} selected={selected === tab} onClick={() => handleSelectTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>

      <NotificationList>
        {filteredNotifications.length === 0 ? (
          <EmptyState>새로운 알림이 없어요</EmptyState>
        ) : (
          filteredNotifications.map((notif, idx) => (
            <NotificationCard
              key={idx}
              read={notif.read}
              onClick={() => handleReadNotification(idx)}
            >
              {!notif.read && <UnreadDot />}
              <TitleRow>
                <Badge>{notif.category}</Badge>
                <Title>{notif.title}</Title>
                <Time>{notif.time}</Time>
              </TitleRow>
              <Description>{notif.description}</Description>
            </NotificationCard>
          ))
        )}
      </NotificationList>
    </Wrapper>
  );
};

export default Notice;

const dummyNotifications = [
  {
    category: '모임',
    title: '같이 읽기를 시작했어요!ㄹㅁㄴㅇㄹㅁㄴㅇㄹㄴㅇㅁㄹㄴㅁㄹㅇㄴㄴㅇㅁㄹㅇㄴ',
    description: '모임방에서 20분 동안 같이 읽기가 시작했어요!',
    time: '2시간 전',
    read: false,
  },
  {
    category: '피드',
    title: '내 글을 좋아합니다.',
    description: '@user123 님이 내 글에 좋아요를 눌렀어요.',
    time: '7시간 전',
    read: true,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
  {
    category: '모임',
    title: '투표가 시작되었어요!',
    description:
      '투표제목을 먼저 말해줍니다 그리고 어쩌구저쩌구.ㄹㄴㄹㅇㄴㄹㅁㄴㄹㅇㄴㄹㅁㄴㄹㄴㅁㅇㄹㄴㅁㅇㄹㅁㄴㄹㄴ',
    time: '17시간 전',
    read: false,
  },
];

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 20px;
  margin: 76px 0 20px 0;
`;

const Tab = styled.button<{ selected: boolean }>`
  padding: 8px 12px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) => (selected ? colors.purple.main : colors.darkgrey.main)};
  color: ${colors.white};
  cursor: pointer;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 20px 20px;
  width: 100%;
  overflow-y: auto;
`;

const NotificationCard = styled.div<{ read: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${colors.darkgrey.dark};
  border-radius: 12px;
  padding: 16px;
  color: ${colors.grey[300]};
  position: relative;
  width: ${({ read }) => (read ? '100%' : '90%')};
  opacity: ${({ read }) => (read ? '0.5' : '1')};
  cursor: pointer;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
`;

const Badge = styled.span`
  flex-shrink: 0;
  color: ${colors.grey[100]};
  border-radius: 40px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  padding: 4px 10px;
  border: 1px solid ${colors.grey[200]};
  white-space: nowrap;
`;

const Title = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
`;

const Time = styled.div`
  flex-shrink: 0;
  font-size: ${typography.fontSize['2xs']};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[200]};
  white-space: nowrap;
`;

const Description = styled.div`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[200]};
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyState = styled.div`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  padding: 40px;
  text-align: center;
  color: #e0e0e0;
`;

const UnreadDot = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 6px;
  height: 6px;
  background-color: #ff9496;
  border-radius: 50%;
`;
