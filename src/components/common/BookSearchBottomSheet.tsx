import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '../../styles/global/global';
import closeIcon from '../../assets/group/close.svg';
import whitesearchIcon from '../../assets/group/search_white.svg';

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

const BottomSheetContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background-color: ${colors.darkgrey.main};
  border-radius: 20px 20px 0 0;
  z-index: 1001;
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.3s ease;
  max-height: 50vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 50vh;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.darkgrey.dark};
  border-radius: 12px;
  padding: 8px 12px;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  flex-shrink: 0;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  flex: 1;
  caret-color: ${semanticColors.text.point.green};

  &::placeholder {
    color: ${semanticColors.text.ghost};
    font-size: ${typography.fontSize.base};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 34px;
  margin-bottom: 24px;
  flex-shrink: 0;
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${({ active }) => (active ? semanticColors.text.primary : semanticColors.text.ghost)};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  padding: 8px 0 8px 0;
  cursor: pointer;
  position: relative;

  ${({ active }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${semanticColors.text.primary};
    }
  `}
`;

const BookListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: -16px;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.grey[400]};
    border-radius: 2px;
    margin-right: 14px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.white};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.grey[200]};
  }

  /* Firefox 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: ${colors.white} ${colors.grey[400]};
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const BookItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.grey[400]};
  cursor: pointer;
`;

const BookCover = styled.div`
  width: 45px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${semanticColors.background.card};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BookTitle = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.4;
`;

// 임시 책 데이터
const mockBooks = [
  {
    id: 1,
    title: '토마토 컵라면',
    author: '작가명',
    cover: '/src/assets/books/tomato.jpg',
  },
  {
    id: 2,
    title: '사슴',
    author: '작가명',
    cover: '/src/assets/books/deer.jpg',
  },
  {
    id: 3,
    title: '호르몬 체인지',
    author: '작가명',
    cover: '/src/assets/books/hormone.jpg',
  },
  {
    id: 4,
    title: '토마토 컵라면',
    author: '작가명',
    cover: '/src/assets/books/tomato.jpg',
  },
  {
    id: 5,
    title: '사슴',
    author: '작가명',
    cover: '/src/assets/books/deer.jpg',
  },
  {
    id: 6,
    title: '호르몬 체인지',
    author: '작가명',
    cover: '/src/assets/books/hormone.jpg',
  },
  {
    id: 7,
    title: '단 한번의 삶',
    author: '작가명',
    cover: '/src/assets/books/life.jpg',
  },
  {
    id: 8,
    title: '추가 책 1',
    author: '작가명',
    cover: '/src/assets/books/book1.jpg',
  },
  {
    id: 9,
    title: '추가 책 2',
    author: '작가명',
    cover: '/src/assets/books/book2.jpg',
  },
  {
    id: 10,
    title: '추가 책 3',
    author: '작가명',
    cover: '/src/assets/books/book3.jpg',
  },
];

interface BookSearchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: any) => void;
}

const BookSearchBottomSheet = ({ isOpen, onClose, onSelectBook }: BookSearchBottomSheetProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [activeTab, setActiveTab] = useState<'saved' | 'group'>('saved');

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

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBookSelect = (book: any) => {
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

  return (
    <Overlay isVisible={isOpen} onClick={handleOverlayClick}>
      <BottomSheetContainer isVisible={isOpen}>
        <Content>
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
              <IconButton onClick={onClose}>
                <img src={closeIcon} alt="닫기" />
              </IconButton>
              <IconButton onClick={handleSearch}>
                <img src={whitesearchIcon} alt="검색" />
              </IconButton>
            </ButtonGroup>
          </SearchContainer>

          <TabContainer>
            <Tab active={activeTab === 'saved'} onClick={() => setActiveTab('saved')}>
              저장한 책
            </Tab>
            <Tab active={activeTab === 'group'} onClick={() => setActiveTab('group')}>
              모임 책
            </Tab>
          </TabContainer>

          <BookListContainer>
            <BookList>
              {filteredBooks.map(book => (
                <BookItem key={book.id} onClick={() => handleBookSelect(book)}>
                  <BookCover>
                    <img
                      src={book.cover}
                      alt={book.title}
                      onError={e => {
                        // 이미지 로드 실패 시 기본 배경색 유지
                        e.currentTarget.style.display = 'none';
                      }}
                    />
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
