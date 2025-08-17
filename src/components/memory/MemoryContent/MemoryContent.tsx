import type { RecordType, FilterType, Record } from '../../../pages/memory/Memory';
import type { SortType } from '../SortDropdown';
import RecordTabs from '../RecordTabs';
import RecordFilters from '../RecordFilters/RecordFilters';
import RecordInfoMessage from '../RecordInfoMessage';
import EmptyRecord from '../EmptyRecord';
import RecordList from './RecordList';
import UploadProgressBar from '../UploadProgressBar/UploadProgressBar';
import { Content, FixedSection, ScrollableSection, DevButton } from './MemoryContent.styled';

interface MemoryContentProps {
  activeTab: RecordType;
  activeFilter: FilterType | null;
  readingProgress: number;
  selectedSort: SortType;
  records: Record[];
  selectedPageRange: { start: number; end: number } | null;
  hasRecords: boolean;
  showUploadProgress: boolean;
  currentUserPage: number;
  onTabChange: (tab: RecordType) => void;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onPageRangeClear: () => void;
  onPageRangeSet: (range: { start: number; end: number }) => void;
  onToggleRecords: () => void;
  onUploadComplete: () => void;
}

const MemoryContent = ({
  activeTab,
  activeFilter,
  readingProgress,
  selectedSort,
  records,
  selectedPageRange,
  hasRecords,
  showUploadProgress,
  onTabChange,
  onFilterChange,
  onSortChange,
  onPageRangeClear,
  onPageRangeSet,
  onToggleRecords,
  onUploadComplete,
}: MemoryContentProps) => {
  return (
    <Content>
      {/* 개발용 버튼 */}
      <DevButton onClick={onToggleRecords}>{hasRecords ? '기록 숨기기' : '기록 보이기'}</DevButton>

      {/* 고정 영역: 탭과 필터만 */}
      <FixedSection>
        <RecordTabs activeTab={activeTab} onTabChange={onTabChange} />

        {/* 업로드 프로그레스 바 - 탭 바로 아래에 위치 */}
        <UploadProgressBar isVisible={showUploadProgress} onComplete={onUploadComplete} />

        {/* 그룹 기록일 때만 필터 표시 */}
        {activeTab === 'group' && (
          <RecordFilters
            activeFilter={activeFilter}
            readingProgress={readingProgress}
            selectedSort={selectedSort}
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            selectedPageRange={selectedPageRange}
            onPageRangeClear={onPageRangeClear}
            onPageRangeSet={onPageRangeSet}
          />
        )}
      </FixedSection>

      {/* 스크롤 가능한 영역: 안내 메시지부터 기록 목록까지 모두 */}
      <ScrollableSection>
        {/* 그룹 기록이고 기록이 있을 때만 안내 메시지 표시 */}
        {activeTab === 'group' && records.length > 0 && <RecordInfoMessage />}

        {/* 기록이 없을 때 빈 상태 표시 */}
        {records.length === 0 && <EmptyRecord type={activeTab} />}

        {/* 기록 목록 */}
        {records.length > 0 && <RecordList records={records} readingProgress={readingProgress} />}
      </ScrollableSection>
    </Content>
  );
};

export default MemoryContent;
