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
  const { roomId } = useParams<{ roomId: string }>();

  const [activeTab, setActiveTab] = useState<RecordType>('group');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [readingProgress] = useState(70);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  // API 관련 상태
  const [error, setError] = useState<string | null>(null);

  // 업로드 프로그레스 상태
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  // 개발용 상태 - 기록 유무 전환
  const [hasRecords, setHasRecords] = useState(true);

  // 내 기록들을 별도로 관리
  const [myRecords, setMyRecords] = useState<Record[]>([]);

  // 그룹 기록들을 별도로 관리
  const [groupRecords, setGroupRecords] = useState<Record[]>([]);

  // API 데이터 로드
  const loadMemoryPosts = useCallback(async () => {
    // roomId가 없으면 기본값 1 사용 또는 API 호출 스킵
    const currentRoomId = roomId || '1';

    setError(null);

    try {
      // 정렬 타입 변환
      let sortType: 'latest' | 'like' | 'comment' | undefined = undefined;
      if (activeTab === 'group') {
        if (selectedSort === 'latest') sortType = 'latest';
        else if (selectedSort === 'popular') sortType = 'like';
        else if (selectedSort === 'comments') sortType = 'comment';
      }

      // API 타입에 맞는 파라미터 구성
      const requestParams: {
        roomId: number;
        type: 'group' | 'mine';
        sort?: 'latest' | 'like' | 'comment';
        pageStart?: number | null;
        pageEnd?: number | null;
        isOverview?: boolean;
        isPageFilter?: boolean;
        cursor?: string | null;
      } = {
        roomId: parseInt(currentRoomId),
        type: activeTab === 'my' ? 'mine' : 'group',
        pageStart: selectedPageRange ? selectedPageRange.start : null,
        pageEnd: selectedPageRange ? selectedPageRange.end : null,
        isOverview: activeFilter === 'overall' ? true : false,
        isPageFilter: activeFilter === 'page' ? true : false,
        cursor: null,
      };

      // sort는 group 타입일 때만 추가
      if (activeTab === 'group' && sortType) {
        requestParams.sort = sortType;
      }

      console.log('API 호출 파라미터:', requestParams);

      const response = await getMemoryPosts(requestParams);

      if (response.isSuccess) {
        const convertedRecords = response.data.postList.map(convertPostToRecord);

        if (activeTab === 'my') {
          setMyRecords(convertedRecords);
        } else {
          setGroupRecords(convertedRecords);
        }

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
    }
  }, [roomId, activeTab, selectedSort, selectedPageRange, activeFilter]);

  // 컴포넌트 마운트 시 및 필터/탭 변경 시 데이터 로드
  useEffect(() => {
    loadMemoryPosts();
  }, [loadMemoryPosts]);

  // location.state에서 새로 추가된 기록 확인
  useEffect(() => {
    if (location.state?.newRecord) {
      const { isUploading, ...recordData } = location.state.newRecord as Record & {
        isUploading?: boolean;
      };

      if (isUploading) {
        setShowUploadProgress(true);
        const finalRecord: Record = recordData;
        setMyRecords(prev => addRecordIfNotExists(prev, finalRecord));
        setGroupRecords(prev => addRecordIfNotExists(prev, finalRecord));
      }

      setActiveTab('my');
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state?.newRecord, location.pathname, navigate]);

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

  // 정렬된 기록 목록
  const sortedRecords = useMemo(() => {
    return currentRecords;
  }, [currentRecords]);

  // 필터링된 기록 목록
  const filteredRecords = useMemo(() => {
    return sortedRecords;
  }, [sortedRecords]);

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
  }, []);

  const handlePageRangeSet = useCallback((range: { start: number; end: number }) => {
    setSelectedPageRange(range);
    setActiveFilter('page');
  }, []);

  const handleToggleRecords = useCallback(() => {
    setHasRecords(!hasRecords);
  }, [hasRecords]);

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
