import { useState } from 'react';
import type { FilterType } from '../../../pages/memory/Memory';
import type { SortType } from '../SortDropdown';
import PageInputMode from './PageInputMode';
import FilterButtons from './FilterButtons';
import { Container } from './RecordFilters.styled';

interface RecordFiltersProps {
  activeFilter: FilterType | null;
  readingProgress: number;
  selectedSort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  selectedPageRange?: { start: number; end: number } | null;
  onPageRangeClear?: () => void;
}

const RecordFilters = ({
  activeFilter,
  readingProgress,
  selectedSort,
  onFilterChange,
  onSortChange,
  selectedPageRange,
  onPageRangeClear,
}: RecordFiltersProps) => {
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [showInputMode, setShowInputMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePageFilterClick = () => {
    if (selectedPageRange) {
      // 이미 선택된 범위가 있으면 초기화
      if (onPageRangeClear) {
        onPageRangeClear();
        setShowInputMode(false);
      }
    } else {
      // 입력 모드로 전환
      setShowInputMode(true);
      onFilterChange('page');
    }
  };

  const handleInputChange = (type: 'start' | 'end', value: string) => {
    // 숫자만 입력 허용
    const numericValue = value.replace(/[^0-9]/g, '');

    if (type === 'start') {
      setStartPage(numericValue);
    } else {
      setEndPage(numericValue);
    }
  };

  const handleReset = () => {
    setStartPage('');
    setEndPage('');
  };

  const handleConfirm = () => {
    const start = parseInt(startPage);
    const end = parseInt(endPage);

    if (start && end && start <= end) {
      setShowInputMode(false);
      setStartPage('');
      setEndPage('');
    }
  };

  const handleOverallFilterClick = () => {
    onFilterChange('overall');
  };

  const handleSortButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortSelect = (sort: SortType) => {
    onSortChange(sort);
    setIsDropdownOpen(false);
  };

  const isValid = Boolean(startPage && endPage && parseInt(startPage) <= parseInt(endPage));
  const hasAnyInput = startPage.length > 0 || endPage.length > 0;
  const isPageInputMode = showInputMode && activeFilter === 'page' && !selectedPageRange;

  return (
    <Container>
      {isPageInputMode ? (
        <PageInputMode
          startPage={startPage}
          endPage={endPage}
          onInputChange={handleInputChange}
          onReset={handleReset}
          onConfirm={handleConfirm}
          hasAnyInput={hasAnyInput}
          isValid={isValid}
        />
      ) : (
        <FilterButtons
          activeFilter={activeFilter}
          showInputMode={showInputMode}
          readingProgress={readingProgress}
          selectedSort={selectedSort}
          isDropdownOpen={isDropdownOpen}
          onPageFilterClick={handlePageFilterClick}
          onOverallFilterClick={handleOverallFilterClick}
          onSortButtonClick={handleSortButtonClick}
          onSortSelect={handleSortSelect}
        />
      )}
    </Container>
  );
};

export default RecordFilters;
