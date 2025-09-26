import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import { colors, typography } from '@/styles/global/global';
import { getNotifications, type NotificationItem } from '@/api/notifications/getNotifications';
import { postNotificationsCheck } from '@/api/notifications/postNotificationsCheck';

const Notice = () => {
  const [selected, setSelected] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoadingRef = useRef<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleSelectTab = (tab: string) => {
    setSelected(prev => (prev === tab ? '' : tab));
  };

  const loadNotifications = useCallback(
    async (cursor?: string | null) => {
      try {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        const params: { cursor?: string | null; type?: 'feed' | 'room' } = { cursor };
        if (selected === '피드') params.type = 'feed';
        if (selected === '모임') params.type = 'room';

        const res = await getNotifications(params);
        if (res.isSuccess) {
          setNotifications(prev =>
            cursor ? [...prev, ...res.data.notifications] : res.data.notifications,
          );
          setNextCursor(res.data.nextCursor || null);
          setIsLast(res.data.isLast);
        }
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    },
    [selected],
  );

  useEffect(() => {
    // 탭 변경 시 첫 페이지부터 다시 로드
    setNotifications([]);
    setNextCursor(null);
    setIsLast(false);
    void loadNotifications(null);
  }, [selected, loadNotifications]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !isLast && nextCursor !== null) {
          void loadNotifications(nextCursor);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [isLoading, isLast, nextCursor, loadNotifications]);

  const filteredNotifications = notifications;

  const tabs = ['피드', '모임'];

  const handleNotificationClick = async (notif: NotificationItem) => {
    try {
      const res = await postNotificationsCheck(notif.notificationId);
      if (!res.isSuccess) return;

      // UI 즉시 반영: 읽음 처리
      // setNotifications(prev =>
      //   prev.map(item =>
      //     item.notificationId === notif.notificationId ? { ...item, isChecked: true } : item,
      //   ),
      // );

      const { route, params } = res.data as { route: string; params?: Record<string, unknown> };

      // 서버 라우팅 키 → 실제 앱 경로 매핑
      switch (route) {
        // 이동 없음
        case 'NONE':
          break;

        // 피드 1번 (해당유저 피드로 이동)
        case 'FEED_USER': {
          const userId = (params?.userId as number) ?? undefined;
          if (userId !== undefined) {
            navigate(`/otherfeed/${userId}`);
          }
          break;
        }

        // 피드 2~6번 (피드상세페이지로 이동)
        case 'FEED_DETAIL': {
          const feedId = (params?.feedId as number) ?? undefined;
          if (feedId !== undefined) {
            navigate(`/feed/${feedId}`);
          }
          break;
        }

        // 모임 (모집조기마감 or 모임시작)
        case 'ROOM_MAIN': {
          const roomId = (params?.roomId as number) ?? undefined;
          if (roomId !== undefined) navigate(`/group/detail/joined/${roomId}`);
          break;
        }

        // host일때, 누군가 모임 참여를 눌렀을 때
        case 'ROOM_DETAIL': {
          const roomId = (params?.roomId as number) ?? undefined;
          if (roomId !== undefined) navigate(`/group/detail/${roomId}`);
          break;
        }

        // 모임방 -> 기록장 -> 해당 기록 필터링 화면으로 이동
        case 'ROOM_POST_DETAIL': {
          const roomId = (params?.roomId as number) ?? undefined;
          const postId = (params?.postId as number) ?? undefined;
          const page = (params?.page as number) ?? undefined;
          const postType = params?.postType as 'RECORD' | 'VOTE';
          const shouldOpenComments = (params as { openComments?: boolean })?.openComments === true;
          if (roomId !== undefined) {
            navigate(`/rooms/${roomId}/memory`, {
              state: {
                focusPostId: postId,
                postType,
                page,
                ...(shouldOpenComments ? { openComments: true } : {}),
              },
            });
          }
          break;
        }

        default:
          break;
      }
    } catch (e) {
      // noop: 실패 시 네비게이션 없이 무시
      console.error('알림 확인 처리 실패:', e);
    }
  };

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
              key={notif.notificationId ?? idx}
              read={notif.isChecked}
              onClick={() => handleNotificationClick(notif)}
            >
              {!notif.isChecked && <UnreadDot />}
              <TitleRow>
                <Badge>{notif.notificationType}</Badge>
                <Title>{notif.title}</Title>
                <Time>{notif.postDate}</Time>
              </TitleRow>
              <Description>{notif.content}</Description>
            </NotificationCard>
          ))
        )}
      </NotificationList>

      {/* 무한 스크롤 감지용 센티넬 */}
      <Sentinel ref={sentinelRef} />
    </Wrapper>
  );
};

export default Notice;

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
  /* Hide scrollbar but keep scroll */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const NotificationCard = styled.div<{ read: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${colors.darkgrey.dark};
  border-radius: 12px;
  padding: 16px;
  color: ${colors.grey[300]};
  position: relative;
  width: 100%;
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
  margin-top: 300px;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  padding: 40px 0px;
  text-align: center;
  color: ${colors.white};
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

const Sentinel = styled.div`
  width: 100%;
  height: 1px;
`;
