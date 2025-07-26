import type { FilterType } from '../../../pages/memory/Memory';
import xIcon from '../../../assets/memory/x.svg';
import {
  FilterSection,
  FilterButton,
  SortSection,
  SortButton,
  DropdownIcon,
} from './FilterButtons.styled';

interface FilterButtonsProps {
  activeFilter: FilterType | null;
  showInputMode: boolean;
  readingProgress: number;
  onPageFilterClick: () => void;
  onOverallFilterClick: () => void;
}

const FilterButtons = ({
  activeFilter,
  showInputMode,
  readingProgress,
  onPageFilterClick,
  onOverallFilterClick,
}: FilterButtonsProps) => {
  const isOverallEnabled = readingProgress >= 80;

  return (
    <>
      <FilterSection>
        <FilterButton active={activeFilter === 'page'} onClick={onPageFilterClick}>
          페이지별 보기{' '}
          {activeFilter === 'page' && !showInputMode && <img src={xIcon} alt="초기화" />}
        </FilterButton>
        <FilterButton
          active={activeFilter === 'overall'}
          $disabled={!isOverallEnabled}
          onClick={onOverallFilterClick}
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
    </>
  );
};

export default FilterButtons;
