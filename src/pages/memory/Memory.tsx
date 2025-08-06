import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { SortType } from '../../components/memory/SortDropdown';
import MemoryHeader from '../../components/memory/MemoryHeader/MemoryHeader';
import MemoryContent from '../../components/memory/MemoryContent/MemoryContent';
import MemoryAddButton from '../../components/memory/MemoryAddButton/MemoryAddButton';
import Snackbar from '../../components/common/Modal/Snackbar';
import { Container, FixedHeader, ScrollableContent, FloatingElements } from './Memory.styled';

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
  const [activeTab, setActiveTab] = useState<RecordType>('group');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [readingProgress] = useState(70);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  // 업로드 프로그레스 상태
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  // 개발용 상태 - 기록 유무 전환
  const [hasRecords, setHasRecords] = useState(true);

  // 내 기록들을 별도로 관리
  const [myRecords, setMyRecords] = useState<Record[]>([]);

  // 그룹 기록들을 별도로 관리 (내가 작성한 것도 포함)
  const [groupRecords, setGroupRecords] = useState<Record[]>([
    {
      id: '1',
      user: 'user.01',
      userPoints: 132,
      content:
        '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
      likeCount: 123,
      commentCount: 123,
      timeAgo: '12시간 전',
      createdAt: new Date('2024-01-15T12:00:00'),
      type: 'text',
      recordType: 'page',
      pageRange: '132',
    },
    {
      id: '2',
      user: 'user.01',
      userPoints: 132,
      content: '공백 포함 글자 입력입니다.',
      likeCount: 123,
      commentCount: 123,
      timeAgo: '12시간 전',
      createdAt: new Date('2024-01-15T16:00:00'),
      type: 'poll',
      recordType: 'page',
      pageRange: '132',
      pollOptions: [
        {
          id: '1.',
          text: '김땡땡',
          percentage: 90,
          isHighest: true,
        },
        {
          id: '2.',
          text: '김땡땡',
          percentage: 10,
          isHighest: false,
        },
      ],
    },
  ]);

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
  }, [location.pathname]);

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
    const recordsToSort = [...currentRecords];

    switch (selectedSort) {
      case 'latest':
        return recordsToSort.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'popular':
        return recordsToSort.sort((a, b) => b.likeCount - a.likeCount);
      case 'comments':
        return recordsToSort.sort((a, b) => b.commentCount - a.commentCount);
      default:
        return recordsToSort;
    }
  }, [currentRecords, selectedSort]);

  // 필터링된 기록 목록
  const filteredRecords = useMemo(() => {
    if (activeTab === 'my') {
      // 내 기록에서는 필터링 없이 모든 기록 표시
      return sortedRecords;
    }

    if (!activeFilter) return sortedRecords;

    switch (activeFilter) {
      case 'page':
        if (selectedPageRange) {
          // 페이지 범위가 선택된 경우, 해당 범위 내의 기록만 필터링
          return sortedRecords.filter(record => {
            if (record.recordType !== 'page' || !record.pageRange) return false;
            const recordPage = parseInt(record.pageRange);
            return recordPage >= selectedPageRange.start && recordPage <= selectedPageRange.end;
          });
        } else {
          // 페이지별 보기: 총평이 아닌 기록만 표시
          return sortedRecords.filter(record => record.recordType === 'page');
        }
      case 'overall':
        // 총평 보기: 총평 기록만 표시
        return sortedRecords.filter(record => record.recordType === 'overall');
      default:
        return sortedRecords;
    }
  }, [activeTab, activeFilter, selectedPageRange, sortedRecords]);

  const handleBackClick = useCallback(() => {
    navigate('/group');
  }, [navigate]);

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
