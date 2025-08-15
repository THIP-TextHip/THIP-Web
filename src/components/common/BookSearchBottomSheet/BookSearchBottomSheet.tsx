import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../../../assets/group/close.svg';
import whitesearchIcon from '../../../assets/group/search_white.svg';
import { getSavedBooks, type SavedBook } from '@/api/books/getSavedBooks';
import {
  Overlay,
  BottomSheetContainer,
  Content,
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  ButtonGroup,
  IconButton,
  TabContainer,
  Tab,
  BookListContainer,
  BookList,
  BookItem,
  BookCover,
  BookInfo,
  BookTitle,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  EmptyContainer,
  EmptyText,
  ApplyButton,
} from './BookSearchBottomSheet.styled.ts';

// Types
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  isbn: string;
}

interface BookSearchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: Book) => void;
  forceEmpty?: boolean; // 임시방편: 빈 상태 강제 표시
}

type TabType = 'saved' | 'group';

const BookSearchBottomSheet = ({
  isOpen,
  onClose,
  onSelectBook,
  forceEmpty = true,
}: BookSearchBottomSheetProps) => {
  const navigate = useNavigate();

  // State
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

  // 컴포넌트가 열릴 때 초기 데이터 로드
  useEffect(() => {
    if (isOpen && !forceEmpty) {
      if (activeTab === 'saved' && savedBooks.length === 0) {
        fetchSavedBooks();
      } else if (activeTab === 'group' && groupBooks.length === 0) {
        fetchGroupBooks();
      }
    }
  }, [isOpen, activeTab, savedBooks.length, groupBooks.length, forceEmpty]);

  // 필터링 로직
  useEffect(() => {
    if (forceEmpty) {
      setFilteredBooks([]);
      return;
    }

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
  }, [searchQuery, activeTab, savedBooks, groupBooks, forceEmpty]);

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
    // 실제 검색 API 호출 로직
    console.log('검색:', searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleTabChange = async (tab: TabType) => {
    setActiveTab(tab);
    setError(null);

    // 탭 변경 시 해당 탭의 데이터가 없으면 API 호출
    if (!forceEmpty) {
      if (tab === 'saved' && savedBooks.length === 0) {
        await fetchSavedBooks();
      } else if (tab === 'group' && groupBooks.length === 0) {
        await fetchGroupBooks();
      }
    }
  };

  const handleApplyBook = () => {
    navigate('/apply-book');
    onClose();
  };

  // 현재 탭의 책 개수 확인 (임시방편: forceEmpty가 true면 강제로 빈 상태)
  const currentTabBooks = activeTab === 'saved' ? savedBooks : groupBooks;
  const hasBooks = !forceEmpty && currentTabBooks.length > 0;
  const showEmptyState = forceEmpty || (!isLoading && !error && !hasBooks);

  // 검색어가 없을 때만 탭 표시 (단, 빈 상태일 때는 탭 숨김)
  const showTabs = searchQuery.trim() === '' && !showEmptyState;

  return (
    <Overlay isVisible={isOpen} onClick={handleOverlayClick}>
      <BottomSheetContainer isVisible={isOpen}>
        <Content>
          {/* 검색 영역 */}
          <SearchContainer>
            <SearchInputWrapper>
              <SearchInput
                placeholder="책 제목을 검색해보세요."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </SearchInputWrapper>
            <ButtonGroup>
              <IconButton onClick={handleClearSearch}>
                <img src={closeIcon} alt="닫기" />
              </IconButton>
              <IconButton onClick={handleSearch}>
                <img src={whitesearchIcon} alt="검색" />
              </IconButton>
            </ButtonGroup>
          </SearchContainer>

          {/* 탭 영역 - 검색어가 없고 빈 상태가 아닐 때만 표시 */}
          {showTabs && (
            <TabContainer>
              <Tab active={activeTab === 'saved'} onClick={() => handleTabChange('saved')}>
                저장한 책
              </Tab>
              <Tab active={activeTab === 'group'} onClick={() => handleTabChange('group')}>
                모임 책
              </Tab>
            </TabContainer>
          )}

          {/* 책 목록 영역 */}
          <BookListContainer>
            {showEmptyState ? (
              <EmptyContainer>
                <EmptyText>현재 등록된 책이 아닙니다.</EmptyText>
                <EmptyText>원하시는 책을 신청해주세요.</EmptyText>
                <ApplyButton onClick={handleApplyBook}>책 신청하기</ApplyButton>
              </EmptyContainer>
            ) : isLoading ? (
              <LoadingContainer>
                <LoadingText>책 목록을 불러오는 중...</LoadingText>
              </LoadingContainer>
            ) : error ? (
              <ErrorContainer>
                <ErrorText>{error}</ErrorText>
              </ErrorContainer>
            ) : !hasBooks ? (
              <EmptyContainer>
                <EmptyText>
                  {activeTab === 'saved'
                    ? '저장한 책이 없습니다.'
                    : '참여 중인 모임의 책이 없습니다.'}
                </EmptyText>
              </EmptyContainer>
            ) : (
              <BookList>
                {filteredBooks.map(book => (
                  <BookItem key={book.id} onClick={() => handleBookSelect(book)}>
                    <BookCover>
                      <img src={book.cover} alt={book.title} onError={handleImageError} />
                    </BookCover>
                    <BookInfo>
                      <BookTitle>{book.title}</BookTitle>
                    </BookInfo>
                  </BookItem>
                ))}
              </BookList>
            )}
          </BookListContainer>
        </Content>
      </BottomSheetContainer>
    </Overlay>
  );
};

export default BookSearchBottomSheet;
