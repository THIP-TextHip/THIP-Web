import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SortType } from '../../components/memory/SortDropdown';
import MemoryHeader from '../../components/memory/MemoryHeader/MemoryHeader';
import MemoryContent from '../../components/memory/MemoryContent/MemoryContent';
import MemoryAddButton from '../../components/memory/MemoryAddButton/MemoryAddButton';
import Snackbar from '../../components/common/Modal/Snackbar';
import { Container } from './Memory.styled';

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
}

export interface PollOption {
  id: string;
  text: string;
  percentage: number;
  isHighest?: boolean;
}

const Memory = () => {
  const navigate = useNavigate();
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

  // 더미 데이터 - 실제로는 API에서 가져올 데이터
  const dummyRecords: Record[] = [
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
  ];

  // 정렬된 기록 목록
  const sortedRecords = useMemo(() => {
    if (!hasRecords) return [];

    const recordsToSort = [...dummyRecords];

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
  }, [hasRecords, selectedSort, dummyRecords]);

  // 필터링된 기록 목록
  const filteredRecords = useMemo(() => {
    if (!activeFilter) return sortedRecords;

    switch (activeFilter) {
      case 'page':
        return sortedRecords.filter(record => record.recordType === 'page');
      case 'overall':
        return sortedRecords.filter(record => record.recordType === 'overall');
      default:
        return sortedRecords;
    }
  }, [sortedRecords, activeFilter]);

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

  const handleAddRecord = () => {
    console.log('기록 작성하기');
  };

  const toggleRecords = () => {
    setHasRecords(!hasRecords);
  };

  return (
    <Container>
      <MemoryHeader onBackClick={handleBackClick} />

      <MemoryContent
        activeTab={activeTab}
        activeFilter={activeFilter}
        readingProgress={readingProgress}
        selectedSort={selectedSort}
        records={filteredRecords}
        selectedPageRange={selectedPageRange}
        hasRecords={hasRecords}
        onTabChange={handleTabChange}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onPageRangeClear={handlePageRangeClear}
        onToggleRecords={toggleRecords}
      />

      <MemoryAddButton onAddRecord={handleAddRecord} />

      {showSnackbar && (
        <Snackbar
          message="독서 진행도 80% 이상부터 총평을 볼 수 있어요."
          variant="top"
          onClose={handleSnackbarClose}
        />
      )}
    </Container>
  );
};

export default Memory;
