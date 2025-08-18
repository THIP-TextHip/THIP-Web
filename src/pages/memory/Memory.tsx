import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import type { SortType } from '../../components/memory/SortDropdown';
import MemoryHeader from '../../components/memory/MemoryHeader/MemoryHeader';
import MemoryContent from '../../components/memory/MemoryContent/MemoryContent';
import MemoryAddButton from '../../components/memory/MemoryAddButton/MemoryAddButton';
import Snackbar from '../../components/common/Modal/Snackbar';
import { Container, FixedHeader, ScrollableContent, FloatingElements } from './Memory.styled';
import { getMemoryPosts } from '../../api/memory/getMemoryPosts';
import type { GetMemoryPostsParams, Post, Record } from '../../types/memory';

export type RecordType = 'group' | 'my';
export type FilterType = 'page' | 'overall';

// API 포스트를 기존 Record 타입으로 변환하는 함수
const convertPostToRecord = (post: Post): Record => {
  return {
    id: post.postId.toString(),
    user: post.nickName,
    userPoints: 132,
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
    pollOptions: post.voteItems.map((item, index) => ({
      id: item.voteItemId.toString(),
      text: item.itemName,
      percentage: item.percentage,
      isHighest: index === 0,
      voteItemId: item.voteItemId,
      isVoted: item.isVoted,
    })),
  };
};

const Memory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();

  // 상태 관리
  const [activeTab, setActiveTab] = useState<RecordType>('group');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  // API 관련 상태
  const [error, setError] = useState<string | null>(null);
  const [isOverviewEnabled, setIsOverviewEnabled] = useState(false);

  // 업로드 프로그레스 상태
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  // 개발용 상태 - 기록 유무 전환
  const [hasRecords, setHasRecords] = useState(true);

  // 기록 데이터
  const [myRecords, setMyRecords] = useState<Record[]>([]);
  const [groupRecords, setGroupRecords] = useState<Record[]>([]);

  // API 데이터 로드 함수
  const loadMemoryPosts = useCallback(async () => {
    if (!roomId) {
      console.log('❌ roomId가 없습니다:', roomId);
      return;
    }
    setError(null);

    try {
      // API 파라미터 구성
      const params: GetMemoryPostsParams = {
        roomId: parseInt(roomId),
        type: activeTab === 'group' ? 'group' : 'mine',
      };

      // group 탭인 경우에만 sort 파라미터 추가
      if (activeTab === 'group') {
        params.sort = selectedSort;
      }

      // 필터 적용
      if (activeFilter === 'overall') {
        params.isOverview = true;
        console.log('🎯 총평 필터 적용 - 독서 진행률 80% 이상 필요');
      } else if (selectedPageRange) {
        params.pageStart = selectedPageRange.start;
        params.pageEnd = selectedPageRange.end;
        params.isPageFilter = true;
        console.log('📖 페이지 필터 적용:', selectedPageRange);
      }

      console.log('📤 API 요청 파라미터:', params);

      const response = await getMemoryPosts(params);
      console.log('📨 API 응답 성공:', response);

      if (response.isSuccess) {
        const convertedRecords = response.data.postList.map(convertPostToRecord);

        if (activeTab === 'group') {
          setGroupRecords(convertedRecords);
        } else {
          setMyRecords(convertedRecords);
        }

        setIsOverviewEnabled(response.data.isOverviewEnabled);
      } else {
        setError(response.message);
      }
    } catch (error) {
      // Axios 에러인 경우 상세 정보 출력
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { code?: number } } };
        if (axiosError.response?.data?.code === 40002) {
          setError('독서 진행률이 80% 이상이어야 총평을 볼 수 있습니다.');
          setActiveFilter(null); // 총평 필터를 자동으로 해제
          return; // 다른 에러 메시지 설정하지 않음
        }
      }

      setError('기록을 불러오는 중 오류가 발생했습니다.');
    }
  }, [roomId, activeTab, selectedSort, activeFilter, selectedPageRange]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadMemoryPosts();
  }, [loadMemoryPosts]);

  // 새로운 기록이 추가되었을 때 처리 (작성 완료 후 돌아왔을 때)
  useEffect(() => {
    if (location.state?.newRecord) {
      const newRecord = location.state.newRecord as Record;
      setShowUploadProgress(true);

      if (activeTab === 'group') {
        setGroupRecords(prev => [newRecord, ...prev]);
      } else {
        setMyRecords(prev => [newRecord, ...prev]);
      }

      // 상태 정리
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, activeTab, navigate, location.pathname]);

  // 현재 탭에 따른 기록 목록 결정
  const currentRecords = useMemo(() => {
    if (!hasRecords) {
      return [];
    }
    return activeTab === 'group' ? groupRecords : myRecords;
  }, [activeTab, hasRecords, groupRecords, myRecords]);

  // 정렬된 기록 목록
  const sortedRecords = useMemo(() => {
    return currentRecords;
  }, [currentRecords]);

  // 필터링된 기록 목록
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

  // 이벤트 핸들러들
  const handleBackClick = useCallback(() => {
    if (roomId) {
      navigate(`/rooms/${roomId}`);
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

  const handleToggleRecords = useCallback(() => {
    setHasRecords(!hasRecords);
  }, [hasRecords]);

  const handleUploadComplete = useCallback(() => {
    setShowUploadProgress(false);
  }, []);

  // 독서 진행률 계산
  const readingProgress = isOverviewEnabled ? 85 : 70;
  const currentUserPage = 350; // 임시로 350으로 설정 (나중에 API에서 가져올 것)

  // 에러 상태 렌더링
  if (error) {
    return (
      <Container>
        <FixedHeader>
          <MemoryHeader onBackClick={handleBackClick} />
        </FixedHeader>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          오류가 발생했습니다: {error}
          <button onClick={loadMemoryPosts} style={{ marginLeft: '10px' }}>
            다시 시도
          </button>
        </div>
      </Container>
    );
  }

  // 메인 렌더링
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
          currentUserPage={currentUserPage}
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
