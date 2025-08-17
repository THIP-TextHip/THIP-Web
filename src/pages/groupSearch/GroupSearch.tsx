import TitleHeader from '@/components/common/TitleHeader';
import { Modal, Overlay } from '@/components/group/Modal.styles';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/search/SearchBar';
import { useState, useEffect } from 'react';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import GroupSearchResult from '@/components/search/GroupSearchResult';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';

const GroupSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecentSearches = async () => {
    try {
      setIsLoading(true);
      const response = await getRecentSearch('ROOM');

      if (response.isSuccess) {
        setRecentSearches(response.data.recentSearchList);
      } else {
        console.error('최근 검색어 조회 실패:', response.message);
        setRecentSearches([]);
      }
    } catch (error) {
      console.error('최근 검색어 조회 오류:', error);
      setRecentSearches([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearch = (_term: string) => {
    setIsSearching(true);
    // 검색 로직만 수행, 최근 검색어는 서버에서 관리
  };

  const handleDelete = async (recentSearchId: number) => {
    try {
      const userId = 1; // 임시 userId

      const response = await deleteRecentSearch(recentSearchId, userId);

      if (response.isSuccess) {
        setRecentSearches(prev => prev.filter(item => item.recentSearchId !== recentSearchId));
      } else {
        console.error('최근 검색어 삭제 실패:', response.message);
      }
    } catch (error) {
      console.error('최근 검색어 삭제 오류:', error);
    }
  };

  const handleRecentSearchClick = (recentSearch: string) => {
    setSearchTerm(recentSearch);
  };

  const handleDeleteWrapper = (searchTerm: string) => {
    const recentSearchItem = recentSearches.find(item => item.searchTerm === searchTerm);
    if (recentSearchItem) {
      handleDelete(recentSearchItem.recentSearchId);
    }
  };

  const handleBackButton = () => {
    navigate('/group');
  };
  return (
    <Overlay>
      <Modal>
        <TitleHeader
          title="모임 검색"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={handleBackButton}
        />
        <SearchBar
          placeholder="방제목 혹은 책제목을 검색해보세요."
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={() => {
            if (searchTerm.trim()) handleSearch(searchTerm.trim());
          }}
        />
        {isSearching ? (
          <GroupSearchResult></GroupSearchResult>
        ) : (
          <RecentSearchTabs
            recentSearches={isLoading ? [] : recentSearches.map(item => item.searchTerm)}
            handleDelete={handleDeleteWrapper}
            handleRecentSearchClick={handleRecentSearchClick}
          ></RecentSearchTabs>
        )}
      </Modal>
    </Overlay>
  );
};

export default GroupSearch;
