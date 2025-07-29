import { useState } from 'react';
import {
  Section,
  SectionTitle,
  PageRangeContainer,
  PageInputContainer,
  PageInput,
  PageSuffix,
  CloseButton,
  ErrorMessage,
} from './PageRangeSection.styled';
import closeIcon from '../../assets/common/closeIcon.svg';

interface PageRangeSectionProps {
  pageRange: string;
  onPageRangeChange: (value: string) => void;
  totalPages: number;
}

const PageRangeSection = ({ pageRange, onPageRangeChange, totalPages }: PageRangeSectionProps) => {
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 입력 허용
    if (value === '' || /^\d+$/.test(value)) {
      onPageRangeChange(value);

      // 전체 페이지 수를 초과하면 에러 상태로 변경
      if (value !== '') {
        const page = parseInt(value);
        setHasError(page > totalPages);
      } else {
        setHasError(false);
      }
    }
  };

  const handleClear = () => {
    onPageRangeChange('');
    setHasError(false);
  };

  return (
    <Section>
      <SectionTitle>기록할 페이지</SectionTitle>
      <PageRangeContainer>
        <PageInputContainer hasError={hasError}>
          <PageInput
            placeholder="456"
            value={pageRange}
            onChange={handleInputChange}
            inputMode="numeric"
          />
          <PageSuffix>/{totalPages}p</PageSuffix>
        </PageInputContainer>
        {pageRange && (
          <CloseButton onClick={handleClear}>
            <img src={closeIcon} alt="지우기" />
          </CloseButton>
        )}
      </PageRangeContainer>
      {hasError && <ErrorMessage>전체페이지를 초과할 수 없어요.</ErrorMessage>}
    </Section>
  );
};

export default PageRangeSection;
