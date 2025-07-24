import { useState, useEffect } from 'react';
import closeIcon from '../../../assets/group/close.svg';
import whitesearchIcon from '../../../assets/group/search_white.svg';
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
} from './BookSearchBottomSheet.styled.ts';

// Types
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

interface BookSearchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: Book) => void;
}

type TabType = 'saved' | 'group';

// Mock Data
const mockSavedBooks: Book[] = [
  {
    id: 1,
    title: '토마토 컵라면',
    author: '작가명',
    cover: '/src/assets/books/tomato.svg',
  },
  {
    id: 2,
    title: '사슴',
    author: '작가명',
    cover: '/src/assets/books/deer.svg',
  },
  {
    id: 3,
    title: '호르몬 체인지',
    author: '작가명',
    cover: '/src/assets/books/hormone.svg',
  },
];

const mockGroupBooks: Book[] = [
  {
    id: 4,
    title: '단 한번의 삶',
    author: '작가명',
    cover: '/src/assets/books/life.svg',
  },
  {
    id: 5,
    title: '호르몬 체인지',
    author: '작가명',
    cover: '/src/assets/books/hormone.svg',
  },
  {
    id: 6,
    title: '토마토 컵라면',
    author: '작가명',
    cover: '/src/assets/books/tomato.svg',
  },
];

const BookSearchBottomSheet = ({ isOpen, onClose, onSelectBook }: BookSearchBottomSheetProps) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(mockSavedBooks);
  const [activeTab, setActiveTab] = useState<TabType>('saved');

  // Effects
  useEffect(() => {
    // 현재 활성화된 탭의 책 목록 가져오기
    const currentTabBooks = activeTab === 'saved' ? mockSavedBooks : mockGroupBooks;

    if (searchQuery.trim() === '') {
      // 검색어가 없을 때는 선택된 탭의 전체 목록 표시
      setFilteredBooks(currentTabBooks);
    } else {
      // 검색어가 있을 때는 선택된 탭 내에서만 검색
      const filtered = currentTabBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, activeTab]);

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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // 탭 변경 시 현재 검색어로 새로운 탭에서 다시 검색
    const newTabBooks = tab === 'saved' ? mockSavedBooks : mockGroupBooks;

    if (searchQuery.trim() === '') {
      setFilteredBooks(newTabBooks);
    } else {
      const filtered = newTabBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  };

  // 검색어가 없을 때만 탭 표시
  const showTabs = searchQuery.trim() === '';

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

          {/* 탭 영역 - 검색어가 없을 때만 표시 */}
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
          </BookListContainer>
        </Content>
      </BottomSheetContainer>
    </Overlay>
  );
};

export default BookSearchBottomSheet;
