import { useEffect, useRef, useCallback } from 'react';
import {
  BookList as StyledBookList,
  BookItem,
  BookCover,
  BookInfo,
  BookTitle,
  LoadingContainer,
  LoadingText,
} from './BookSearchBottomSheet.styled';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
}

interface BookListProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
  onLoadMore?: () => Promise<void>;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  isSearchMode?: boolean;
}

const BookList = ({ 
  books, 
  onBookSelect, 
  onLoadMore, 
  hasNextPage = false, 
  isLoadingMore = false,
  isSearchMode = false 
}: BookListProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  // 무한스크롤을 위한 Intersection Observer 설정
  const lastBookElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && onLoadMore && isSearchMode) {
        onLoadMore();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasNextPage, onLoadMore, isSearchMode]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <StyledBookList>
      {books.map((book, index) => (
        <BookItem 
          key={`${book.id}-${book.isbn}`} 
          onClick={() => onBookSelect(book)}
          ref={index === books.length - 1 ? lastBookElementRef : null}
        >
          <BookCover>
            <img src={book.cover} alt={book.title} onError={handleImageError} />
          </BookCover>
          <BookInfo>
            <BookTitle>{book.title}</BookTitle>
          </BookInfo>
        </BookItem>
      ))}
      
      {/* 검색 모드에서 더 많은 데이터가 있고 로딩 중일 때 로딩 표시 */}
      {isSearchMode && isLoadingMore && (
        <LoadingContainer ref={loadingRef}>
          <LoadingText>더 많은 책을 불러오는 중...</LoadingText>
        </LoadingContainer>
      )}
    </StyledBookList>
  );
};

export default BookList;
