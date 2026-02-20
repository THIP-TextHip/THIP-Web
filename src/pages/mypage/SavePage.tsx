import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import TitleHeader from '../../components/common/TitleHeader';
import TabBar from '@/components/feed/TabBar';
import FeedPost from '@/components/feed/FeedPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import save from '../../assets/feed/save.svg';
import activeSave from '../../assets/feed/activeSave.svg';
import { getSavedBooksInMy, type SavedBookInMy } from '@/api/books/getSavedBooksInMy';
import { getSavedFeedsInMy, type SavedFeedInMy } from '@/api/feeds/getSavedFeedsInMy';
import { postSaveBook } from '@/api/books/postSaveBook';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Skeleton, { FeedPostSkeleton } from '@/shared/ui/Skeleton';
import {
  Wrapper,
  FeedContainer,
  EmptyState,
  BookList,
  BookItem,
  Cover,
  LeftSection,
  BookInfo,
  Title,
  Subtitle,
  SaveIcon,
  SkeletonWrapper,
  BookSkeletonItem,
  BookSkeletonLeft,
} from './SavePage.styled';

const tabs = ['피드', '책'];

const SavePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [savedFeeds, setSavedFeeds] = useState<SavedFeedInMy[]>([]);
  const [feedNextCursor, setFeedNextCursor] = useState<string | null>(null);
  const [feedIsLast, setFeedIsLast] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);

  const [savedBooks, setSavedBooks] = useState<SavedBookInMy[]>([]);
  const [bookNextCursor, setBookNextCursor] = useState<string | null>(null);
  const [bookIsLast, setBookIsLast] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const feedObserverRef = useRef<HTMLDivElement>(null);
  const bookObserverRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate('/mypage');
  };

  const loadSavedBooks = useCallback(async (cursor: string | null = null) => {
    try {
      setBookLoading(true);
      const response = await getSavedBooksInMy(cursor);

      if (cursor === null) {
        setSavedBooks(response.data.bookList);
      } else {
        setSavedBooks(prev => [...prev, ...response.data.bookList]);
      }

      setBookNextCursor(response.data.nextCursor);
      setBookIsLast(response.data.isLast);
    } catch (error) {
      console.error('저장된 책 목록 로드 실패:', error);
    } finally {
      setBookLoading(false);
    }
  }, []);

  const loadSavedFeeds = useCallback(async (cursor: string | null = null) => {
    try {
      setFeedLoading(true);
      const response = await getSavedFeedsInMy(cursor);

      if (cursor === null) {
        setSavedFeeds(response.data.feedList);
      } else {
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

  const loadMoreBooks = useCallback(async () => {
    if (!bookNextCursor || bookIsLast || bookLoading) return;

    try {
      await loadSavedBooks(bookNextCursor);
    } catch (error) {
      console.error('책 추가 로드 실패:', error);
    }
  }, [bookNextCursor, bookIsLast, bookLoading, loadSavedBooks]);

  const lastBookElementCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (bookLoading || bookIsLast) return;

      if (node) {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !bookLoading && !bookIsLast) {
            loadMoreBooks();
          }
        });

        observer.observe(node);
      }
    },
    [bookLoading, bookIsLast, loadMoreBooks],
  );

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setInitialLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [feedsResponse, booksResponse] = await Promise.all([
          getSavedFeedsInMy(null),
          getSavedBooksInMy(),
          minLoadingTime,
        ]);

        setSavedFeeds(feedsResponse.data.feedList);
        setFeedNextCursor(feedsResponse.data.nextCursor);
        setFeedIsLast(feedsResponse.data.isLast);

        setSavedBooks(booksResponse.data.bookList);
        setBookNextCursor(booksResponse.data.nextCursor);
        setBookIsLast(booksResponse.data.isLast);
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadAllData();
  }, []);

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

      if (!newSaveState) {
        await loadSavedBooks();
      } else {
        setSavedBooks(prev =>
          prev.map(book => (book.isbn === isbn ? { ...book, isSaved: newSaveState } : book)),
        );
      }
    } catch (error) {
      console.error('저장 토글 실패:', error);
    }
  };

  const handleFeedSaveToggle = async (feedId: number, newSaveState: boolean) => {
    try {
      if (!newSaveState) {
        setSavedFeeds(prev => prev.filter(feed => feed.feedId !== feedId));
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
        activeTab === '피드' ? (
          <SkeletonWrapper>
            {Array.from({ length: 3 }).map((_, index) => (
              <FeedPostSkeleton key={index} />
            ))}
          </SkeletonWrapper>
        ) : (
          <SkeletonWrapper>
            {Array.from({ length: 5 }).map((_, index) => (
              <BookSkeletonItem key={index}>
                <BookSkeletonLeft>
                  <Skeleton.Box width={80} height={107} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Skeleton.Text width={120} height={16} />
                    <Skeleton.Text width={100} height={12} />
                  </div>
                </BookSkeletonLeft>
                <Skeleton.Box width={24} height={24} />
              </BookSkeletonItem>
            ))}
          </SkeletonWrapper>
        )
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
            {savedBooks.map((book, index) => (
              <BookItem
                key={book.bookId}
                ref={index === savedBooks.length - 1 ? lastBookElementCallback : null}
              >
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
            {/* 무한스크롤을 위한 observer 요소 */}
            {!bookIsLast && (
              <div ref={bookObserverRef} style={{ height: '20px' }}>
                {bookLoading && <LoadingSpinner fullHeight={false} size="small" />}
              </div>
            )}
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

export default SavePage;
