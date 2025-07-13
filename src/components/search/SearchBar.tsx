import styled from '@emotion/styled';
import searchIcon from '../../assets/searchBar/search.svg';
import deleteIcon from '../../assets/searchBar/delete.svg';
import { IconButton } from '../common/IconButton';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  onClick?: () => void;
  onSearch?: () => void;
}

const SearchBar = ({ placeholder, value, onChange, onClick, onSearch }: SearchBarProps) => {
  return (
    <SearchBarWrapper onClick={onClick}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch?.();
          }
        }}
      />
      <IconButtonContainer>
        {value && <IconButton src={deleteIcon} alt="입력 지우기" onClick={() => onChange?.('')} />}
        <IconButton src={searchIcon} alt="검색" onClick={() => onSearch?.()} />
      </IconButtonContainer>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: var(--color-darkgrey-main);
  border-radius: 12px;
  width: calc(100% - 40px);
  margin: 76px 20px 16px 20px;
  padding: 16px 20px;
  box-sizing: border-box;

  .delete-btn {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }
  &:focus-within .delete-btn {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  padding: 8px 0;
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-grey-300);
  }
  &:focus {
    outline: none;
  }
`;
const IconButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;
