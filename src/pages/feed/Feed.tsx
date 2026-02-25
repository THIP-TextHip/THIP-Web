import { useState, useEffect, useCallback, useRef } from 'react';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import MainHeader from '@/components/common/MainHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import writefab from '../../assets/common/writefab.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTotalFeeds } from '@/api/feeds/getTotalFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import { useSocialLoginToken } from '@/hooks/useSocialLoginToken';
import { useFeedCache, writeFeedCache } from '@/hooks/useFeedCache';
import { Container } from './Feed.styled';
import type { PostData } from '@/types/post';

const tabs = ['피드', '내 피드'];

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { waitForToken } = useSocialLoginToken();
  const { initialCache } = useFeedCache();

  const initialTabFromState = (location.state as { initialTab?: string } | null)?.initialTab;
  const isRestoringFromCache = initialCache !== null && !initialTabFromState;

  useEffect(() => {
    if (initialTabFromState) navigate('.', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeTab, setActiveTab] = useState<string>(
    initialTabFromState ?? (isRestoringFromCache ? initialCache!.activeTab : tabs[0]),
  );

  const [totalFeedPosts, setTotalFeedPosts] = useState<PostData[]>(
    isRestoringFromCache ? initialCache!.totalFeedPosts : [],
  );
  const [totalNextCursor, setTotalNextCursor] = useState<string>(
    isRestoringFromCache ? initialCache!.totalNextCursor : '',
  );
  const [totalIsLast, setTotalIsLast] = useState(
    isRestoringFromCache ? initialCache!.totalIsLast : false,
  );
  const [totalLoading, setTotalLoading] = useState(false);

  const [myFeedPosts, setMyFeedPosts] = useState<PostData[]>(
    isRestoringFromCache ? initialCache!.myFeedPosts : [],
  );
  const [myNextCursor, setMyNextCursor] = useState<string>(
    isRestoringFromCache ? initialCache!.myNextCursor : '',
  );
  const [myIsLast, setMyIsLast] = useState(isRestoringFromCache ? initialCache!.myIsLast : false);
  const [myLoading, setMyLoading] = useState(false);

  const [tabLoading, setTabLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isRestoringFromCache);

  const skipFirstFetchRef = useRef(isRestoringFromCache);
  const skipScrollResetRef = useRef(isRestoringFromCache);

  const loadTotalFeeds = useCallback(async (cursor?: string) => {
    try {
      setTotalLoading(true);
      const response = await getTotalFeeds(cursor ? { cursor } : undefined);
      setTotalFeedPosts(prev => {
        if (!cursor) return response.data.feedList;
        const existingIds = new Set(prev.map(p => p.feedId));
        return [...prev, ...response.data.feedList.filter(p => !existingIds.has(p.feedId))];
      });
      setTotalNextCursor(response.data.nextCursor);
      setTotalIsLast(response.data.isLast);
    } catch (error) {
      console.error('전체 피드 로드 실패:', error);
    } finally {
      setTotalLoading(false);
    }
  }, []);

  const loadMyFeeds = useCallback(async (cursor?: string) => {
    try {
      setMyLoading(true);
      const response = await getMyFeeds(cursor ? { cursor } : undefined);
      setMyFeedPosts(prev =>
        cursor ? [...prev, ...response.data.feedList] : response.data.feedList,
      );
      setMyNextCursor(response.data.nextCursor);
      setMyIsLast(response.data.isLast);
    } catch (error) {
      console.error('내 피드 로드 실패:', error);
    } finally {
      setMyLoading(false);
    }
  }, []);

  useEffect(() => {
    if (skipFirstFetchRef.current) {
      skipFirstFetchRef.current = false;
      return;
    }

    const load = async () => {
      await waitForToken();
      setTabLoading(true);
      try {
        if (activeTab === '피드') await loadTotalFeeds();
        else await loadMyFeeds();
      } finally {
        setTabLoading(false);
        setInitialLoading(false);
      }
    };

    load();
  }, [activeTab, waitForToken, loadTotalFeeds, loadMyFeeds]);

  const loadMoreFeeds = useCallback(() => {
    if (activeTab === '피드') {
      if (!totalIsLast && !totalLoading && totalNextCursor) loadTotalFeeds(totalNextCursor);
    } else {
      if (!myIsLast && !myLoading && myNextCursor) loadMyFeeds(myNextCursor);
    }
  }, [
    activeTab,
    totalIsLast,
    totalLoading,
    totalNextCursor,
    myIsLast,
    myLoading,
    myNextCursor,
    loadTotalFeeds,
    loadMyFeeds,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const isLoading = activeTab === '피드' ? totalLoading : myLoading;
      const isLast = activeTab === '피드' ? totalIsLast : myIsLast;
      if (isLoading || isLast) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 200) loadMoreFeeds();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, totalLoading, myLoading, totalIsLast, myIsLast, loadMoreFeeds]);

  useEffect(() => {
    if (skipScrollResetRef.current) {
      skipScrollResetRef.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    if (initialLoading || tabLoading || totalFeedPosts.length === 0) return;
    writeFeedCache({
      activeTab,
      totalFeedPosts,
      myFeedPosts,
      totalNextCursor,
      myNextCursor,
      totalIsLast,
      myIsLast,
    });
  }, [
    activeTab,
    totalFeedPosts,
    myFeedPosts,
    totalNextCursor,
    myNextCursor,
    totalIsLast,
    myIsLast,
    initialLoading,
    tabLoading,
  ]);

  const isLoading = initialLoading || tabLoading;

  return (
    <Container>
      <MainHeader
        type="home"
        leftButtonClick={() => navigate('/feed/search')}
        rightButtonClick={() => navigate('/notice')}
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {isLoading ? (
        <LoadingSpinner size="large" fullHeight={true} />
      ) : activeTab === '피드' ? (
        <TotalFeed showHeader={true} posts={totalFeedPosts} isMyFeed={false} isLast={totalIsLast} />
      ) : (
        <MyFeed showHeader={false} posts={myFeedPosts} isMyFeed={true} isLast={myIsLast} />
      )}
      <NavBar src={writefab} path="/post/create" />
    </Container>
  );
};

export default Feed;
