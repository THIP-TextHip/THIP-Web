import NavBar from '@/components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import SearchBar from '@/components/search/SearchBar';
import { useEffect, useState } from 'react';
import leftArrow from '../../assets/common/leftArrow.svg';
import { UserSearchResult } from './UserSearchResult';
import { useNavigate } from 'react-router-dom';
import { useUserSearch } from '@/hooks/useUserSearch';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';
import { Content, SearchBarContainer, Wrapper } from './UserSearch.styled';

const UserSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const { userList, loading, hasMore, loadMore } = useUserSearch({
    keyword: searchTerm,
    size: 20,
    delay: 300,
    isFinalized: isSearched,
  });

  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);
  const [isRecentLoading, setIsRecentLoading] = useState(false);

  const fetchRecentSearches = async () => {
    setIsRecentLoading(true);
    try {
      const response = await getRecentSearch('USER');
      setRecentSearches(response.data.recentSearchList);
    } finally {
      setIsRecentLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearched) {
      fetchRecentSearches();
    }
  }, [isSearched]);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsSearched(false);
    setIsSearching(value.trim() !== '');
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    setIsSearching(true);
    setIsSearched(true);
  };

  const handleDelete = async (recentSearchId: number) => {
    const response = await deleteRecentSearch(recentSearchId);

    if (response.isSuccess) {
      await fetchRecentSearches();
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
    setIsSearched(true);
    setIsSearching(true);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setIsSearched(false);
    }
  }, [searchTerm]);

  return (
    <Wrapper>
      <TitleHeader
        title="사용자 찾기"
        leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
        onLeftClick={handleBackButton}
      />
      <SearchBarContainer>
        <SearchBar
          placeholder="내가 찾는 사용자를 검색해보세요."
          value={searchTerm}
          onChange={handleChange}
          onSearch={() => handleSearch(searchTerm.trim())}
          isSearched={isSearched}
        />
      </SearchBarContainer>
      <Content>
        {isSearching ? (
          <>
            {isSearched ? (
              <UserSearchResult
                type={'searched'}
                searchedUserList={userList}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            ) : (
              <UserSearchResult
                type={'searching'}
                searchedUserList={userList}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            )}
          </>
        ) : (
          <>
            <RecentSearchTabs
              recentSearches={recentSearches.map(item => item.searchTerm)}
              handleDelete={handleDeleteWrapper}
              handleRecentSearchClick={handleRecentSearchClick}
              isLoading={isRecentLoading}
            />
          </>
        )}
      </Content>
      <NavBar />
    </Wrapper>
  );
};

export default UserSearch;
