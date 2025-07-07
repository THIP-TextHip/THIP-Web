import styled from '@emotion/styled';
import searchIcon from '../../assets/searchBar/search.svg';
import { IconButton } from './IconButton';

interface SearchBarProps {
  placeholder: string;
}

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
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  padding: 8px 12px;
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-grey.300);
  }
  &:focus {
    outline: none;
  }
`;

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <SearchBarWrapper>
      <Input placeholder={placeholder} />
      <IconButton src={searchIcon} alt="검색" />
    </SearchBarWrapper>
  );
};

export default SearchBar;
