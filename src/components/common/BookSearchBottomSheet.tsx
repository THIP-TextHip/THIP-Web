import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, semanticColors, typography } from '../../styles/global/global';
import closeIcon from '../../assets/group/close.svg';
import searchIcon from '../../assets/group/search.svg';
import whitesearchIcon from '../../assets/group/search_white.svg';

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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
  max-height: 80vh;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 20px;
  height: calc(80vh - 36px);
  overflow-y: auto;
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

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const BookItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${semanticColors.background.card};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin: 0 -8px;
    padding: 16px 8px;
  }
`;

const BookCover = styled.div`
  width: 60px;
  height: 80px;
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
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  line-height: 1.4;
`;

const BookAuthor = styled.div`
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
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
];

interface BookSearchBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: any) => void;
}

const BookSearchBottomSheet = ({ isOpen, onClose, onSelectBook }: BookSearchBottomSheetProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);

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
                  <BookAuthor>{book.author}</BookAuthor>
                </BookInfo>
              </BookItem>
            ))}
          </BookList>
        </Content>
      </BottomSheetContainer>
    </Overlay>
  );
};

export default BookSearchBottomSheet;
