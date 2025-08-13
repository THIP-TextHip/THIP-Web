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

  const [recentSearches, setRecentSearches] = useState<string[]>([
    '닉네임',
    '작가',
    '하위',
    'Thip',
    '책벌레',
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
              recentSearches={recentSearches}
              handleDelete={handleDelete}
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
