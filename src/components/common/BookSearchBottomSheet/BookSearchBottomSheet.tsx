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
const mockBooks: Book[] = [
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
  {
    id: 4,
    title: '토마토 컵라면',
    author: '작가명',
    cover: '/src/assets/books/tomato.svg',
  },
  {
    id: 5,
    title: '사슴',
    author: '작가명',
    cover: '/src/assets/books/deer.svg',
  },
  {
    id: 6,
    title: '호르몬 체인지',
    author: '작가명',
    cover: '/src/assets/books/hormone.svg',
  },
  {
    id: 7,
    title: '단 한번의 삶',
    author: '작가명',
    cover: '/src/assets/books/life.svg',
  },
];

const BookSearchBottomSheet = ({ isOpen, onClose, onSelectBook }: BookSearchBottomSheetProps) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(mockBooks);
  const [activeTab, setActiveTab] = useState<TabType>('saved');

  // Effects
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(mockBooks);
    } else {
      const filtered = mockBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery]);

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

  return (
    <Overlay isVisible={isOpen} onClick={handleOverlayClick}>
      <BottomSheetContainer isVisible={isOpen}>
        <Content>
          {/* 검색 영역 */}
          <SearchContainer>
            <SearchInputWrapper>
              <SearchInput
                placeholder="책 제목, 작가명을 검색해보세요."
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

          {/* 탭 영역 */}
          <TabContainer>
            <Tab active={activeTab === 'saved'} onClick={() => setActiveTab('saved')}>
              저장한 책
            </Tab>
            <Tab active={activeTab === 'group'} onClick={() => setActiveTab('group')}>
              모임 책
            </Tab>
          </TabContainer>

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
