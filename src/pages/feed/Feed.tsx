import { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import MainHeader from '@/components/common/MainHeader';
import { FeedPostSkeleton, OtherFeedSkeleton } from '@/shared/ui/Skeleton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import writefab from '../../assets/common/writefab.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTotalFeeds } from '@/api/feeds/getTotalFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import { useSocialLoginToken } from '@/hooks/useSocialLoginToken';
import { useFeedCache, writeFeedCache } from '@/hooks/useFeedCache';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
import { Container, SkeletonWrapper } from './Feed.styled';
import type { PostData } from '@/types/post';

const tabs = ['피드', '내 피드'];

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { waitForToken } = useSocialLoginToken();

  const initialTabFromState = (location.state as { initialTab?: string } | null)?.initialTab;
  const { initialCache } = useFeedCache({ disableRestore: !!initialTabFromState });
  const isRestoringFromCache = initialCache !== null && !initialTabFromState;

  useEffect(() => {
    if (initialTabFromState) navigate('.', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeTab, setActiveTab] = useState<string>(
    initialTabFromState ?? (isRestoringFromCache ? initialCache!.activeTab : tabs[0]),
  );

  const skipScrollResetRef = useRef(isRestoringFromCache);

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
    initialItems: isRestoringFromCache ? initialCache!.totalFeedPosts : undefined,
    initialCursor: isRestoringFromCache ? initialCache!.totalNextCursor || null : undefined,
    initialIsLast: isRestoringFromCache ? initialCache!.totalIsLast : undefined,
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
    initialItems: isRestoringFromCache ? initialCache!.myFeedPosts : undefined,
    initialCursor: isRestoringFromCache ? initialCache!.myNextCursor || null : undefined,
    initialIsLast: isRestoringFromCache ? initialCache!.myIsLast : undefined,
  });

  useEffect(() => {
    if (skipScrollResetRef.current) {
      skipScrollResetRef.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [activeTab]);

  const currentFeed = activeTab === '피드' ? totalFeed : myFeed;

  useEffect(() => {
    const hasItems = totalFeed.items.length > 0 || myFeed.items.length > 0;
    if (!hasItems) return;
    writeFeedCache({
      activeTab,
      totalFeedPosts: totalFeed.items,
      myFeedPosts: myFeed.items,
      totalNextCursor: totalFeed.nextCursor ?? '',
      myNextCursor: myFeed.nextCursor ?? '',
      totalIsLast: totalFeed.isLast,
      myIsLast: myFeed.isLast,
    });
  }, [
    activeTab,
    totalFeed.items,
    myFeed.items,
    totalFeed.nextCursor,
    myFeed.nextCursor,
    totalFeed.isLast,
    myFeed.isLast,
  ]);

  return (
    <Container>
      <MainHeader
        type="home"
        leftButtonClick={() => navigate('/feed/search')}
        rightButtonClick={() => navigate('/notice')}
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {currentFeed.isLoading ? (
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
            <TotalFeed
              showHeader={true}
              posts={totalFeed.items}
              isMyFeed={false}
              isLast={totalFeed.isLast}
            />
          ) : (
            <MyFeed
              showHeader={false}
              posts={myFeed.items}
              isMyFeed={true}
              isLast={myFeed.isLast}
            />
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
