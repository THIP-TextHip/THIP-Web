import type { RecordType, FilterType, Record } from '../../../pages/memory/Memory';
import RecordTabs from '../../../components/memory/RecordTabs';
import RecordFilters from '../../../components/memory/RecordFilters/RecordFilters';
import RecordInfoMessage from '../../../components/memory/RecordInfoMessage';
import EmptyRecord from '../../../components/memory/EmptyRecord';
import RecordList from './RecordList';
import { Content, DevButton } from './MemoryContent.styled';

interface MemoryContentProps {
  activeTab: RecordType;
  activeFilter: FilterType | null;
  readingProgress: number;
  records: Record[];
  selectedPageRange: { start: number; end: number } | null;
  hasRecords: boolean;
  onTabChange: (tab: RecordType) => void;
  onFilterChange: (filter: FilterType) => void;
  onPageRangeClear: () => void;
  onToggleRecords: () => void;
}

const MemoryContent = ({
  activeTab,
  activeFilter,
  readingProgress,
  records,
  selectedPageRange,
  hasRecords,
  onTabChange,
  onFilterChange,
  onPageRangeClear,
  onToggleRecords,
}: MemoryContentProps) => {
  return (
    <Content>
      {/* 개발용 버튼 */}
      <DevButton onClick={onToggleRecords}>{hasRecords ? '기록 숨기기' : '기록 보이기'}</DevButton>

      <RecordTabs activeTab={activeTab} onTabChange={onTabChange} />

      {/* 그룹 기록일 때만 필터 표시 */}
      {activeTab === 'group' && (
        <>
          <RecordFilters
            activeFilter={activeFilter}
            readingProgress={readingProgress}
            onFilterChange={onFilterChange}
            selectedPageRange={selectedPageRange}
            onPageRangeClear={onPageRangeClear}
          />
          {/* 기록이 있을 때만 안내 메시지 표시 */}
          {records.length > 0 && <RecordInfoMessage />}
        </>
      )}

      {/* 기록이 없을 때 빈 상태 표시 */}
      {records.length === 0 && <EmptyRecord type={activeTab} />}

      {/* 기록 목록 */}
      {records.length > 0 && <RecordList records={records} readingProgress={readingProgress} />}
    </Content>
  );
};

export default MemoryContent;
