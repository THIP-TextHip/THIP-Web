import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import NavBar from '../../components/common/NavBar';
import TabBar from '../../components/feed/TabBar';
import MyFeed from '../../components/feed/MyFeed';
import TotalFeed from '../../components/feed/TotalFeed';
import MainHeader from '@/components/common/MainHeader';
import writefab from '../../assets/common/writefab.svg';
import { mockPosts } from '@/data/postData';
import { useNavigate } from 'react-router-dom';
import { getTotalFeeds } from '@/api/feeds/getTotalFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import type { PostData } from '@/types/post';

const Container = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
`;

const tabs = ['피드', '내 피드'];

const Feed = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // 전체 피드 상태
  const [totalFeedPosts, setTotalFeedPosts] = useState<PostData[]>([]);
  const [totalLoading, setTotalLoading] = useState(false);
  const [totalNextCursor, setTotalNextCursor] = useState<string>('');
  const [totalIsLast, setTotalIsLast] = useState(false);

  // 내 피드 상태
  const [myFeedPosts, setMyFeedPosts] = useState<PostData[]>([]);
  const [myLoading, setMyLoading] = useState(false);
  const [myNextCursor, setMyNextCursor] = useState<string>('');
  const [myIsLast, setMyIsLast] = useState(false);

  const handleSearchButton = () => {
    navigate('/feed/search');
  };

  // 전체 피드 로드 함수
  const loadTotalFeeds = async (cursor?: string) => {
    try {
      setTotalLoading(true);
      const response = await getTotalFeeds(cursor ? { cursor } : undefined);

      if (cursor) {
        // 다음 페이지 데이터 추가
        setTotalFeedPosts(prev => [...prev, ...response.data.feedList]);
      } else {
        // 첫 페이지 데이터 설정
        setTotalFeedPosts(response.data.feedList);
      }

      setTotalNextCursor(response.data.nextCursor);
      setTotalIsLast(response.data.isLast);
    } catch (error) {
      console.error('전체 피드 로드 실패:', error);
      // 에러 시 mockPosts 사용 (fallback)
      setTotalFeedPosts(mockPosts);
    } finally {
      setTotalLoading(false);
    }
  };

  // 내 피드 로드 함수
  const loadMyFeeds = async (cursor?: string) => {
    try {
      setMyLoading(true);
      const response = await getMyFeeds(cursor ? { cursor } : undefined);

      if (cursor) {
        // 다음 페이지 데이터 추가
        setMyFeedPosts(prev => [...prev, ...response.data.feedList]);
      } else {
        // 첫 페이지 데이터 설정
        setMyFeedPosts(response.data.feedList);
      }

      setMyNextCursor(response.data.nextCursor);
      setMyIsLast(response.data.isLast);
    } catch (error) {
      console.error('내 피드 로드 실패:', error);
      // 에러 시 mockPosts 사용 (fallback)
      setMyFeedPosts(mockPosts);
    } finally {
      setMyLoading(false);
    }
  };

  // 다음 페이지 로드 (무한 스크롤용)
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

  // 무한스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      const isLoading = activeTab === '피드' ? totalLoading : myLoading;
      const isLastPage = activeTab === '피드' ? totalIsLast : myIsLast;

      // 로딩 중이거나 마지막 페이지면 return
      if (isLoading || isLastPage) return;

      // 스크롤이 하단 근처에 도달했는지 확인 (하단에서 200px 이전)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreFeeds();
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, totalLoading, myLoading, totalIsLast, myIsLast, loadMoreFeeds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    // 탭별로 API 호출
    if (activeTab === '피드') {
      loadTotalFeeds();
    } else if (activeTab === '내 피드') {
      loadMyFeeds();
    }
  }, [activeTab]);

  return (
    <Container>
      <MainHeader type="home" leftButtonClick={handleSearchButton} />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === '피드' ? (
        <>
          <TotalFeed showHeader={true} posts={totalFeedPosts} isMyFeed={false} />
        </>
      ) : (
        <>
          <MyFeed showHeader={false} posts={myFeedPosts} isMyFeed={true} />
        </>
      )}
      <NavBar src={writefab} path="/" />
    </Container>
  );
};

export default Feed;
