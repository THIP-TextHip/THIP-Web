import TitleHeader from '@/components/common/TitleHeader';
import { Modal, Overlay } from '@/components/group/Modal.styles';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/search/SearchBar';
import { useState, useEffect, useCallback } from 'react';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import GroupSearchResult from '@/components/search/GroupSearchResult';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';

import { getSearchRooms, type SearchRoomItem } from '@/api/rooms/getSearchRooms';

type SortKey = 'deadline' | 'memberCount';

const GroupSearch = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);

  const [rooms, setRooms] = useState<SearchRoomItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<string>('마감임박순');
  const toSortKey = useCallback(
    (f: string): SortKey => (f === '인기순' ? 'memberCount' : 'deadline'),
    [],
  );

  const [category, setCategory] = useState<string>('');
  const [isFinalized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingRecent(true);
        const response = await getRecentSearch('ROOM');
        setRecentSearches(response.isSuccess ? response.data.recentSearchList : []);
      } finally {
        setIsLoadingRecent(false);
      }
    })();
  }, []);

  const runSearch = useCallback(
    async (keyword: string, sortKey: SortKey, cursor?: string, append = false) => {
      if (!keyword.trim()) return;
      try {
        setIsLoadingList(true);
        setError(null);

        const res = await getSearchRooms(keyword.trim(), sortKey, cursor, isFinalized, category);

        if (!res.isSuccess) {
          if (!append) {
            setRooms([]);
            setNextCursor(null);
            setIsLast(true);
          }
          setError(res.message || '검색 실패');
          return;
        }

        const { roomList, nextCursor: nc, isLast: last } = res.data;
        setRooms(prev => (append ? [...prev, ...roomList] : roomList));
        setNextCursor(nc);
        setIsLast(last);
      } catch {
        if (!append) {
          setRooms([]);
          setNextCursor(null);
          setIsLast(true);
        }
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setIsLoadingList(false);
      }
    },
    [category, isFinalized],
  );

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    runSearch(searchTerm, toSortKey(selectedFilter), undefined, false);
  };

  const handleRecentSearchClick = (recentSearch: string) => {
    setSearchTerm(recentSearch);
    setIsSearching(true);
    runSearch(recentSearch, toSortKey(selectedFilter), undefined, false);
  };

  useEffect(() => {
    if (isSearching && searchTerm.trim()) {
      runSearch(searchTerm, toSortKey(selectedFilter), undefined, false);
    }
  }, [selectedFilter, isSearching, searchTerm, runSearch, toSortKey]);

  useEffect(() => {
    if (isSearching && searchTerm.trim()) {
      runSearch(searchTerm, toSortKey(selectedFilter), undefined, false);
    }
  }, [category, isSearching, searchTerm, runSearch, toSortKey, selectedFilter]);

  const handleLoadMore = () => {
    if (!isLast && nextCursor && searchTerm.trim()) {
      runSearch(searchTerm, toSortKey(selectedFilter), nextCursor, true);
    }
  };

  const handleBackButton = () => navigate('/group');

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
          onSearch={handleSearch}
        />

        {isSearching ? (
          <GroupSearchResult
            rooms={rooms}
            isLoading={isLoadingList}
            isLast={isLast}
            onLoadMore={handleLoadMore}
            error={error}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            onChangeCategory={setCategory}
            currentCategory={category}
          />
        ) : (
          <RecentSearchTabs
            recentSearches={isLoadingRecent ? [] : recentSearches.map(i => i.searchTerm)}
            handleDelete={(term: string) => {
              const x = recentSearches.find(i => i.searchTerm === term);
              if (x)
                deleteRecentSearch(x.recentSearchId, 1).then(res => {
                  if (res.isSuccess) {
                    setRecentSearches(prev =>
                      prev.filter(it => it.recentSearchId !== x.recentSearchId),
                    );
                  }
                });
            }}
            handleRecentSearchClick={handleRecentSearchClick}
          />
        )}
      </Modal>
    </Overlay>
  );
};

export default GroupSearch;
