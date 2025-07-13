import NavBar from '@/components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import { BookSearchResult } from '@/components/search/BookSearchResult';
import MostSearchedBooks from '@/components/search/MostSearchedBooks';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import SearchBar from '@/components/search/SearchBar';
import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import leftArrow from '../../assets/common/leftArrow.svg';

export interface SearchedBook {
  id: number;
  title: string;
  author: string;
  publisher: string;
  coverUrl: string;
}

const dummySearchedBook: SearchedBook[] = [
  {
    id: 1,
    title: '채식주의자',
    author: '한강',
    publisher: '창비',
    coverUrl: 'https://image.yes24.com/goods/17122707/XL',
  },
  {
    id: 2,
    title: '채소 마스터 클래스',
    author: '백지혜',
    publisher: '세미콜론',
    coverUrl: 'https://image.yes24.com/goods/109378551/XL',
  },
  {
    id: 3,
    title: '채소 식탁',
    author: '김경민',
    publisher: '래디시',
    coverUrl: 'https://image.yes24.com/goods/117194041/XL',
  },
];
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const [recentSearches, setRecentSearches] = useState<string[]>([
    '딸기12',
    '당근',
    '수박245',
    '참',
    '메론1',
  ]);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsSearched(false);
    setIsSearching(value.trim() !== '');
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    setIsSearching(true);
    setIsSearched(true);
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t !== term);
      return [term, ...filtered].slice(0, 5);
    });
  };

  const handleDelete = (recentSearch: string) => {
    setRecentSearches(prev => prev.filter(t => t !== recentSearch));
  };

  const handleRecentSearchClick = (recentSearch: string) => {
    setSearchTerm(recentSearch);
    setIsSearched(true);
    setIsSearching(true);
  };

  const handleBackButton = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setIsSearched(false);
    }
  }, [searchTerm]);

  return (
    <Wrapper>
      {isSearching ? (
        <TitleHeader
          title="검색"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={handleBackButton}
        />
      ) : (
        <Header>검색</Header>
      )}
      <SearchBarContainer>
        <SearchBar
          placeholder="책 제목, 작가명을 검색해보세요."
          value={searchTerm}
          onChange={handleChange}
          onSearch={() => handleSearch(searchTerm.trim())}
          isSearched={isSearched}
        />
      </SearchBarContainer>
      <Content>
        {isSearching ? (
          <>
            (
            {isSearched ? (
              <BookSearchResult
                type={'searched'}
                searchedBookList={dummySearchedBook}
              ></BookSearchResult>
            ) : (
              <BookSearchResult
                type={'searching'}
                searchedBookList={dummySearchedBook}
              ></BookSearchResult>
            )}
            )
          </>
        ) : (
          <>
            <RecentSearchTabs
              recentSearches={recentSearches}
              handleDelete={handleDelete}
              handleRecentSearchClick={handleRecentSearchClick}
            />
            <MostSearchedBooks />
          </>
        )}
      </Content>
      <NavBar />
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  background: ${colors.black.main};
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  color: ${colors.white};
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight['bold']};
  padding: 16px 20px;
  background: ${colors.black.main};
  z-index: 1;
`;

const SearchBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background: ${colors.black.main};
`;

const Content = styled.div`
  margin-top: 132px;
`;
