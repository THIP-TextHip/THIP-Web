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
  showGroupTab?: boolean;
}

const BookSearchBottomSheet = ({
  isOpen,
  onClose,
  onSelectBook,
  showGroupTab = true,
}: BookSearchBottomSheetProps) => {
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
  } = useBookSearch(showGroupTab);

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

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

  const getLoadMoreHandler = () => {
    if (isSearchMode) {
      return loadMoreSearchResults;
    }
    return activeTab === 'saved' ? loadMoreSavedBooks : loadMoreGroupBooks;
  };

  const currentHasNextPage = isSearchMode ? hasNextPage : currentTabHasNext;
  const currentIsLoadingMore = isSearchMode ? isLoadingMore : currentTabIsLoadingMore;

  return (
    <Overlay isVisible={isOpen} onClick={handleOverlayClick}>
      <BottomSheetContainer isVisible={isOpen}>
        <Content>
          <BookSearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />

          {showTabs && (
            <BookSearchTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              showGroupTab={showGroupTab}
            />
          )}

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
