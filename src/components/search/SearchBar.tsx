import searchIcon from '../../assets/searchBar/search.svg';
import deleteIcon from '../../assets/searchBar/delete.svg';
import { IconButton } from '../common/IconButton';
import { useState } from 'react';
import type React from 'react';
import { SearchBarWrapper, Input, IconButtonContainer } from './SearchBar.styled';

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
