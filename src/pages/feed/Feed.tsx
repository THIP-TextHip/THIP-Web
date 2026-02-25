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
import { Container } from './Feed.styled';
import type { PostData } from '@/types/post';

const tabs = ['피드', '내 피드'];

const FEED_CACHE_KEY = 'feed_page_cache';
const FEED_CACHE_TTL = 10 * 60 * 1000;

interface FeedCache {
  activeTab: string;
  totalFeedPosts: PostData[];
  myFeedPosts: PostData[];
  totalNextCursor: string;
  myNextCursor: string;
  totalIsLast: boolean;
  myIsLast: boolean;
  scrollY: number;
  timestamp: number;
}

function getInitialFeedCache(): FeedCache | null {
  try {
    const raw = sessionStorage.getItem(FEED_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as FeedCache;
    if (Date.now() - cache.timestamp < FEED_CACHE_TTL) return cache;
  } catch {
    // ignore
  }
  return null;
}

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTabFromState = (location.state as { initialTab?: string } | null)?.initialTab;

  const [initialCache] = useState<FeedCache | null>(getInitialFeedCache);
  const shouldRestoreFromCache = initialCache !== null && !initialTabFromState;

  const [activeTab, setActiveTab] = useState<string>(
    initialTabFromState ?? (shouldRestoreFromCache ? initialCache!.activeTab : tabs[0]),
  );

  const { waitForToken } = useSocialLoginToken();

  useEffect(() => {
    if (initialTabFromState) {
      navigate('.', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [totalFeedPosts, setTotalFeedPosts] = useState<PostData[]>(
    shouldRestoreFromCache ? initialCache!.totalFeedPosts : [],
  );
  const [totalLoading, setTotalLoading] = useState(false);
  const [totalNextCursor, setTotalNextCursor] = useState<string>(
    shouldRestoreFromCache ? initialCache!.totalNextCursor : '',
  );
  const [totalIsLast, setTotalIsLast] = useState(
    shouldRestoreFromCache ? initialCache!.totalIsLast : false,
  );

  const [myFeedPosts, setMyFeedPosts] = useState<PostData[]>(
    shouldRestoreFromCache ? initialCache!.myFeedPosts : [],
  );
  const [myLoading, setMyLoading] = useState(false);
  const [myNextCursor, setMyNextCursor] = useState<string>(
    shouldRestoreFromCache ? initialCache!.myNextCursor : '',
  );
  const [myIsLast, setMyIsLast] = useState(shouldRestoreFromCache ? initialCache!.myIsLast : false);

  const [tabLoading, setTabLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!shouldRestoreFromCache);

  const cacheUsed = useRef(shouldRestoreFromCache);
  const skipScrollResetRef = useRef(shouldRestoreFromCache);
  const scrollRestoreRef = useRef<number | null>(
    shouldRestoreFromCache ? initialCache!.scrollY : null,
  );

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
    if (skipScrollResetRef.current) {
      skipScrollResetRef.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    if (scrollRestoreRef.current === null) return;
    const y = scrollRestoreRef.current;
    scrollRestoreRef.current = null;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    });
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const raw = sessionStorage.getItem(FEED_CACHE_KEY);
        if (raw) {
          try {
            const cache = JSON.parse(raw) as FeedCache;
            cache.scrollY = window.scrollY;
            sessionStorage.setItem(FEED_CACHE_KEY, JSON.stringify(cache));
          } catch {
            // ignore
          }
        }
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (initialLoading || tabLoading || totalFeedPosts.length === 0) return;
    const cache: FeedCache = {
      activeTab,
      totalFeedPosts,
      myFeedPosts,
      totalNextCursor,
      myNextCursor,
      totalIsLast,
      myIsLast,
      scrollY: window.scrollY,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(FEED_CACHE_KEY, JSON.stringify(cache));
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

  useEffect(() => {
    if (cacheUsed.current) {
      cacheUsed.current = false;
      return;
    }

    const loadFeedsWithToken = async () => {
      await waitForToken();

      setTabLoading(true);

      try {
        if (activeTab === '피드') {
          await loadTotalFeeds();
        } else if (activeTab === '내 피드') {
          await loadMyFeeds();
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
        <LoadingSpinner size="large" fullHeight={true} />
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
