import NavBar from '@/components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import SearchBar from '@/components/search/SearchBar';
import { colors } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import leftArrow from '../../assets/common/leftArrow.svg';
import { UserSearchResult } from './UserSearchResult';
import { useNavigate } from 'react-router-dom';
import { useUserSearch } from '@/hooks/useUserSearch';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';

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

  const fetchRecentSearches = async () => {
    try {
      const response = await getRecentSearch('USER');

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
    try {
      const response = await deleteRecentSearch(recentSearchId);

      if (response.isSuccess) {
        // 삭제 성공 후 최근 검색어 리스트를 다시 호출
        await fetchRecentSearches();
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
            />
          </>
        )}
      </Content>
      <NavBar />
    </Wrapper>
  );
};

export default UserSearch;

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

const SearchBarContainer = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  max-width: 767px;
  margin: 0 auto;
  background: ${colors.black.main};
`;

const Content = styled.div`
  margin-top: 132px;
`;
