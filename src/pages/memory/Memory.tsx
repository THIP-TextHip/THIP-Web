import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import type { SortType } from '../../components/memory/SortDropdown';
import MemoryHeader from '../../components/memory/MemoryHeader/MemoryHeader';
import MemoryContent from '../../components/memory/MemoryContent/MemoryContent';
import MemoryAddButton from '../../components/memory/MemoryAddButton/MemoryAddButton';
import Snackbar from '../../components/common/Modal/Snackbar';
import GlobalCommentBottomSheet from '../../components/common/CommentBottomSheet/GlobalCommentBottomSheet';
import { useCommentBottomSheetStore } from '@/stores/commentBottomSheetStore';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
import { Container, FixedHeader, ScrollableContent, FloatingElements } from './Memory.styled';
import { getMemoryPosts } from '../../api/memory/getMemoryPosts';
import { getRoomPlaying } from '../../api/rooms/getRoomPlaying';
import { isRoomCompleted } from '../../utils/roomStatus';
import type { GetMemoryPostsParams, Post, Record } from '../../types/memory';
import { RecordItemSkeleton } from '@/shared/ui/Skeleton';
import RecordTabs from '../../components/memory/RecordTabs';
import RecordFilters from '../../components/memory/RecordFilters/RecordFilters';
import {
  Content,
  FixedSection,
  ScrollableSection,
} from '../../components/memory/MemoryContent/MemoryContent.styled';

export type RecordType = 'group' | 'my';
export type FilterType = 'page' | 'overall';

const convertPostToRecord = (post: Post): Record => {
  return {
    id: post.postId.toString(),
    user: post.nickName,
    userPoints: 132,
    profileImageUrl: post.profileImageUrl,
    content: post.content,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    timeAgo: post.postDate,
    createdAt: new Date(),
    type: post.postType === 'VOTE' ? 'poll' : 'text',
    recordType: post.isOverview ? 'overall' : 'page',
    pageRange: post.isOverview ? undefined : post.page.toString(),
    isWriter: post.isWriter,
    isLiked: post.isLiked,
    isLocked: post.isLocked,
    pollOptions: post.voteItems.map(item => {
      const maxCount = Math.max(...post.voteItems.map(v => v.count || 0));
      return {
        id: item.voteItemId.toString(),
        text: item.itemName,
        percentage: item.percentage,
        count: item.count || 0,
        isHighest: (item.count || 0) === maxCount && maxCount > 0,
        voteItemId: item.voteItemId,
        isVoted: item.isVoted,
      };
    }),
  };
};

