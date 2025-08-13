import NavBar from '@/components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import { BookSearchResult } from '@/components/search/BookSearchResult';
import MostSearchedBooks from '@/components/search/MostSearchedBooks';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import SearchBar from '@/components/search/SearchBar';
import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import leftArrow from '../../assets/common/leftArrow.svg';
import { searchBooks, convertToSearchedBooks } from '@/api/books/searchBooks';

export interface SearchedBook {
  id: number;
  title: string;
  author: string;
  publisher: string;
  coverUrl: string;
  isbn: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsSearched(false);
    setIsSearching(value.trim() !== '');

    if (value.trim()) {
      setSearchParams({ q: value.trim() }, { replace: true });

      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        handleSearch(value.trim(), false);
      }, 300);

      setSearchTimeoutId(timeoutId);
    } else {
      setSearchParams({}, { replace: true });

      setSearchResults([]);
      setIsSearched(false);

      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
        setSearchTimeoutId(null);
      }
    }
  };

  const handleSearch = useCallback(async (term: string, isManualSearch: boolean = false) => {
    if (!term.trim()) return;

    setIsSearching(true);

    if (isManualSearch) {
      setIsSearched(false);
    }

    setIsLoading(true);

    try {
      const response = await searchBooks(term, 1);
      console.log('API 응답:', response);

      if (response.isSuccess) {
        const convertedResults = convertToSearchedBooks(response.data.searchResult);
        console.log('변환된 결과:', convertedResults);
        setSearchResults(convertedResults);
      } else {
        console.log('검색 실패:', response.message);
        setSearchResults([]);
      }

      if (isManualSearch) {
        setIsSearched(true);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
      if (isManualSearch) {
        setIsSearched(true);
      }
    } finally {
      setIsLoading(false);
    }

    setRecentSearches(prev => {
      const filtered = prev.filter(t => t !== term);
      return [term, ...filtered].slice(0, 5);
    });
  }, []);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    if (query && !isInitialized) {
      setSearchTerm(query);
      setIsSearching(true);
      handleSearch(query, true);
      setIsInitialized(true);
    }
  }, [searchParams, handleSearch, isInitialized]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setIsSearched(false);
    }
  }, [searchTerm]);

  const handleDelete = (recentSearch: string) => {
    setRecentSearches(prev => prev.filter(t => t !== recentSearch));
  };

  const handleRecentSearchClick = (recentSearch: string) => {
    setSearchTerm(recentSearch);
    handleSearch(recentSearch, true);
  };

  const handleBackButton = () => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }

    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    setIsSearched(false);
    setIsInitialized(false);
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
    };
  }, [searchTimeoutId]);

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
          onSearch={() => handleSearch(searchTerm.trim(), true)}
          isSearched={isSearched}
        />
      </SearchBarContainer>
      <Content>
        {isSearching ? (
          <>
            {isLoading ? (
              <LoadingMessage>검색 중...</LoadingMessage>
            ) : (
              <BookSearchResult
                type={isSearched ? 'searched' : 'searching'}
                searchedBookList={searchResults}
              />
            )}
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

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
`;
