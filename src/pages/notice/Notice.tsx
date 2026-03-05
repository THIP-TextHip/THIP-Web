import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import { getNotifications, type NotificationItem } from '@/api/notifications/getNotifications';
import { postNotificationsCheck } from '@/api/notifications/postNotificationsCheck';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
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
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleSelectTab = (tab: string) => {
    setSelected(prev => (prev === tab ? '' : tab));
  };

  const notificationList = useInifinieScroll<NotificationItem>({
    enabled: true,
    reloadKey: selected,
    fetchPage: async cursor => {
      const params: { cursor?: string | null; type?: 'feed' | 'room' } = { cursor };
      if (selected === '피드') params.type = 'feed';
      if (selected === '모임') params.type = 'room';
      const res = await getNotifications(params);
      return {
        items: res.data.notifications,
        nextCursor: res.data.nextCursor || null,
        isLast: res.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

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
        {notificationList.items.length === 0 && !notificationList.isLoading ? (
          <EmptyState>새로운 알림이 없어요</EmptyState>
        ) : (
          notificationList.items.map((notif, idx) => (
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

      {!notificationList.isLast && <Sentinel ref={notificationList.sentinelRef} />}
    </Wrapper>
  );
};

export default Notice;