const Memory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();
  const { openCommentBottomSheet } = useCommentBottomSheetStore();

  const [activeTab, setActiveTab] = useState<RecordType>('group');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const filterParam = searchParams.get('filter');

    if (pageParam && filterParam === 'poll') {
      const page = parseInt(pageParam);
      if (!isNaN(page)) {
        setSelectedPageRange({ start: page, end: page });
        setActiveFilter('page');
        setActiveTab('group');

        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.search]);

  const [showUploadProgress, setShowUploadProgress] = useState(false);

  const [roomCompleted, setRoomCompleted] = useState(false);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentUserPage, setCurrentUserPage] = useState<number>(0);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  const recordsList = useInifinieScroll<Record>({
    enabled: !!roomId,
    reloadKey: `${roomId}-${activeTab}-${selectedSort}-${activeFilter}-${selectedPageRange?.start ?? ''}-${selectedPageRange?.end ?? ''}`,
    rootRef: scrollRootRef,
    fetchPage: async cursor => {
      if (!roomId) {
        return { items: [], nextCursor: null, isLast: true };
      }

      try {
        const params: GetMemoryPostsParams = {
          roomId: parseInt(roomId, 10),
          type: activeTab === 'group' ? 'group' : 'mine',
          cursor,
        };
  const loadMemoryPosts = useCallback(async () => {
    if (!roomId) {
      return;
    }

    if (activeFilter === 'page' && !selectedPageRange) {
      return;
    }

    setError(null);
    setLoading(true);

 

        if (activeTab === 'group') {
          params.sort = selectedSort;
        }

        if (activeFilter === 'overall') {
          params.isOverview = true;
        } else if (selectedPageRange) {
          params.pageStart = selectedPageRange.start;
          params.pageEnd = selectedPageRange.end;
          params.isPageFilter = true;
        }

        const [response] = await Promise.all([getMemoryPosts(params)]);

        if (!response.isSuccess) {
          throw new Error(response.message || '기록을 불러오는 중 오류가 발생했습니다.');
        }

        if (response.data.totalPages !== undefined) {
          setTotalPages(response.data.totalPages);
        }
        if (response.data.currentUserPage !== undefined) {
          setCurrentUserPage(response.data.currentUserPage);
        }

        return {
          items: response.data.postList.map(convertPostToRecord),
          nextCursor: response.data.nextCursor,
          isLast: response.data.isLast,
        };
      } catch (error) {
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { data?: { code?: number } } };
          if (axiosError.response?.data?.code === 40002) {
            setActiveFilter(null);
            throw new Error('독서 진행률이 80% 이상이어야 총평을 볼 수 있습니다.');
          }
        }
        throw new Error('기록을 불러오는 중 오류가 발생했습니다.');
      }
    },
  });

  useEffect(() => {
    const checkRoomStatus = async () => {
      if (!roomId) return;

      try {
        const response = await getRoomPlaying(parseInt(roomId));
        if (response.isSuccess) {
          const completed = isRoomCompleted(response.data.progressEndDate);
          setRoomCompleted(completed);
        }
      } catch (error) {
        console.error('모임방 상태 확인 오류:', error);
      }
    };

    checkRoomStatus();
  }, [roomId]);

  useEffect(() => {
    type MemoryLocationState = {
      page?: number;
      focusPostId?: number;
      postType?: 'RECORD' | 'VOTE';
      openComments?: boolean;
    } | null;
    const state = (location.state as MemoryLocationState) || null;
    const initialPage = state?.page;
    if (initialPage && !selectedPageRange) {
      setSelectedPageRange({ start: initialPage, end: initialPage });
      setActiveFilter('page');
    }

    if (state?.openComments && state.focusPostId && state.postType) {
      openCommentBottomSheet(state.focusPostId, state.postType);
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, roomId]);

  useEffect(() => {
    if (location.state?.newRecord) {
      const newRecord = location.state.newRecord as Record;
      setShowUploadProgress(true);
      recordsList.setItems(prev => [newRecord, ...prev]);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const currentRecords = useMemo(() => recordsList.items, [recordsList.items]);

  const sortedRecords = useMemo(() => {
    return currentRecords;
  }, [currentRecords]);

  const filteredRecords = useMemo(() => {
    const filtered = sortedRecords;

    if (activeFilter === 'overall') {
      const overallRecords = filtered.filter(record => record.recordType === 'overall');
      return overallRecords;
    } else if (activeFilter === 'page' && selectedPageRange) {
      const pageRecords = filtered.filter(record => {
        if (record.recordType === 'overall') return false;
        const page = parseInt(record.pageRange || '0');
        return page >= selectedPageRange.start && page <= selectedPageRange.end;
      });
      return pageRecords;
    }

    return filtered;
  }, [sortedRecords, activeFilter, selectedPageRange]);

  const handleBackClick = useCallback(() => {
    if (roomId) {
      navigate(`/group/detail/joined/${roomId}`);
    } else {
      navigate('/group');
    }
  }, [navigate, roomId]);

  const handleTabChange = useCallback((tab: RecordType) => {
    setActiveTab(tab);
    setActiveFilter(null);
    setSelectedPageRange(null);
  }, []);

  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      if (activeFilter === filter) {
        setActiveFilter(null);
        setSelectedPageRange(null);
      } else {
        setActiveFilter(filter);
        setSelectedPageRange(null);
      }
    },
    [activeFilter],
  );

  const handleSortChange = useCallback((sort: SortType) => {
    setSelectedSort(sort);
  }, []);

  const handlePageRangeClear = useCallback(() => {
    setSelectedPageRange(null);
    setActiveFilter(null);
  }, []);

  const handlePageRangeSet = useCallback((range: { start: number; end: number }) => {
    setSelectedPageRange(range);
    setActiveFilter('page');
  }, []);

  const handleUploadComplete = useCallback(() => {
    setShowUploadProgress(false);
  }, []);

  const handleRecordDelete = useCallback(
    (id: string) => {
      if (activeTab === 'group') {
        setGroupRecords(prev => prev.filter(r => r.id !== id));
      } else {
        setMyRecords(prev => prev.filter(r => r.id !== id));
      }
    },
    [activeTab],
  );

  const readingProgress = totalPages > 0 ? Math.round((currentUserPage / totalPages) * 100) : 0;

  if (recordsList.error) {
    return (
      <Container>
        <FixedHeader>
          <MemoryHeader onBackClick={handleBackClick} />
        </FixedHeader>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          오류가 발생했습니다: {recordsList.error}
          <button onClick={() => recordsList.reload()} style={{ marginLeft: '10px' }}>
            다시 시도
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <FixedHeader>
        <MemoryHeader onBackClick={handleBackClick} />
      </FixedHeader>
      <ScrollableContent>
        {recordsList.isLoading ? (
          <Content>
            <FixedSection inert>
              <RecordTabs activeTab={activeTab} onTabChange={handleTabChange} />
              {activeTab === 'group' && (
                <RecordFilters
                  activeFilter={activeFilter}
                  readingProgress={readingProgress}
                  selectedSort={selectedSort}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  selectedPageRange={selectedPageRange}
                  onPageRangeClear={handlePageRangeClear}
                  onPageRangeSet={handlePageRangeSet}
                />
              )}
            </FixedSection>
            <ScrollableSection>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <RecordItemSkeleton key={i} />
                ))}
              </div>
            </ScrollableSection>
          </Content>
        ) : (
          <MemoryContent
            activeTab={activeTab}
            activeFilter={activeFilter}
            readingProgress={readingProgress}
            selectedSort={selectedSort}
            records={filteredRecords}
            selectedPageRange={selectedPageRange}
            showUploadProgress={showUploadProgress}
            onTabChange={handleTabChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onPageRangeClear={handlePageRangeClear}
            onPageRangeSet={handlePageRangeSet}
            onUploadComplete={handleUploadComplete}
            onDelete={handleRecordDelete}
          />
        )}
      </ScrollableContent>

      {!roomCompleted && (
        <FloatingElements>
          <MemoryAddButton />
        </FloatingElements>
      )}

      {showSnackbar && (
        <Snackbar
          message="기록이 성공적으로 저장되었습니다!"
          variant="bottom"
          onClose={() => setShowSnackbar(false)}
        />
      )}

      <GlobalCommentBottomSheet />
    </Container>
  );
};

export default Memory;
