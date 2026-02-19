import { useState, useEffect, useCallback } from 'react';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import MainHeader from '@/components/common/MainHeader';
import FeedPostSkeleton from '@/shared/ui/Skeleton/FeedPostSkeleton';
import OtherFeedSkeleton from '@/shared/ui/Skeleton/OtherFeedSkeleton';
import writefab from '../../assets/common/writefab.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTotalFeeds } from '@/api/feeds/getTotalFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import { useSocialLoginToken } from '@/hooks/useSocialLoginToken';
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

  const [totalFeedPosts, setTotalFeedPosts] = useState<PostData[]>([]);
  const [totalLoading, setTotalLoading] = useState(false);
  const [totalNextCursor, setTotalNextCursor] = useState<string>('');
  const [totalIsLast, setTotalIsLast] = useState(false);

  const [myFeedPosts, setMyFeedPosts] = useState<PostData[]>([]);
  const [myLoading, setMyLoading] = useState(false);
  const [myNextCursor, setMyNextCursor] = useState<string>('');
  const [myIsLast, setMyIsLast] = useState(false);

  const [tabLoading, setTabLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const handleSearchButton = () => {
    navigate('/feed/search');
  };

  const handleNoticeButton = () => {
    navigate('/notice');
  };

  const loadTotalFeeds = useCallback(async (_cursor?: string) => {
    try {
      setTotalLoading(true);

      const response = await getTotalFeeds(_cursor ? { cursor: _cursor } : undefined);

      if (_cursor) {
        setTotalFeedPosts(prev => {
          const existingIds = new Set(prev.map(post => post.feedId));
          const newPosts = response.data.feedList.filter(post => !existingIds.has(post.feedId));
          return [...prev, ...newPosts];
        });
      } else {
        setTotalFeedPosts(response.data.feedList);
      }

      setTotalNextCursor(response.data.nextCursor);
      setTotalIsLast(response.data.isLast);
    } catch (error) {
      console.error('전체 피드 로드 실패:', error);
    } finally {
      setTotalLoading(false);
    }
  }, []);

  const loadMyFeeds = useCallback(async (_cursor?: string) => {
    try {
      setMyLoading(true);
      const response = await getMyFeeds(_cursor ? { cursor: _cursor } : undefined);

      if (_cursor) {
        setMyFeedPosts(prev => [...prev, ...response.data.feedList]);
      } else {
        setMyFeedPosts(response.data.feedList);
      }

      setMyNextCursor(response.data.nextCursor);
      setMyIsLast(response.data.isLast);
    } catch (error) {
      console.error('내 피드 로드 실패:', error);
    } finally {
      setMyLoading(false);
    }
  }, []);

  const loadMoreFeeds = useCallback(() => {
    if (activeTab === '피드') {
      if (!totalIsLast && !totalLoading && totalNextCursor) {
        loadTotalFeeds(totalNextCursor);
      }
    } else {
      if (!myIsLast && !myLoading && myNextCursor) {
        loadMyFeeds(myNextCursor);
      }
    }
  }, [activeTab, totalIsLast, totalLoading, totalNextCursor, myIsLast, myLoading, myNextCursor]);

  useEffect(() => {
    const handleScroll = () => {
      const isLoading = activeTab === '피드' ? totalLoading : myLoading;
      const isLastPage = activeTab === '피드' ? totalIsLast : myIsLast;

      if (isLoading || isLastPage) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreFeeds();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, totalLoading, myLoading, totalIsLast, myIsLast, loadMoreFeeds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const loadFeedsWithToken = async () => {
      await waitForToken();

      setTabLoading(true);

      try {
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));

        if (activeTab === '피드') {
          await Promise.all([loadTotalFeeds(), minLoadingTime]);
        } else if (activeTab === '내 피드') {
          await Promise.all([loadMyFeeds(), minLoadingTime]);
        }
      } finally {
        setTabLoading(false);
        setInitialLoading(false);
      }
    };

    loadFeedsWithToken();
  }, [activeTab, waitForToken, loadTotalFeeds, loadMyFeeds]);

  return (
    <Container>
      <MainHeader
        type="home"
        leftButtonClick={handleSearchButton}
        rightButtonClick={handleNoticeButton}
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {initialLoading || tabLoading ? (
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
                posts={totalFeedPosts}
                isMyFeed={false}
                isLast={totalIsLast}
              />
            </>
          ) : (
            <>
              <MyFeed showHeader={false} posts={myFeedPosts} isMyFeed={true} isLast={myIsLast} />
            </>
          )}
        </>
      )}
      <NavBar src={writefab} path="/post/create" />
    </Container>
  );
};

export default Feed;
