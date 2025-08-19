import { useState, useEffect } from 'react';
import { getSavedBooks, type SavedBook } from '@/api/books/getSavedBooks';
import { getSearchBooks, convertToSearchedBooks, type SearchedBook } from '@/api/books/getSearchBooks';
import type { Book } from './BookList';
import type { TabType } from './BookSearchTabs';

export const useBookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [groupBooks, setGroupBooks] = useState<SavedBook[]>([]);
  const [searchResults, setSearchResults] = useState<SearchedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // API에서 받은 데이터를 Book 타입으로 변환하는 함수
  const convertSavedBookToBook = (savedBook: SavedBook): Book => ({
    id: savedBook.bookId,
    title: savedBook.bookTitle,
    author: savedBook.authorName,
    cover: savedBook.bookImageUrl,
    isbn: savedBook.isbn,
  });

  // 검색 결과를 Book 타입으로 변환하는 함수
  const convertSearchedBookToBook = (searchedBook: SearchedBook): Book => ({
    id: searchedBook.id,
    title: searchedBook.title,
    author: searchedBook.author,
    cover: searchedBook.coverUrl,
    isbn: searchedBook.isbn,
  });

  // 저장한 책 데이터 가져오기
  const fetchSavedBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getSavedBooks('saved');

      if (response.isSuccess && response.data) {
        setSavedBooks(response.data.bookList);
      } else {
        setError(response.message || '저장한 책을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('저장한 책 조회 오류:', err);
      setError('저장한 책을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 모임 책 데이터 가져오기
  const fetchGroupBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getSavedBooks('joining');

      if (response.isSuccess && response.data) {
        setGroupBooks(response.data.bookList);
      } else {
        setError(response.message || '모임 책을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('모임 책 조회 오류:', err);
      setError('모임 책을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 실제 검색 API 호출 함수
  const performSearch = async (query: string, page: number = 1, isNewSearch: boolean = true) => {
    if (!query.trim()) {
      setSearchResults([]);
      setCurrentPage(1);
      setHasNextPage(false);
      return;
    }

    try {
      if (isNewSearch) {
        setIsLoading(true);
        setCurrentPage(1);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);
      
      const response = await getSearchBooks(query.trim(), page, true);
      
      if (response.isSuccess) {
        const startIndex = isNewSearch ? 0 : searchResults.length;
        const convertedResults = convertToSearchedBooks(response.data.searchResult, startIndex);
        
        if (isNewSearch) {
          setSearchResults(convertedResults);
        } else {
          setSearchResults(prev => [...prev, ...convertedResults]);
        }
        
        setCurrentPage(page);
        setHasNextPage(!response.data.last);
      } else {
        setError(response.message || '검색에 실패했습니다.');
        if (isNewSearch) {
          setSearchResults([]);
        }
      }
    } catch (err) {
      console.error('검색 오류:', err);
      setError('검색 중 오류가 발생했습니다.');
      if (isNewSearch) {
        setSearchResults([]);
      }
    } finally {
      if (isNewSearch) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  // 더 많은 검색 결과 로드
  const loadMoreSearchResults = async () => {
    if (!searchQuery.trim() || isLoadingMore || !hasNextPage) {
      return;
    }
    
    await performSearch(searchQuery.trim(), currentPage + 1, false);
  };

  // 검색어 변경 핸들러 (디바운싱 적용)
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        performSearch(query);
      }, 300);
      setSearchTimeoutId(timeoutId);
    } else {
      setSearchResults([]);
      setError(null);
      setCurrentPage(1);
      setHasNextPage(false);
    }
  };

  // 필터링 로직
  useEffect(() => {
    // 검색어가 있으면 검색 결과를 표시
    if (searchQuery.trim()) {
      const convertedSearchResults = searchResults.map(convertSearchedBookToBook);
      setFilteredBooks(convertedSearchResults);
      return;
    }

    // 검색어가 없으면 저장된 책들을 표시
    const currentTabBooks = activeTab === 'saved' ? savedBooks : groupBooks;
    const convertedBooks = currentTabBooks.map(convertSavedBookToBook);
    setFilteredBooks(convertedBooks);
  }, [searchQuery, activeTab, savedBooks, groupBooks, searchResults]);

  // 탭 변경 핸들러
  const handleTabChange = async (tab: TabType) => {
    setActiveTab(tab);
    setError(null);

    // 탭 변경 시 해당 탭의 데이터가 없으면 API 호출
    if (tab === 'saved' && savedBooks.length === 0) {
      await fetchSavedBooks();
    } else if (tab === 'group' && groupBooks.length === 0) {
      await fetchGroupBooks();
    }
  };

  // 초기 데이터 로드
  const loadInitialData = () => {
    if (activeTab === 'saved' && savedBooks.length === 0) {
      fetchSavedBooks();
    } else if (activeTab === 'group' && groupBooks.length === 0) {
      fetchGroupBooks();
    }
  };

  // 현재 상태 계산
  const isSearchMode = searchQuery.trim() !== '';
  const currentTabBooks = activeTab === 'saved' ? savedBooks : groupBooks;
  const hasBooks = isSearchMode ? searchResults.length > 0 : currentTabBooks.length > 0;
  const showEmptyState = !isLoading && !error && !hasBooks;
  const showTabs = !isSearchMode; // 검색 모드가 아닐 때는 항상 탭 표시

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
    };
  }, [searchTimeoutId]);

  return {
    // State
    searchQuery,
    filteredBooks,
    activeTab,
    isLoading,
    error,
    hasBooks,
    showEmptyState,
    showTabs,
    hasNextPage,
    isLoadingMore,

    // Actions
    setSearchQuery: handleSearchQueryChange,
    handleTabChange,
    loadInitialData,
    performSearch,
    loadMoreSearchResults,
  };
};
