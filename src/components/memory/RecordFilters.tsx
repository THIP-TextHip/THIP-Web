import { useState } from 'react';
import type { FilterType } from '../../pages/memory/Memory';
import refreshIcon from '../../assets/memory/refresh.svg';
import checkIcon from '../../assets/memory/check.svg';
import xIcon from '../../assets/memory/x.svg';
import {
  Container,
  FilterSection,
  FilterButton,
  InputContainer,
  InputWrapper,
  PageInput,
  Separator,
  PageLabel,
  ResetButton,
  ConfirmButton,
  SortSection,
  SortButton,
  DropdownIcon,
} from './RecordFilters.styled';

interface RecordFiltersProps {
  activeFilter: FilterType | null;
  onFilterChange: (filter: FilterType) => void;
  selectedPageRange?: { start: number; end: number } | null;
  onPageRangeClear?: () => void;
  onPageRangeSelect?: (startPage: number, endPage: number) => void;
}

const RecordFilters = ({
  activeFilter,
  onFilterChange,
  selectedPageRange,
  onPageRangeClear,
  onPageRangeSelect,
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

  const isValid = startPage && endPage && parseInt(startPage) <= parseInt(endPage);

  // 하나라도 입력되었는지 확인
  const hasAnyInput = startPage.length > 0 || endPage.length > 0;

  // 페이지 입력 모드인지 확인
  const isPageInputMode = showInputMode && activeFilter === 'page' && !selectedPageRange;

  return (
    <Container>
      {isPageInputMode ? (
        // 페이지 입력 모드
        <>
          <InputContainer>
            <InputWrapper hasValue={startPage.length > 0}>
              <PageInput
                value={startPage}
                placeholder=""
                onChange={e => handleInputChange('start', e.target.value)}
                type="number"
                autoFocus
                style={{
                  width: startPage.length > 0 ? `${Math.max(36, startPage.length * 12)}px` : '36px',
                }}
              />
            </InputWrapper>
            <Separator>~</Separator>
            <InputWrapper hasValue={endPage.length > 0}>
              <PageInput
                value={endPage}
                placeholder=""
                onChange={e => handleInputChange('end', e.target.value)}
                type="number"
                style={{
                  width: endPage.length > 0 ? `${Math.max(36, endPage.length * 12)}px` : '36px',
                }}
              />
            </InputWrapper>
            <PageLabel>p</PageLabel>
            <ResetButton active={hasAnyInput} onClick={handleReset}>
              <img src={refreshIcon} alt="초기화" />
            </ResetButton>
            <ConfirmButton onClick={handleConfirm} disabled={!isValid}>
              <img src={checkIcon} alt="완료" />
            </ConfirmButton>
          </InputContainer>
        </>
      ) : (
        // 일반 필터 모드
        <>
          <FilterSection>
            <FilterButton active={activeFilter === 'page'} onClick={handlePageFilterClick}>
              페이지별 보기{' '}
              {activeFilter === 'page' && !showInputMode && <img src={xIcon} alt="초기화" />}
            </FilterButton>
            <FilterButton
              active={activeFilter === 'overall'}
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
        </>
      )}
    </Container>
  );
};

export default RecordFilters;
