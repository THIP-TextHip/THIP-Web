import { useState, useEffect } from 'react';
import { getSavedBooks, type SavedBook } from '@/api/books/getSavedBooks';
import type { Book } from './BookList';
import type { TabType } from './BookSearchTabs';

export const useBookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [groupBooks, setGroupBooks] = useState<SavedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API에서 받은 데이터를 Book 타입으로 변환하는 함수
  const convertSavedBookToBook = (savedBook: SavedBook): Book => ({
    id: savedBook.bookId,
    title: savedBook.bookTitle,
    author: savedBook.authorName,
    cover: savedBook.bookImageUrl,
    isbn: savedBook.isbn,
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

  // 필터링 로직
  useEffect(() => {
    const currentTabBooks = activeTab === 'saved' ? savedBooks : groupBooks;
    const convertedBooks = currentTabBooks.map(convertSavedBookToBook);

    if (searchQuery.trim() === '') {
      setFilteredBooks(convertedBooks);
    } else {
      const filtered = convertedBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, activeTab, savedBooks, groupBooks]);

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
  const currentTabBooks = activeTab === 'saved' ? savedBooks : groupBooks;
  const hasBooks = currentTabBooks.length > 0;
  const showEmptyState = !isLoading && !error && !hasBooks;
  const showTabs = searchQuery.trim() === '' && !showEmptyState;

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

    // Actions
    setSearchQuery,
    handleTabChange,
    loadInitialData,
  };
};
