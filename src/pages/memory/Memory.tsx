import { useState, useMemo, useCallback, useEffect } from 'react';
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
  isWriter?: boolean;
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
    pollOptions: post.voteItems.map((item, index) => ({
      id: item.voteItemId.toString(),
      text: item.itemName,
      percentage: item.percentage,
      isHighest: index === 0,
    })),
  };
};

const Memory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();

  const [activeTab, setActiveTab] = useState<RecordType>('group');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  // API 관련 상태
  const [error, setError] = useState<string | null>(null);
  const [isOverviewEnabled, setIsOverviewEnabled] = useState(false); // API에서 받아올 총평 활성화 여부

  // 업로드 프로그레스 상태
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  // 개발용 상태 - 기록 유무 전환
  const [hasRecords, setHasRecords] = useState(true);

  // 내 기록들을 별도로 관리
  const [myRecords, setMyRecords] = useState<Record[]>([]);

  // 그룹 기록들을 별도로 관리
  const [groupRecords, setGroupRecords] = useState<Record[]>([]);

  // API 데이터 로드 함수
  const loadMemoryPosts = useCallback(async () => {
    if (!roomId) return;

    setError(null);

    try {
      // API 파라미터 구성
      const params: {
        roomId: number;
        type: 'group' | 'mine';
        sort?: 'latest' | 'like' | 'comment';
      } = {
        roomId: parseInt(roomId),
        type: activeTab === 'group' ? 'group' : 'mine',
      };

      // 그룹 기록일 때만 정렬 파라미터 추가
      if (activeTab === 'group') {
        let sortType: 'latest' | 'like' | 'comment' = 'latest';
        if (selectedSort === 'popular') sortType = 'like';
        else if (selectedSort === 'comments') sortType = 'comment';

        params.sort = sortType;
      }

      const response = await getMemoryPosts(params);

      if (response.isSuccess) {
        const convertedRecords = response.data.postList.map(convertPostToRecord);

        setIsOverviewEnabled(response.data.isOverviewEnabled);

        if (activeTab === 'group') {
          setGroupRecords(convertedRecords);
        } else {
          setMyRecords(convertedRecords);
        }
      } else {
        setError(response.message || '기록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('기록 조회 API 오류:', err);
      setError('기록을 불러오는 중 오류가 발생했습니다.');
    }
  }, [roomId, activeTab, selectedSort]);

  // 컴포넌트 마운트 시 및 탭 변경 시 데이터 로드
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
    let filtered = sortedRecords;

    if (activeFilter === 'overall') {
      filtered = filtered.filter(record => record.recordType === 'overall');
    } else if (activeFilter === 'page' && selectedPageRange) {
      filtered = filtered.filter(record => {
        if (record.recordType === 'overall') return false;
        const page = parseInt(record.pageRange || '0');
        return page >= selectedPageRange.start && page <= selectedPageRange.end;
      });
    }

    return filtered;
  }, [sortedRecords, activeFilter, selectedPageRange]);

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

  const readingProgress = isOverviewEnabled ? 85 : 70;

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
