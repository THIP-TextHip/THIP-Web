import type { FilterType } from '../../pages/memory/Memory';
import {
  Container,
  FilterSection,
  FilterButton,
  SortSection,
  SortButton,
  DropdownIcon,
} from './RecordFilters.styled';

interface RecordFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  canViewOverall: boolean;
}

const RecordFilters = ({ activeFilter, onFilterChange, canViewOverall }: RecordFiltersProps) => {
  return (
    <Container>
      <FilterSection>
        <FilterButton active={activeFilter === 'page'} onClick={() => onFilterChange('page')}>
          페이지별 보기
        </FilterButton>
        <FilterButton
          active={activeFilter === 'overall'}
          disabled={!canViewOverall}
          onClick={() => onFilterChange('overall')}
        >
          총평 보기
        </FilterButton>
      </FilterSection>

      <SortSection>
        <SortButton>
          최신순
          <DropdownIcon />
        </SortButton>
      </SortSection>
    </Container>
  );
};

export default RecordFilters;
