import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import type { SortType } from '../../components/memory/SortDropdown';
import MemoryHeader from '../../components/memory/MemoryHeader/MemoryHeader';
import MemoryContent from '../../components/memory/MemoryContent/MemoryContent';
import MemoryAddButton from '../../components/memory/MemoryAddButton/MemoryAddButton';
import Snackbar from '../../components/common/Modal/Snackbar';
import { Container, FixedHeader, ScrollableContent, FloatingElements } from './Memory.styled';
import { getMemoryPosts } from '../../api/memory/getMemoryPosts';
import type { Post } from '../../types/memory';

export type RecordType = 'group' | 'my';
export type FilterType = 'page' | 'overall';

export interface Record {
  id: string;
  user: string;
  userPoints: number;
  content: string;
  likeCount: number;
  commentCount: number;
  timeAgo: string;
  createdAt: Date;
  type: 'text' | 'poll';
  recordType?: 'page' | 'overall';
  pollOptions?: PollOption[];
  pageRange?: string;
}

export interface PollOption {
  id: string;
  text: string;
  percentage: number;
  isHighest?: boolean;
}

// API 포스트를 기존 Record 타입으로 변환하는 함수
const convertPostToRecord = (post: Post): Record => {
  return {
    id: post.postId.toString(),
    user: post.nickName,
    userPoints: 132, // TODO: 실제 포인트 데이터가 없어서 임시값
    content: post.content,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    timeAgo: post.postDate,
    createdAt: new Date(), // TODO: 실제 생성 날짜로 변경 필요
    type: post.postType === 'VOTE' ? 'poll' : 'text',
    recordType: post.isOverview ? 'overall' : 'page',
    pageRange: post.isOverview ? undefined : post.page.toString(),
    pollOptions: post.voteItems.map((item, index) => ({
      id: item.voteItemId.toString(),
      text: item.itemName,
      percentage: item.percentage,
      isHighest: index === 0, // 첫 번째 아이템을 최고값으로 임시 설정
    })),
  };
};

const addRecordIfNotExists = (prevRecords: Record[], newRecord: Record) => {
  const exists = prevRecords.some(record => record.id === newRecord.id);
  if (exists) {
    return prevRecords;
  }
  return [newRecord, ...prevRecords];
};

