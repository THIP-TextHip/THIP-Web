import { useState } from 'react';
import {
  Section,
  SectionTitle,
  PageRangeContainer,
  PageInputContainer,
  InputWrapper,
  PageInput,
  PageSuffix,
  OverallRangeText,
  CloseButton,
  ErrorMessage,
  ToggleContainer,
  LeftSection,
  InfoIcon,
  ToggleLabel,
  ToggleSwitch,
  ToggleSlider,
} from './PageRangeSection.styled';
import closeIcon from '../../assets/common/delete.svg';
import infoIcon from '../../assets/common/infoIcon.svg';

interface PageRangeSectionProps {
  pageRange: string;
  onPageRangeChange: (value: string) => void;
  totalPages: number;
  lastRecordedPage?: number;
  isOverallEnabled: boolean;
  onOverallToggle: () => void;
  readingProgress: number;
}

const PageRangeSection = ({
  pageRange,
  onPageRangeChange,
  totalPages,
  lastRecordedPage = 0,
  isOverallEnabled,
  onOverallToggle,
  readingProgress,
}: PageRangeSectionProps) => {
  const [hasError, setHasError] = useState(false);

  // 80% 이상일 때만 총평 활성화
  const canUseOverall = readingProgress >= 80;

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

  const handleToggleClick = () => {
    if (canUseOverall) {
      onOverallToggle();
    }
    // 80% 미만이면 아무것도 하지 않음
  };

  return (
    <Section>
      <SectionTitle>기록할 페이지</SectionTitle>
      <PageRangeContainer>
        <PageInputContainer hasError={hasError}>
          {isOverallEnabled ? (
            <OverallRangeText>전체범위</OverallRangeText>
          ) : (
            <InputWrapper>
              <PageInput
                placeholder={lastRecordedPage.toString()}
                value={pageRange}
                onChange={handleInputChange}
                inputMode="numeric"
              />
              <PageSuffix>/{totalPages}p</PageSuffix>
            </InputWrapper>
          )}
        </PageInputContainer>
        {!isOverallEnabled && pageRange && (
          <CloseButton onClick={handleClear}>
            <img src={closeIcon} alt="지우기" />
          </CloseButton>
        )}
      </PageRangeContainer>
      {!isOverallEnabled && hasError && <ErrorMessage>전체페이지를 초과할 수 없어요.</ErrorMessage>}

      <ToggleContainer>
        <LeftSection>
          <InfoIcon>
            <img src={infoIcon} alt="정보" />
          </InfoIcon>
          <ToggleLabel disabled={!canUseOverall}>총평</ToggleLabel>
        </LeftSection>
        <ToggleSwitch
          active={isOverallEnabled}
          onClick={handleToggleClick}
          disabled={!canUseOverall}
        >
          <ToggleSlider active={isOverallEnabled} disabled={!canUseOverall} />
        </ToggleSwitch>
      </ToggleContainer>
    </Section>
  );
};

export default PageRangeSection;
