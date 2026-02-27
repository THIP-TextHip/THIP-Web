import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TitleHeader from '../../components/common/TitleHeader';
import TabBar from '@/components/feed/TabBar';
import FeedPost from '@/components/feed/FeedPost';
import leftArrow from '../../assets/common/leftArrow.svg';
import save from '../../assets/feed/save.svg';
import activeSave from '../../assets/feed/activeSave.svg';
import { getSavedBooksInMy, type SavedBookInMy } from '@/api/books/getSavedBooksInMy';
import { getSavedFeedsInMy, type SavedFeedInMy } from '@/api/feeds/getSavedFeedsInMy';
import { postSaveBook } from '@/api/books/postSaveBook';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
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

  const savedFeeds = useInifinieScroll<SavedFeedInMy>({
    enabled: activeTab === '피드',
    reloadKey: activeTab,
    fetchPage: async cursor => {
      const response = await getSavedFeedsInMy(cursor);
      return {
        items: response.data.feedList,
        nextCursor: response.data.nextCursor || null,
        isLast: response.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

  const savedBooks = useInifinieScroll<SavedBookInMy>({
    enabled: activeTab === '책',
    reloadKey: activeTab,
    fetchPage: async cursor => {
      const response = await getSavedBooksInMy(cursor);
      return {
        items: response.data.bookList,
        nextCursor: response.data.nextCursor || null,
        isLast: response.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

  const handleBack = () => {
    navigate('/mypage');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleSaveToggle = async (isbn: string) => {
    const currentBook = savedBooks.items.find(book => book.isbn === isbn);
    if (!currentBook) return;

    const nextSaved = !currentBook.isSaved;
    const previousBooks = savedBooks.items;

    if (!nextSaved) {
      savedBooks.setItems(prev => prev.filter(book => book.isbn !== isbn));
    } else {
      savedBooks.setItems(prev =>
        prev.map(book => (book.isbn === isbn ? { ...book, isSaved: nextSaved } : book)),
      );
    }

    try {
      const response = await postSaveBook(isbn, nextSaved);
      if (!response.isSuccess) {
        savedBooks.setItems(previousBooks);
      }
    } catch {
      savedBooks.setItems(previousBooks);
    }
  };

  const handleFeedSaveToggle = (feedId: number, newSaveState: boolean) => {
    if (!newSaveState) {
      savedFeeds.setItems(prev => prev.filter(feed => feed.feedId !== feedId));
    }
  };

  const currentList = activeTab === '피드' ? savedFeeds : savedBooks;
  const showInitialLoading = currentList.isLoading && currentList.items.length === 0;

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBack}
        title="저장"
      />
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      {showInitialLoading ? (
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
          {savedFeeds.items.length > 0 ? (
            <FeedContainer>
              {savedFeeds.items.map((feed, index) => (
                <FeedPost
                  key={feed.feedId}
                  showHeader={true}
                  isMyFeed={false}
                  isLast={index === savedFeeds.items.length - 1}
                  onSaveToggle={handleFeedSaveToggle}
                  {...feed}
                />
              ))}
              {!savedFeeds.isLast && <div ref={savedFeeds.sentinelRef} style={{ height: 20 }} />}
              {savedFeeds.isLoadingMore && <LoadingSpinner fullHeight={false} size="small" />}
            </FeedContainer>
          ) : (
            <EmptyState>
              <div className="title">아직 저장한 피드가 없어요</div>
              <div className="sub-title">마음에 드는 책을 THIP 해보세요!</div>
            </EmptyState>
          )}
        </>
      ) : savedBooks.items.length > 0 ? (
        <BookList>
          {savedBooks.items.map(book => (
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
          {!savedBooks.isLast && <div ref={savedBooks.sentinelRef} style={{ height: 20 }} />}
          {savedBooks.isLoadingMore && <LoadingSpinner fullHeight={false} size="small" />}
        </BookList>
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