const Memory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>(); // URL에서 roomId 가져오기

  const [activeTab, setActiveTab] = useState<RecordType>('group');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [readingProgress] = useState(70);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  // API 관련 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);

  // 업로드 프로그레스 상태
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  // 개발용 상태 - 기록 유무 전환 (API 연동 후에는 실제 데이터 기반으로 변경)
  const [hasRecords, setHasRecords] = useState(true);

  // 내 기록들을 별도로 관리
  const [myRecords, setMyRecords] = useState<Record[]>([]);

  // 그룹 기록들을 별도로 관리 (내가 작성한 것도 포함)
  const [groupRecords, setGroupRecords] = useState<Record[]>([]);

  // API 데이터 로드
  const loadMemoryPosts = useCallback(
    async (isRefresh = false) => {
      if (!roomId) return;

      setIsLoading(true);
      setError(null);

      try {
        // API 파라미터 구성
        const apiParams = {
          roomId: parseInt(roomId),
          type: activeTab === 'my' ? ('mine' as const) : ('group' as const),
          sort:
            activeTab === 'group'
              ? ((selectedSort === 'latest'
                  ? 'latest'
                  : selectedSort === 'popular'
                    ? 'like'
                    : 'comment') as const)
              : undefined,
          pageStart: selectedPageRange ? selectedPageRange.start : null,
          pageEnd: selectedPageRange ? selectedPageRange.end : null,
          isOverview: activeFilter === 'overall' ? true : false,
          isPageFilter: activeFilter === 'page' ? true : false,
          cursor: isRefresh ? null : nextCursor,
        };

        console.log('API 호출 파라미터:', apiParams);

        const response = await getMemoryPosts(apiParams);

        if (response.isSuccess) {
          const convertedRecords = response.data.postList.map(convertPostToRecord);

          if (activeTab === 'my') {
            if (isRefresh) {
              setMyRecords(convertedRecords);
            } else {
              setMyRecords(prev => [...prev, ...convertedRecords]);
            }
          } else {
            if (isRefresh) {
              setGroupRecords(convertedRecords);
            } else {
              setGroupRecords(prev => [...prev, ...convertedRecords]);
            }
          }

          setNextCursor(response.data.nextCursor);
          setIsLast(response.data.isLast);
          setHasRecords(convertedRecords.length > 0);

          console.log('API 응답 성공:', response.data);
        } else {
          setError(response.message);
          console.error('API 응답 실패:', response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '기록을 불러오는 중 오류가 발생했습니다.';
        setError(errorMessage);
        console.error('API 호출 오류:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [roomId, activeTab, selectedSort, selectedPageRange, activeFilter, nextCursor],
  );

  // 컴포넌트 마운트 시 및 필터/탭 변경 시 데이터 로드
  useEffect(() => {
    loadMemoryPosts(true); // 새로운 필터/탭이므로 refresh
  }, [roomId, activeTab, selectedSort, selectedPageRange, activeFilter]);

  // location.state에서 새로 추가된 기록 확인
  React.useEffect(() => {
    if (location.state?.newRecord) {
      const { isUploading, ...recordData } = location.state.newRecord as Record & {
        isUploading?: boolean;
      };

      if (isUploading) {
        // 업로드 프로그레스 시작
        setShowUploadProgress(true);

        const finalRecord: Record = recordData;

        // 내 기록에 추가
        setMyRecords(prev => addRecordIfNotExists(prev, finalRecord));
        // 그룹 기록에도 추가
        setGroupRecords(prev => addRecordIfNotExists(prev, finalRecord));
      }

      // 내 기록 탭으로 이동
      setActiveTab('my');

      // state 즉시 초기화 (중복 추가 방지)
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, navigate]);

  // 업로드 완료 처리
  const handleUploadComplete = useCallback(() => {
    setShowUploadProgress(false);
  }, []);

  // 현재 표시할 기록들
  const currentRecords = useMemo(() => {
    if (activeTab === 'my') {
      return myRecords;
    } else {
      return hasRecords ? groupRecords : [];
    }
  }, [activeTab, myRecords, hasRecords, groupRecords]);

  // 정렬된 기록 목록 (API에서 이미 정렬되어 오므로 그대로 사용)
  const sortedRecords = useMemo(() => {
    return currentRecords;
  }, [currentRecords]);

  // 필터링된 기록 목록 (API에서 이미 필터링되어 오므로 그대로 사용)
  const filteredRecords = useMemo(() => {
    return sortedRecords;
  }, [sortedRecords]);

  const handleBackClick = useCallback(() => {
    // roomId가 있으면 해당 방으로, 없으면 그룹 페이지로
    if (roomId) {
      navigate(`/rooms/${roomId}`); // 또는 적절한 방 상세 페이지
    } else {
      navigate('/group');
    }
  }, [navigate, roomId]);

  const handleTabChange = useCallback((tab: RecordType) => {
    setActiveTab(tab);
    // 탭 변경 시 필터 초기화
    setActiveFilter(null);
    setSelectedPageRange(null);
  }, []);

  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      if (activeFilter === filter) {
        // 같은 필터를 다시 클릭하면 해제
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
  }, []);

  const handlePageRangeSet = useCallback((range: { start: number; end: number }) => {
    setSelectedPageRange(range);
    setActiveFilter('page'); // 페이지 범위 설정 시 페이지별 보기로 자동 변경
  }, []);

  const handleToggleRecords = useCallback(() => {
    setHasRecords(!hasRecords);
  }, [hasRecords]);

  const handleLoadMore = useCallback(() => {
    if (!isLast && !isLoading) {
      loadMemoryPosts(false);
    }
  }, [isLast, isLoading, loadMemoryPosts]);

  if (error) {
    return (
      <Container>
        <FixedHeader>
          <MemoryHeader onBackClick={handleBackClick} />
        </FixedHeader>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          오류가 발생했습니다: {error}
          <button onClick={() => loadMemoryPosts(true)} style={{ marginLeft: '10px' }}>
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
        <MemoryContent
          activeTab={activeTab}
          activeFilter={activeFilter}
          readingProgress={readingProgress}
          selectedSort={selectedSort}
          records={filteredRecords}
          selectedPageRange={selectedPageRange}
          hasRecords={hasRecords}
          showUploadProgress={showUploadProgress}
          onTabChange={handleTabChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onPageRangeClear={handlePageRangeClear}
          onPageRangeSet={handlePageRangeSet}
          onToggleRecords={handleToggleRecords}
          onUploadComplete={handleUploadComplete}
        />
      </ScrollableContent>

      <FloatingElements>
        <MemoryAddButton />
      </FloatingElements>

      {showSnackbar && (
        <Snackbar
          message="기록이 성공적으로 저장되었습니다!"
          variant="bottom"
          onClose={() => setShowSnackbar(false)}
        />
      )}
    </Container>
  );
};

export default Memory;
