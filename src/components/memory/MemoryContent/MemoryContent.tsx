import type { RecordType, FilterType } from '../../../pages/memory/Memory';
import type { Record } from '../../../types/memory';
import type { SortType } from '../SortDropdown';
import RecordTabs from '../RecordTabs';
import RecordFilters from '../RecordFilters/RecordFilters';
import RecordInfoMessage from '../RecordInfoMessage';
import EmptyRecord from '../EmptyRecord';
import RecordList from './RecordList';
import UploadProgressBar from '../UploadProgressBar/UploadProgressBar';
import { Content, FixedSection, ScrollableSection } from './MemoryContent.styled';

interface MemoryContentProps {
  activeTab: RecordType;
  activeFilter: FilterType | null;
  readingProgress: number;
  selectedSort: SortType;
  records: Record[];
  selectedPageRange: { start: number; end: number } | null;
  showUploadProgress: boolean;
  onTabChange: (tab: RecordType) => void;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onPageRangeClear: () => void;
  onPageRangeSet: (range: { start: number; end: number }) => void;
  onUploadComplete: () => void;
}

const MemoryContent = ({
  activeTab,
  activeFilter,
  readingProgress,
  selectedSort,
  records,
  selectedPageRange,
  showUploadProgress,
  onTabChange,
  onFilterChange,
  onSortChange,
  onPageRangeClear,
  onPageRangeSet,
  onUploadComplete,
}: MemoryContentProps) => {
  return (
    <Content>
      <FixedSection>
        <RecordTabs activeTab={activeTab} onTabChange={onTabChange} />

        <UploadProgressBar isVisible={showUploadProgress} onComplete={onUploadComplete} />

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

      <ScrollableSection>
        {activeTab === 'group' && records.length > 0 && <RecordInfoMessage />}

        {records.length === 0 && <EmptyRecord type={activeTab} />}

        {records.length > 0 && <RecordList records={records} />}
      </ScrollableSection>
    </Content>
  );
};

export default MemoryContent;
