import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import { getNotifications, type NotificationItem } from '@/api/notifications/getNotifications';
import { postNotificationsCheck } from '@/api/notifications/postNotificationsCheck';
import {
  Wrapper,
  TabContainer,
  Tab,
  NotificationList,
  NotificationCard,
  TitleRow,
  Badge,
  Title,
  Time,
  Description,
  EmptyState,
  UnreadDot,
  Sentinel,
} from './Notice.styled';

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

      const { route, params } = res.data as { route: string; params?: Record<string, unknown> };

      switch (route) {
        case 'NONE':
          break;

        case 'FEED_USER': {
          const userId = (params?.userId as number) ?? undefined;
          if (userId !== undefined) {
            navigate(`/otherfeed/${userId}`);
          }
          break;
        }

        case 'FEED_DETAIL': {
          const feedId = (params?.feedId as number) ?? undefined;
          if (feedId !== undefined) {
            navigate(`/feed/${feedId}`);
          }
          break;
        }

        case 'ROOM_MAIN': {
          const roomId = (params?.roomId as number) ?? undefined;
          if (roomId !== undefined) navigate(`/group/detail/joined/${roomId}`);
          break;
        }

        case 'ROOM_DETAIL': {
          const roomId = (params?.roomId as number) ?? undefined;
          if (roomId !== undefined) navigate(`/group/detail/${roomId}`);
          break;
        }

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

      <Sentinel ref={sentinelRef} />
    </Wrapper>
  );
};

export default Notice;
