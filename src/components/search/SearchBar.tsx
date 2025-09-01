import styled from '@emotion/styled';
import searchIcon from '../../assets/searchBar/search.svg';
import deleteIcon from '../../assets/searchBar/delete.svg';
import { IconButton } from '../common/IconButton';
import { useState } from 'react';
import type React from 'react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  onClick?: () => void;
  onSearch?: () => void;
  isSearched?: boolean;
}

const SearchBar = ({
  placeholder,
  value,
  onChange,
  onClick,
  onSearch,
  isSearched,
}: SearchBarProps) => {
  const [isComposing, setIsComposing] = useState(false);
  return (
    <SearchBarWrapper onClick={onClick}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            const composing = e.nativeEvent.isComposing || isComposing;
            if (composing) return;
            onSearch?.();
          }
        }}
      />
      <IconButtonContainer>
        {value && !isSearched && (
          <IconButton src={deleteIcon} alt="입력 지우기" onClick={() => onChange?.('')} />
        )}
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
  margin: 16px 20px;
  padding: 8px 12px;
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
  padding: 8px 0;
  box-sizing: border-box;
  caret-color: var(--color-neongreen);

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
