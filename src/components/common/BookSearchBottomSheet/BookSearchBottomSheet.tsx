import { useEffect } from 'react';
import {
  Overlay,
  BottomSheetContainer,
  Content,
  BookListContainer,
} from './BookSearchBottomSheet.styled';
import BookSearchHeader from './BookSearchHeader';
import BookSearchTabs from './BookSearchTabs';
import BookList, { type Book } from './BookList';
import BookSearchStates from './BookSearchStates';
import { useBookSearch } from './useBookSearch';

interface BookSearchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: Book) => void;
}

const BookSearchBottomSheet = ({ isOpen, onClose, onSelectBook }: BookSearchBottomSheetProps) => {
  const {
    searchQuery,
    filteredBooks,
    activeTab,
    isLoading,
    error,
    showEmptyState,
    showTabs,
    hasNextPage,
    isLoadingMore,
    currentTabHasNext,
    currentTabIsLoadingMore,
    setSearchQuery,
    handleTabChange,
    loadInitialData,
    performSearch,
    loadMoreSearchResults,
    loadMoreSavedBooks,
    loadMoreGroupBooks,
  } = useBookSearch();

  // 컴포넌트가 열릴 때 초기 데이터 로드
  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  // 바디 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handlers
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBookSelect = (book: Book) => {
    onSelectBook(book);
    onClose();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const showBookList = !isLoading && !error && !showEmptyState;
  const isSearchMode = searchQuery.trim() !== '';
  
  // 현재 탭에 맞는 무한 스크롤 핸들러 결정
  const getLoadMoreHandler = () => {
    if (isSearchMode) {
      return loadMoreSearchResults;
    }
    return activeTab === 'saved' ? loadMoreSavedBooks : loadMoreGroupBooks;
  };
  
  // 현재 상태에 맞는 무한 스크롤 정보
  const currentHasNextPage = isSearchMode ? hasNextPage : currentTabHasNext;
  const currentIsLoadingMore = isSearchMode ? isLoadingMore : currentTabIsLoadingMore;

  return (
    <Overlay isVisible={isOpen} onClick={handleOverlayClick}>
      <BottomSheetContainer isVisible={isOpen}>
        <Content>
          {/* 검색 헤더 */}
          <BookSearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />

          {/* 탭 영역 */}
          {showTabs && <BookSearchTabs activeTab={activeTab} onTabChange={handleTabChange} />}

          {/* 책 목록 영역 */}
          <BookListContainer>
            <BookSearchStates
              isLoading={isLoading}
              error={error}
              isEmpty={showEmptyState}
              activeTab={activeTab}
              onClose={onClose}
            />

            {showBookList && (
              <BookList 
                books={filteredBooks} 
                onBookSelect={handleBookSelect}
                onLoadMore={getLoadMoreHandler()}
                hasNextPage={currentHasNextPage}
                isLoadingMore={currentIsLoadingMore}
                isSearchMode={isSearchMode}
              />
            )}
          </BookListContainer>
        </Content>
      </BottomSheetContainer>
    </Overlay>
  );
};

export default BookSearchBottomSheet;
