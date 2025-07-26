import { useState } from 'react';
import type { FilterType } from '../../../pages/memory/Memory';
import PageInputMode from './PageInputMode';
import FilterButtons from './FilterButtons';
import { Container } from './RecordFilters.styled';

interface RecordFiltersProps {
  activeFilter: FilterType | null;
  onFilterChange: (filter: FilterType) => void;
  selectedPageRange?: { start: number; end: number } | null;
  onPageRangeClear?: () => void;
}

const RecordFilters = ({
  activeFilter,
  onFilterChange,
  selectedPageRange,
  onPageRangeClear,
}: RecordFiltersProps) => {
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [showInputMode, setShowInputMode] = useState(false);

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
          onPageFilterClick={handlePageFilterClick}
          onOverallFilterClick={handleOverallFilterClick}
        />
      )}
    </Container>
  );
};

export default RecordFilters;
