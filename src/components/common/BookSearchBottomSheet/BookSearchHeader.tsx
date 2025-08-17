import closeIcon from '../../../assets/group/close.svg';
import whitesearchIcon from '../../../assets/group/search_white.svg';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  ButtonGroup,
  IconButton,
} from './BookSearchBottomSheet.styled';

interface BookSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

const BookSearchHeader = ({
  searchQuery,
  onSearchChange,
  onSearch,
  onClear,
}: BookSearchHeaderProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchInput
          placeholder="책 제목을 검색해보세요."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </SearchInputWrapper>
      <ButtonGroup>
        <IconButton onClick={onClear}>
          <img src={closeIcon} alt="닫기" />
        </IconButton>
        <IconButton onClick={onSearch}>
          <img src={whitesearchIcon} alt="검색" />
        </IconButton>
      </ButtonGroup>
    </SearchContainer>
  );
};

export default BookSearchHeader;
