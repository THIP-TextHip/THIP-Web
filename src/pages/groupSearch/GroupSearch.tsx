import TitleHeader from '@/components/common/TitleHeader';
import { Modal, Overlay } from '@/components/group/Modal.styles';
import leftArrow from '../../assets/common/leftArrow.svg';
import SearchBar from '@/components/search/SearchBar';
import { useState, useEffect, useCallback, useRef } from 'react';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';
import GroupSearchResult from '@/components/search/GroupSearchResult';
import { getRecentSearch, type RecentSearchData } from '@/api/recentsearch/getRecentSearch';
import { deleteRecentSearch } from '@/api/recentsearch/deleteRecentSearch';
import { getSearchRooms, type SearchRoomItem } from '@/api/rooms/getSearchRooms';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { useNavigate } from 'react-router-dom';

type SortKey = 'deadline' | 'memberCount';
type SearchStatus = 'idle' | 'searching' | 'searched';

const GroupSearch = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');

  const [rooms, setRooms] = useState<SearchRoomItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<string>('마감임박순');
  const toSortKey = useCallback(
    (f: string): SortKey => (f === '인기순' ? 'memberCount' : 'deadline'),
    [],
  );
  const [category, setCategory] = useState<string>('');

  const [recentSearches, setRecentSearches] = useState<RecentSearchData[]>([]);
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [showTabs, setShowTabs] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRecentSearch('ROOM');
        setRecentSearches(response.isSuccess ? response.data.recentSearchList : []);
      } catch {
        setRecentSearches([]);
      }
    })();
  }, []);

  // searchStatus가 'idle'로 변경될 때 최근 검색어 새로고침
  useEffect(() => {
    if (searchStatus === 'idle') {
      fetchRecentSearches();
    }
  }, [searchStatus]);

  const fetchRecentSearches = async () => {
    try {
      const response = await getRecentSearch('ROOM');
      setRecentSearches(response.isSuccess ? response.data.recentSearchList : []);
    } catch {
      setRecentSearches([]);
    }
  };

  const searchFirstPage = useCallback(
    async (term: string, sortKey: SortKey, status: 'searching' | 'searched') => {
      if (!term.trim()) return;

      setIsLoading(true);
      setError(null);
      setRooms([]);
      setNextCursor(null);
      setIsLast(true);

      try {
        const isFinalized = status === 'searched';
        const res = await getSearchRooms(term.trim(), sortKey, undefined, isFinalized, category);
        if (res.isSuccess) {
          const { roomList, nextCursor: nc, isLast: last } = res.data;

          setRooms(roomList);
          setNextCursor(nc);
          setIsLast(last);
        } else {
          setError(res.message || '검색 실패');
        }
      } catch {
        setError('네트워크 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [category],
  );

  const handleChange = (value: string) => {
    setSearchTerm(value);
    if (searchTimeoutId) clearTimeout(searchTimeoutId);

    const trimmed = value.trim();
    if (!trimmed) {
      setSearchStatus('idle');
      setRooms([]);
      setError(null);
      setNextCursor(null);
      setIsLast(true);
      setShowTabs(false);
      setSearchTimeoutId(null);
      return;
    }

    setSearchStatus('searching');
    setShowTabs(false);
    const id = setTimeout(() => {
      searchFirstPage(trimmed, toSortKey(selectedFilter), 'searching');
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
    searchFirstPage(term, toSortKey(selectedFilter), 'searched');
  };

  const handleRecentSearchClick = (recent: string) => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }
    setSearchTerm(recent);
    setSearchStatus('searched');
    setShowTabs(true);
    searchFirstPage(recent.trim(), toSortKey(selectedFilter), 'searched');
  };

  useEffect(() => {
    const term = searchTerm.trim();
    if (!term) return;

    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }
    setSearchStatus('searching');
    searchFirstPage(term, toSortKey(selectedFilter), 'searching');
  }, [selectedFilter, category, searchTerm, searchFirstPage, toSortKey, searchTimeoutId]);

  const loadMore = useCallback(async () => {
    if (!searchTerm.trim() || !nextCursor || isLast || isLoadingMore) return;
    try {
      setIsLoadingMore(true);
      const isFinalized = searchStatus === 'searched';
      const res = await getSearchRooms(
        searchTerm.trim(),
        toSortKey(selectedFilter),
        nextCursor,
        isFinalized,
        category,
      );
      if (res.isSuccess) {
        const { roomList, nextCursor: nc, isLast: last } = res.data;

        setRooms(prev => [...prev, ...roomList]);
        setNextCursor(nc);
        setIsLast(last);
      } else {
        setIsLast(true);
      }
    } catch {
      setIsLast(true);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    searchTerm,
    nextCursor,
    isLast,
    isLoadingMore,
    selectedFilter,
    toSortKey,
    searchStatus,
    category,
  ]);

  const lastRoomElementCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore || isLast) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !isLoadingMore && !isLast) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoadingMore, isLast, loadMore],
  );

  const handleBackButton = () => {
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
      setSearchTimeoutId(null);
    }

    const isIdleView = searchStatus === 'idle' && !searchTerm.trim();

    if (!isIdleView) {
      setSearchTerm('');
      setSearchStatus('idle');
      setRooms([]);
      setNextCursor(null);
      setIsLast(true);
      setError(null);
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
      if (observerRef.current) observerRef.current.disconnect();
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
            {isLoading && rooms.length === 0 ? (
              <LoadingMessage>검색 중...</LoadingMessage>
            ) : (
              <GroupSearchResult
                type={searchStatus}
                showTabs={showTabs}
                rooms={rooms}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                hasMore={!isLast}
                lastRoomElementCallback={lastRoomElementCallback}
                error={error}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                onChangeCategory={setCategory}
                currentCategory={category}
                onClickRoom={roomId => navigate(`/group/detail/${roomId}`)}
              />
            )}
          </>
        ) : (
          <RecentSearchTabs
            recentSearches={recentSearches.map(i => i.searchTerm)}
            handleDelete={async (term: string) => {
              const x = recentSearches.find(i => i.searchTerm === term);
              if (!x) return;
              const res = await deleteRecentSearch(x.recentSearchId);
              if (res.isSuccess) {
                await fetchRecentSearches();
              }
            }}
            handleRecentSearchClick={handleRecentSearchClick}
          />
        )}
      </Modal>
    </Overlay>
  );
};

export default GroupSearch;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
`;
