import { useState } from 'react';
import {
  Section,
  SectionTitle,
  PageRangeContainer,
  PageInput,
  CloseButton,
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
    onPageRangeChange(value);

    // 전체 페이지 수를 초과하면 에러 상태로 변경
    const pageMatch = value.match(/(\d+)p/);
    if (pageMatch) {
      const page = parseInt(pageMatch[1]);
      setHasError(page > totalPages);
    } else {
      setHasError(false);
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
        <PageInput
          placeholder={`456p/${totalPages}p`}
          value={pageRange}
          onChange={handleInputChange}
          hasError={hasError}
        />
        {pageRange && (
          <CloseButton onClick={handleClear}>
            <img src={closeIcon} alt="지우기" />
          </CloseButton>
        )}
      </PageRangeContainer>
      {hasError && (
        <div
          style={{
            color: '#FF9496',
            fontSize: '14px',
            marginTop: '8px',
            fontWeight: 400,
          }}
        >
          전체페이지를 초과할 수 없어요.
        </div>
      )}
    </Section>
  );
};

export default PageRangeSection;
