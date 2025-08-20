import type { FilterType } from '../../../pages/memory/Memory';
import type { SortType } from '../SortDropdown';
import xIcon from '../../../assets/memory/x.svg';
import downIcon from '../../../assets/memory/down.svg';
import SortDropdown from '../SortDropdown';
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
  selectedSort: SortType;
  isDropdownOpen: boolean;
  onPageFilterClick: () => void;
  onOverallFilterClick: () => void;
  onSortButtonClick: () => void;
  onSortSelect: (sort: SortType) => void;
}

const FilterButtons = ({
  activeFilter,
  showInputMode,
  readingProgress,
  selectedSort,
  isDropdownOpen,
  onPageFilterClick,
  onOverallFilterClick,
  onSortButtonClick,
  onSortSelect,
}: FilterButtonsProps) => {
  const isOverallEnabled = readingProgress >= 80;

  const getSortLabel = (sort: SortType) => {
    switch (sort) {
      case 'latest':
        return '최신순';
      case 'like':
        return '인기순';
      case 'comment':
        return '댓글 많은순';
      default:
        return '최신순';
    }
  };

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
          onClick={isOverallEnabled ? onOverallFilterClick : undefined}
        >
          총평 보기
        </FilterButton>
      </FilterSection>

      <SortSection>
        <SortButton onClick={onSortButtonClick}>
          {getSortLabel(selectedSort)}
          <DropdownIcon src={downIcon} alt="드롭다운" isOpen={isDropdownOpen} />
        </SortButton>
        <SortDropdown
          isOpen={isDropdownOpen}
          selectedSort={selectedSort}
          onSortSelect={onSortSelect}
        />
      </SortSection>
    </>
  );
};

export default FilterButtons;
