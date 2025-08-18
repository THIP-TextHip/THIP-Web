import NavBar from '@/components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import { BookSearchResult } from '@/components/search/BookSearchResult';
import MostSearchedBooks from '@/components/search/MostSearchedBooks';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import SearchBar from '@/components/search/SearchBar';
import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import leftArrow from '../../assets/common/leftArrow.svg';
import { getSearchBooks, convertToSearchedBooks } from '@/api/books/getSearchBooks';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';

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
  const [isFinalized, setIsFinalized] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchedBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  // 무한스크롤 관련 상태
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // 1부터 시작
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Intersection Observer를 위한 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useRef<HTMLDivElement | null>(null);

  const fetchRecentSearches = async () => {
    try {
      const response = await getRecentSearch('BOOK');

      if (response.isSuccess) {
        setRecentSearches(response.data.recentSearchList);
      } else {
        console.error('최근 검색어 조회 실패:', response.message);
        setRecentSearches([]);
      }
    } catch (error) {
      console.error('최근 검색어 조회 오류:', error);
      setRecentSearches([]);
    }
  };

  // 추가 데이터 로드 함수
  const loadMore = useCallback(async () => {
    if (!searchTerm.trim() || isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;

      const response = await getSearchBooks(searchTerm, nextPage, isFinalized);

      if (response.isSuccess) {
        const newResults = convertToSearchedBooks(response.data.searchResult);

        if (newResults.length > 0) {
          setSearchResults(prev => [...prev, ...newResults]);
          setPage(nextPage);
          // API 응답의 last 필드를 사용하여 hasMore 설정
          setHasMore(!response.data.last);
        } else {
          setHasMore(false);
        }
      } else {
        console.error('추가 데이터 로드 실패:', response.message);
        setHasMore(false);
      }
    } catch (error) {
      console.error('추가 데이터 로드 중 오류 발생:', error);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [searchTerm, isLoadingMore, hasMore, page, isFinalized]);

  // 무한스크롤을 위한 Intersection Observer 설정
  const lastBookElementCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
      lastBookElementRef.current = node;
    },
    [isLoadingMore, hasMore, loadMore],
  );

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsFinalized(false);
    setIsSearching(value.trim() !== '');
    setHasMore(true); // 새로운 검색 시 hasMore 초기화
    setPage(1); // 페이지를 1로 초기화

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
      setIsFinalized(false);
      setHasMore(true);
      setPage(1);

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
      setIsFinalized(false);
    }

    setIsLoading(true);
    setPage(1); // 검색 시 페이지를 1로 초기화
    setHasMore(true); // 검색 시 hasMore 초기화

    try {
      const response = await getSearchBooks(term, 1, isManualSearch); // 첫 페이지는 1

      if (response.isSuccess) {
        const convertedResults = convertToSearchedBooks(response.data.searchResult);
        setSearchResults(convertedResults);
        // API 응답의 last 필드를 사용하여 hasMore 설정
        setHasMore(!response.data.last);
        setTotalElements(response.data.totalElements);
      } else {
        console.log('검색 실패:', response.message);
        setSearchResults([]);
        setHasMore(false);
      }

      if (isManualSearch) {
        setIsFinalized(true);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
      setHasMore(false);
      if (isManualSearch) {
        setIsFinalized(true);
      }
    } finally {
      setIsLoading(false);
    }
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
      setIsFinalized(false);
    }
  }, [searchTerm]);

  const handleDelete = async (recentSearchId: number) => {
    try {
      const response = await deleteRecentSearch(recentSearchId);

      if (response.isSuccess) {
        setRecentSearches(prev => prev.filter(item => item.recentSearchId !== recentSearchId));
      } else {
        console.error('최근 검색어 삭제 실패:', response.message);
      }
    } catch (error) {
      console.error('최근 검색어 삭제 오류:', error);
    }
  };

  const handleDeleteWrapper = (searchTerm: string) => {
    const recentSearchItem = recentSearches.find(item => item.searchTerm === searchTerm);
    if (recentSearchItem) {
      handleDelete(recentSearchItem.recentSearchId);
    }
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
    setIsFinalized(false);
    setIsInitialized(false);
    setHasMore(true);
    setPage(1);
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [searchTimeoutId]);

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
          isSearched={isFinalized}
        />
      </SearchBarContainer>
      <Content>
        {isSearching ? (
          <>
            {isLoading && searchResults.length === 0 ? (
              <LoadingMessage>검색 중...</LoadingMessage>
            ) : (
              <BookSearchResult
                type={isFinalized ? 'searched' : 'searching'}
                searchedBookList={searchResults}
                hasMore={hasMore}
                isLoading={isLoadingMore}
                lastBookElementCallback={lastBookElementCallback}
                totalElements={totalElements}
              />
            )}
          </>
        ) : (
          <>
            <RecentSearchTabs
              recentSearches={recentSearches.map(item => item.searchTerm)}
              handleDelete={handleDeleteWrapper}
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
  height: 100%;
  min-height: 100vh;
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
