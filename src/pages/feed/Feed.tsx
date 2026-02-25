import { useState, useEffect } from 'react';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import MainHeader from '@/components/common/MainHeader';
import { FeedPostSkeleton, OtherFeedSkeleton } from '@/shared/ui/Skeleton';
import writefab from '../../assets/common/writefab.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTotalFeeds } from '@/api/feeds/getTotalFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import { useSocialLoginToken } from '@/hooks/useSocialLoginToken';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Container, SkeletonWrapper } from './Feed.styled';
import type { PostData } from '@/types/post';

const tabs = ['피드', '내 피드'];

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTabFromState = (location.state as { initialTab?: string } | null)?.initialTab;
  const [activeTab, setActiveTab] = useState<string>(initialTabFromState ?? tabs[0]);

  const { waitForToken } = useSocialLoginToken();

  useEffect(() => {
    if (initialTabFromState) {
      navigate('.', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchButton = () => {
    navigate('/feed/search');
  };

  const handleNoticeButton = () => {
    navigate('/notice');
  };

  const totalFeed = useInifinieScroll<PostData>({
    enabled: activeTab === '피드',
    reloadKey: activeTab,
    fetchPage: async cursor => {
      await waitForToken();
      const response = await getTotalFeeds(cursor ? { cursor } : undefined);
      return {
        items: response.data.feedList,
        nextCursor: response.data.nextCursor || null,
        isLast: response.data.isLast,
      };
    },
    mergeItems: (prev, next) => {
      const existingIds = new Set(prev.map(post => post.feedId));
      const newPosts = next.filter(post => !existingIds.has(post.feedId));
      return [...prev, ...newPosts];
    },
  });

  const myFeed = useInifinieScroll<PostData>({
    enabled: activeTab === '내 피드',
    reloadKey: activeTab,
    fetchPage: async cursor => {
      await waitForToken();
      const response = await getMyFeeds(cursor ? { cursor } : undefined);
      return {
        items: response.data.feedList,
        nextCursor: response.data.nextCursor || null,
        isLast: response.data.isLast,
      };
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const currentFeed = activeTab === '피드' ? totalFeed : myFeed;
  const showInitialLoading = currentFeed.isLoading && currentFeed.items.length === 0;

  return (
    <Container>
      <MainHeader
        type="home"
        leftButtonClick={handleSearchButton}
        rightButtonClick={handleNoticeButton}
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {showInitialLoading ? (
        activeTab === '내 피드' ? (
          <OtherFeedSkeleton showFollowButton={false} paddingTop={136} />
        ) : (
          <SkeletonWrapper>
            {Array.from({ length: 3 }).map((_, index) => (
              <FeedPostSkeleton key={index} />
            ))}
          </SkeletonWrapper>
        )
      ) : (
        <>
          {activeTab === '피드' ? (
            <>
              <TotalFeed
                showHeader={true}
                posts={totalFeed.items}
                isTotalFeed={true}
                isLast={totalFeed.isLast}
              />
            </>
          ) : (
            <>
              <MyFeed
                showHeader={false}
                posts={myFeed.items}
                isMyFeed={true}
                isLast={myFeed.isLast}
              />
            </>
          )}
          {!currentFeed.isLast && <div ref={currentFeed.sentinelRef} style={{ height: 40 }} />}
          {currentFeed.isLoadingMore && <LoadingSpinner size="small" fullHeight={false} />}
        </>
      )}
      <NavBar src={writefab} path="/post/create" />
    </Container>
  );
};

export default Feed;
