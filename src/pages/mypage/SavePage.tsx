import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import TitleHeader from '../../components/common/TitleHeader';
import TabBar from '@/components/feed/TabBar';
import FeedPost from '@/components/feed/FeedPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import save from '../../assets/feed/save.svg';
import activeSave from '../../assets/feed/activeSave.svg';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { getSavedBooksInMy, type SavedBookInMy } from '@/api/books/getSavedBooksInMy';
import { getSavedFeedsInMy, type SavedFeedInMy } from '@/api/feeds/getSavedFeedsInMy';
import { postSaveBook } from '@/api/books/postSaveBook';

import LoadingSpinner from '@/components/common/LoadingSpinner';

const tabs = ['피드', '책'];

const SavePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // 피드 관련 상태
  const [savedFeeds, setSavedFeeds] = useState<SavedFeedInMy[]>([]);
  const [feedNextCursor, setFeedNextCursor] = useState<string | null>(null);
  const [feedIsLast, setFeedIsLast] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);

  // 책 관련 상태
  const [savedBooks, setSavedBooks] = useState<SavedBookInMy[]>([]);

  // 초기 로딩 상태
  const [initialLoading, setInitialLoading] = useState(true);

  // Intersection Observer ref
  const feedObserverRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate('/mypage');
  };

  // 저장된 책 목록 로드 함수
  const loadSavedBooks = useCallback(async () => {
    try {
      const response = await getSavedBooksInMy();
      setSavedBooks(response.data.bookList);
    } catch (error) {
      console.error('저장된 책 목록 로드 실패:', error);
    }
  }, []);

  // 저장된 피드 목록 로드 함수
  const loadSavedFeeds = useCallback(async (cursor: string | null = null) => {
    try {
      setFeedLoading(true);
      const response = await getSavedFeedsInMy(cursor);

      if (cursor === null) {
        // 첫 로드
        setSavedFeeds(response.data.feedList);
      } else {
        // 추가 로드
        setSavedFeeds(prev => [...prev, ...response.data.feedList]);
      }

      setFeedNextCursor(response.data.nextCursor);
      setFeedIsLast(response.data.isLast);
    } catch (error) {
      console.error('저장된 피드 로드 실패:', error);
    } finally {
      setFeedLoading(false);
    }
  }, []);

  // 페이지 진입 시 모든 데이터 로드 (한 번만 실행)
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setInitialLoading(true);

        // 두 API를 병렬로 호출
        const [feedsResponse, booksResponse] = await Promise.all([
          getSavedFeedsInMy(null),
          getSavedBooksInMy(),
        ]);

        // 피드 데이터 설정
        setSavedFeeds(feedsResponse.data.feedList);
        setFeedNextCursor(feedsResponse.data.nextCursor);
        setFeedIsLast(feedsResponse.data.isLast);

        // 책 데이터 설정
        setSavedBooks(booksResponse.data.bookList);
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadAllData();
  }, []); // 빈 의존성 배열로 변경

  // Intersection Observer 설정 (피드)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !feedIsLast && !feedLoading && feedNextCursor) {
            loadSavedFeeds(feedNextCursor);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (feedObserverRef.current) {
      observer.observe(feedObserverRef.current);
    }

    return () => observer.disconnect();
  }, [feedIsLast, feedLoading, feedNextCursor, loadSavedFeeds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleSaveToggle = async (isbn: string) => {
    try {
      const currentBook = savedBooks.find(book => book.isbn === isbn);
      if (!currentBook) return;

      const newSaveState = !currentBook.isSaved;
      await postSaveBook(isbn, newSaveState);

      // 저장 취소인 경우 저장된 책 목록을 다시 불러옴
      if (!newSaveState) {
        await loadSavedBooks();
      } else {
        // 저장인 경우 로컬 상태만 업데이트
        setSavedBooks(prev =>
          prev.map(book => (book.isbn === isbn ? { ...book, isSaved: newSaveState } : book)),
        );
      }

      console.log('저장 토글:', isbn, newSaveState);
    } catch (error) {
      console.error('저장 토글 실패:', error);
    }
  };

  // 피드 저장 토글 처리
  const handleFeedSaveToggle = async (feedId: number, newSaveState: boolean) => {
    try {
      if (!newSaveState) {
        // 저장 취소인 경우 리스트에서 제거
        setSavedFeeds(prev => prev.filter(feed => feed.feedId !== feedId));
        console.log('피드 저장 취소 완료:', feedId);
      }
    } catch (error) {
      console.error('피드 저장 상태 변경 실패:', error);
    }
  };

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBack}
        title="저장"
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {initialLoading ? (
        <LoadingSpinner fullHeight={true} size="large" />
      ) : activeTab === '피드' ? (
        <>
          {savedFeeds.length > 0 ? (
            <FeedContainer>
              {savedFeeds.map((feed, index) => (
                <FeedPost
                  key={feed.feedId}
                  showHeader={true}
                  isMyFeed={false}
                  isLast={index === savedFeeds.length - 1}
                  onSaveToggle={handleFeedSaveToggle}
                  {...feed}
                />
              ))}
              {/* 무한스크롤을 위한 observer 요소 */}
              {!feedIsLast && (
                <div ref={feedObserverRef} style={{ height: '20px' }}>
                  {feedLoading && <LoadingSpinner fullHeight={false} size="small" />}
                </div>
              )}
            </FeedContainer>
          ) : (
            <EmptyState>
              <div className="title">아직 저장한 피드가 없어요</div>
              <div className="sub-title">마음에 드는 책을 THIP 해보세요!</div>
            </EmptyState>
          )}
        </>
      ) : savedBooks.length > 0 ? (
        <>
          <BookList>
            {savedBooks.map(book => (
              <BookItem key={book.bookId}>
                <LeftSection>
                  <Cover src={book.bookImageUrl} alt={`${book.bookTitle} 커버`} />
                  <BookInfo>
                    <Title>{book.bookTitle}</Title>
                    <Subtitle>
                      {book.authorName} 저 · {book.publisher}
                    </Subtitle>
                  </BookInfo>
                </LeftSection>
                <SaveIcon onClick={() => handleSaveToggle(book.isbn)}>
                  <img
                    src={book.isSaved ? activeSave : save}
                    alt={book.isSaved ? '저장됨' : '저장'}
                  />
                </SaveIcon>
              </BookItem>
            ))}
          </BookList>
        </>
      ) : (
        <EmptyState>
          <div className="title">아직 저장한 책이 없어요</div>
          <div className="sub-title">마음에 드는 책을 THIP 해보세요!</div>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #121212;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  min-height: 100%;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 20px;
  gap: 8px;
  flex: 1;

  .title {
    color: ${colors.white};
    text-align: center;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 24px;
  }

  .sub-title {
    color: ${colors.grey[100]};
    text-align: center;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: normal;
  }
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  padding-top: 32px;
  margin: 0 auto;
  width: 100%;
`;

const BookItem = styled.div`
  width: 94.8%;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid ${colors.darkgrey.dark};
  padding: 12px 20px;

  &:last-child {
    border-bottom: none;
  }
  justify-content: space-between;
`;

const Cover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.white};
`;

const Subtitle = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[200]};
  margin-top: 8px;
`;

const SaveIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default SavePage;
