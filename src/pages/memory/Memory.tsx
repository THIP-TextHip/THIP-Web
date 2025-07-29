import React, { useState, useMemo } from 'react';
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
        '내 생각에 이 부분이 가장 어려운 것 같다. 비유도 난해하고 잘 이해가 가지 않는데 다른 메이트들은 어떻게 읽었나요?',
      likeCount: 50,
      commentCount: 25,
      timeAgo: '12시간 전',
      createdAt: new Date('2024-01-15T12:00:00'),
      type: 'text',
      recordType: 'page',
      pageRange: '123',
    },
    {
      id: '2',
      user: 'user.01',
      userPoints: 12,
      content: '3연에 나오는 심장은 무엇을 의미하는 걸까요?',
      likeCount: 123,
      commentCount: 45,
      timeAgo: '8시간 전',
      createdAt: new Date('2024-01-15T16:00:00'),
      type: 'poll',
      recordType: 'page',
      pageRange: '456',
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
    {
      id: '3',
      user: 'user.02',
      userPoints: 89,
      content: '공백 포함 글자 입력입니다.',
      likeCount: 75,
      commentCount: 15,
      timeAgo: '4시간 전',
      createdAt: new Date('2024-01-15T20:00:00'),
      type: 'text',
      recordType: 'overall',
    },
  ]);

  // location.state에서 새로 추가된 기록 확인
  React.useEffect(() => {
    if (location.state?.newRecord) {
      const newRecord = location.state.newRecord as Record;

      // 중복 확인을 위한 함수
      const addRecordIfNotExists = (prevRecords: Record[]) => {
        const exists = prevRecords.some(record => record.id === newRecord.id);
        if (exists) {
          return prevRecords;
        }
        return [newRecord, ...prevRecords];
      };

      // 내 기록에 추가
      setMyRecords(prev => addRecordIfNotExists(prev));

      // 그룹 기록에도 추가 (내가 작성한 기록도 그룹에 표시)
      setGroupRecords(prev => addRecordIfNotExists(prev));

      // 내 기록 탭으로 이동
      setActiveTab('my');

      // state 즉시 초기화 (중복 추가 방지)
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state?.newRecord?.id, navigate, location.pathname]);

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
            if (record.recordType === 'page' && record.pageRange) {
              const recordPage = parseInt(record.pageRange);
              return recordPage >= selectedPageRange.start && recordPage <= selectedPageRange.end;
            }
            return false;
          });
        } else {
          // 페이지 범위가 선택되지 않은 경우 모든 페이지 기록 표시
          return sortedRecords.filter(record => record.recordType === 'page');
        }
      case 'overall':
        return sortedRecords.filter(record => record.recordType === 'overall');
      default:
        return sortedRecords;
    }
  }, [sortedRecords, activeFilter, activeTab, selectedPageRange]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTabChange = (tab: RecordType) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filter: FilterType) => {
    if (filter === 'page') {
      setActiveFilter(filter);
    } else if (filter === 'overall') {
      if (readingProgress < 80) {
        setShowSnackbar(true);
        return;
      }
      setActiveFilter(filter);
      setSelectedPageRange(null);
    }
  };

  const handleSortChange = (sort: SortType) => {
    setSelectedSort(sort);
    console.log('정렬 변경:', sort);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handlePageRangeClear = () => {
    setActiveFilter(null);
    setSelectedPageRange(null);
  };

  const handlePageRangeSet = (range: { start: number; end: number }) => {
    setSelectedPageRange(range);
  };

  const handleAddRecord = () => {
    navigate('/memory/record/write');
  };

  const toggleRecords = () => {
    setHasRecords(!hasRecords);
  };

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
          hasRecords={activeTab === 'my' ? myRecords.length > 0 : hasRecords}
          onTabChange={handleTabChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onPageRangeClear={handlePageRangeClear}
          onPageRangeSet={handlePageRangeSet}
          onToggleRecords={toggleRecords}
        />
      </ScrollableContent>

      <FloatingElements>
        <MemoryAddButton onAddRecord={handleAddRecord} />

        {showSnackbar && (
          <Snackbar
            message="독서 진행도 80% 이상부터 총평을 볼 수 있어요."
            variant="top"
            onClose={handleSnackbarClose}
          />
        )}
      </FloatingElements>
    </Container>
  );
};

export default Memory;
