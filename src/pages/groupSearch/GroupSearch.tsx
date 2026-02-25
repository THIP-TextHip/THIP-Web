import TitleHeader from '@/components/common/TitleHeader';
import { Modal, Overlay } from '@/components/group/Modal.styles';
import leftArrow from '../../assets/common/leftArrow.svg';
import SearchBar from '@/components/search/SearchBar';
import rightChevron from '../../assets/common/right-Chevron.svg';
import { useState, useEffect, useCallback } from 'react';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import GroupSearchResult from '@/components/search/GroupSearchResult';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';
import { getSearchRooms } from '@/api/rooms/getSearchRooms';
import { useNavigate, useLocation } from 'react-router-dom';
import { AllRoomsButton } from './GroupSearch.styled';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
import { GroupCardSkeleton, RecentSearchTabsSkeleton } from '@/shared/ui/Skeleton';
import { Content } from '@/components/search/GroupSearchResult.styled';

type SortKey = 'deadline' | 'memberCount';
type SearchStatus = 'idle' | 'searching' | 'searched';

const GroupSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');
  const [selectedFilter, setSelectedFilter] = useState<string>('마감임박순');
  const toSortKey = useCallback(
    (f: string): SortKey => (f === '인기순' ? 'memberCount' : 'deadline'),
    [],
  );
  const [category, setCategory] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);
  const [isLoadingRecentSearches, setIsLoadingRecentSearches] = useState(true);
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [showTabs, setShowTabs] = useState(false);

  useEffect(() => {
    fetchRecentSearches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchStatus === 'idle') {
      fetchRecentSearches();
    }
  }, [searchStatus]);

  const fetchRecentSearches = useCallback(async () => {
    try {
      setIsLoadingRecentSearches(true);
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
      const [response] = await Promise.all([getRecentSearch('ROOM'), minLoadingTime]);
      setRecentSearches(response.isSuccess ? response.data.recentSearchList : []);
    } catch {
      setRecentSearches([]);
    } finally {
      setIsLoadingRecentSearches(false);
    }
  }, []);

  useEffect(() => {
    if (location.state?.allRooms) {
      navigate(location.pathname, { replace: true });

      setSearchTerm('');
      setDebouncedSearchTerm('');
      setSearchStatus('searched');
      setShowTabs(true);
      setCategory('');
    }
  }, [location.state?.allRooms, navigate, location.pathname]);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    if (searchTimeoutId) clearTimeout(searchTimeoutId);

    const trimmed = value.trim();
    if (!trimmed) {
      setSearchStatus('idle');
      setDebouncedSearchTerm('');
      setShowTabs(false);
      setSearchTimeoutId(null);
      return;
    }

    setSearchStatus('searching');
    setShowTabs(false);
    const id = setTimeout(() => {
      setDebouncedSearchTerm(trimmed);
    }, 300);
    setSearchTimeoutId(id);
  };

  const handleSearch = () => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }
    const term = searchTerm.trim();
    if (!term) return;

    setSearchStatus('searched');
    setShowTabs(true);
  };

  const handleRecentSearchClick = (recent: string) => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }
    setSearchTerm(recent);
    setSearchStatus('searched');
    setShowTabs(true);
  };

  const handleAllRoomsClick = () => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSearchStatus('searched');
    setShowTabs(true);
    setCategory('');
  };

  useEffect(() => {
    if (searchStatus === 'searched') {
      setDebouncedSearchTerm(searchTerm.trim());
    }
  }, [searchStatus, searchTerm]);

  const queryTerm = searchStatus === 'searched' ? searchTerm.trim() : debouncedSearchTerm.trim();
  const isAllCategory = !queryTerm && category === '';

  const searchResult = useInifinieScroll({
    enabled: searchStatus !== 'idle' && (searchStatus === 'searched' || !!queryTerm),
    reloadKey: `${searchStatus}-${queryTerm}-${selectedFilter}-${category}`,
    fetchPage: async cursor => {
      if (searchStatus === 'searching' && !queryTerm) {
        return { items: [], nextCursor: null, isLast: true };
      }

      const minLoadingTime = cursor ? null : new Promise(resolve => setTimeout(resolve, 500));
      const res = await getSearchRooms(
        queryTerm,
        toSortKey(selectedFilter),
        cursor ?? undefined,
        searchStatus === 'searched',
        category,
        isAllCategory,
      );

      if (minLoadingTime) await minLoadingTime;

      if (!res.isSuccess) {
        throw new Error(res.message || '검색 실패');
      }

      return {
        items: res.data.roomList,
        nextCursor: res.data.nextCursor,
        isLast: res.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

  const handleBackButton = () => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }

    const isIdleView = searchStatus === 'idle' && !searchTerm.trim();

    if (!isIdleView) {
      setSearchTerm('');
      setDebouncedSearchTerm('');
      setSearchStatus('idle');
      setShowTabs(false);
      return;
    }
    const idx = (window.history.state && window.history.state.idx) as number | undefined;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
    } else {
      navigate('/group');
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutId) clearTimeout(searchTimeoutId);
    };
  }, [searchTimeoutId]);

  return (
    <Overlay $whiteBg>
      <Modal>
        <TitleHeader
          title="모임 검색"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={handleBackButton}
        />

        <SearchBar
          placeholder="방 제목 혹은 책 제목을 검색해보세요."
          value={searchTerm}
          onChange={handleChange}
          onSearch={handleSearch}
          isSearched={searchStatus === 'searched'}
        />

        {searchStatus !== 'idle' ? (
          <>
            {searchResult.isLoading && searchResult.items.length === 0 ? (
              <Content>
                {Array.from({ length: 5 }).map((_, i) => (
                  <GroupCardSkeleton key={i} type="search" />
                ))}
              </Content>
            ) : (
              <GroupSearchResult
                type={searchStatus}
                showTabs={showTabs}
                rooms={searchResult.items}
                isLoading={searchResult.isLoading}
                isLoadingMore={searchResult.isLoadingMore}
                hasMore={!searchResult.isLast}
                sentinelRef={searchResult.sentinelRef}
                error={searchResult.error}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                onChangeCategory={setCategory}
                currentCategory={category}
                onClickRoom={roomId => navigate(`/group/detail/${roomId}`)}
              />
            )}
          </>
        ) : (
          <>
            {isLoadingRecentSearches ? (
              <RecentSearchTabsSkeleton />
            ) : (
              <RecentSearchTabs
                recentSearches={recentSearches.map(i => i.searchTerm)}
                handleDelete={async (term: string) => {
                  try {
                    const x = recentSearches.find(i => i.searchTerm === term);
                    if (!x) return;
                    const res = await deleteRecentSearch(x.recentSearchId);
                    if (res.isSuccess) {
                      await fetchRecentSearches();
                    }
                  } catch (err) {
                    console.error('최근 검색어 삭제 실패:', err);
                  }
                }}
                handleRecentSearchClick={handleRecentSearchClick}
              />
            )}
            <AllRoomsButton onClick={handleAllRoomsClick}>
              <p>전체 모임방 둘러보기</p>
              <img src={rightChevron} alt="전체 모임방 버튼" />
            </AllRoomsButton>
          </>
        )}
      </Modal>
    </Overlay>
  );
};

export default GroupSearch;
