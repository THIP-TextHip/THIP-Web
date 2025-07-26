import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import RecordTabs from '../../components/memory/RecordTabs';
import RecordFilters from '../../components/memory/RecordFilters/RecordFilters';
import EmptyRecord from '../../components/memory/EmptyRecord';
import RecordItem from '../../components/memory/RecordItem';
import Snackbar from '../../components/common/Modal/Snackbar';
import leftArrow from '../../assets/common/leftArrow.svg';
import addFab from '../../assets/common/makegroupfab.svg';
import { Container, Content, RecordList, AddButton, DevButton } from './Memory.styled';

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
  type: 'text' | 'poll';
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
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [readingProgress] = useState(70);
  const [selectedPageRange, setSelectedPageRange] = useState<{ start: number; end: number } | null>(
    null,
  );

  // 개발용 상태 - 기록 유무 전환
  const [hasRecords, setHasRecords] = useState(false);

  // 더미 데이터 - 실제로는 API에서 가져올 데이터
  const dummyRecords: Record[] = [
    {
      id: '1',
      user: 'user.01',
      userPoints: 132,
      content:
        '내 생각에 이 부분이 가장 어려운 것 같다. 비유도 난해하고 잘 이해가 가지 않는데 다른 메이트들은 어떻게 읽었나요?',
      likeCount: 123,
      commentCount: 123,
      timeAgo: '12시간 전',
      type: 'text',
    },
    {
      id: '2',
      user: 'user.01',
      userPoints: 12,
      content: '3연에 나오는 심장은 무엇을 의미하는 걸까요?',
      likeCount: 123,
      commentCount: 123,
      timeAgo: '12시간 전',
      type: 'poll',
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
  ];

  const records = hasRecords ? dummyRecords : [];

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTabChange = (tab: RecordType) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filter: FilterType) => {
    if (filter === 'page') {
      // 페이지별 보기 클릭 - 인라인 입력 모드로 전환
      setActiveFilter(filter);
    } else if (filter === 'overall') {
      if (readingProgress < 80) {
        setShowSnackbar(true);
        return;
      }
      setActiveFilter(filter);
      setSelectedPageRange(null); // 총평 보기 선택 시 페이지 범위 초기화
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handlePageRangeClear = () => {
    setActiveFilter(null);
    setSelectedPageRange(null);
  };

  const handleAddRecord = () => {
    // 기록 작성 페이지로 이동 (구현 예정)
    console.log('기록 작성하기');
  };

  // 개발용 함수 - 기록 유무 전환
  const toggleRecords = () => {
    setHasRecords(!hasRecords);
  };

  return (
    <Container>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
        title="기록장"
      />

      <Content>
        {/* 개발용 버튼 */}
        <DevButton onClick={toggleRecords}>{hasRecords ? '기록 숨기기' : '기록 보이기'}</DevButton>

        <RecordTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* 그룹 기록일 때만 필터 표시 */}
        {activeTab === 'group' && (
          <RecordFilters
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            selectedPageRange={selectedPageRange}
            onPageRangeClear={handlePageRangeClear}
          />
        )}

        {/* 기록이 없을 때 빈 상태 표시 */}
        {records.length === 0 && <EmptyRecord type={activeTab} />}

        {/* 기록 목록 */}
        {records.length > 0 && (
          <RecordList>
            {records.map(record => (
              <RecordItem key={record.id} record={record} />
            ))}
          </RecordList>
        )}
      </Content>

      {/* 기록 추가 버튼 */}
      <AddButton onClick={handleAddRecord}>
        <img src={addFab} alt="기록 추가" />
      </AddButton>

      {/* 스낵바 */}
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
