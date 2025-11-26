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
  TooltipContainer,
  Tooltip,
  TooltipText,
  TooltipCloseButton,
  TooltipArrow,
} from './PageRangeSection.styled';
import closeIcon from '../../assets/common/delete.svg';
import infoIcon from '../../assets/common/infoIcon.svg';
import recordcloseIcon from '../../assets/memory/record-x.svg';

interface PageRangeSectionProps {
  pageRange: string;
  onPageRangeChange: (value: string) => void;
  totalPages: number;
  lastRecordedPage?: number;
  isOverallEnabled: boolean;
  onOverallToggle: () => void;
  readingProgress: number;
  isOverviewPossible: boolean;
  isDisabled?: boolean;
  hideToggle?: boolean;
}

const PageRangeSection = ({
  pageRange,
  onPageRangeChange,
  totalPages,
  lastRecordedPage = 0,
  isOverallEnabled,
  onOverallToggle,
  readingProgress,
  isDisabled = false,
  hideToggle = false,
}: PageRangeSectionProps) => {
  const [hasError, setHasError] = useState(false);
  const [showRedTooltip, setShowRedTooltip] = useState(false);
  const [showGreenTooltip, setShowGreenTooltip] = useState(false);
  const canUseOverall = readingProgress >= 80;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || /^\d+$/.test(value)) {
      onPageRangeChange(value);

      if (value !== '') {
        const page = parseInt(value);
        setHasError(isNaN(page) || page <= 0 || page > totalPages);
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
    } else {
      setShowRedTooltip(true);
      setShowGreenTooltip(false);
    }
  };

  const handleInfoClick = () => {
    setShowGreenTooltip(true);
    setShowRedTooltip(false);
  };

  const handleCloseTooltip = () => {
    setShowRedTooltip(false);
    setShowGreenTooltip(false);
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
                inputLength={pageRange.length || lastRecordedPage.toString().length}
                disabled={isDisabled}
              />
              <PageSuffix>/{totalPages}p</PageSuffix>
            </InputWrapper>
          )}
        </PageInputContainer>
        {!isOverallEnabled && pageRange && !isDisabled && (
          <CloseButton onClick={handleClear}>
            <img src={closeIcon} alt="지우기" />
          </CloseButton>
        )}
      </PageRangeContainer>
      {!isOverallEnabled && hasError && <ErrorMessage>전체페이지를 초과할 수 없어요.</ErrorMessage>}

      <TooltipContainer>
        {showRedTooltip && (
          <Tooltip variant="red">
            <TooltipText variant="red">
              독서 진행도 80%를 달성해야 총평을 작성할 수 있어요.
            </TooltipText>
            <TooltipCloseButton onClick={handleCloseTooltip}>
              <img src={recordcloseIcon} alt="닫기" />
            </TooltipCloseButton>
            <TooltipArrow variant="red" />
          </Tooltip>
        )}
        {showGreenTooltip && (
          <Tooltip variant="green">
            <TooltipText variant="green">
              독서 진행도 80%를 달성해야 총평을 작성할 수 있어요.
            </TooltipText>
            <TooltipCloseButton onClick={handleCloseTooltip}>
              <img src={recordcloseIcon} alt="닫기" />
            </TooltipCloseButton>
            <TooltipArrow variant="green" />
          </Tooltip>
        )}
        {!hideToggle && (
          <ToggleContainer>
            <LeftSection>
              <InfoIcon onClick={handleInfoClick}>
                <img src={infoIcon} alt="정보" />
              </InfoIcon>
              <ToggleLabel disabled={!canUseOverall}>총평</ToggleLabel>
            </LeftSection>
            <ToggleSwitch
              active={isOverallEnabled}
              onClick={handleToggleClick}
              disabled={!canUseOverall || isDisabled}
            >
              <ToggleSlider active={isOverallEnabled} disabled={!canUseOverall} />
            </ToggleSwitch>
          </ToggleContainer>
        )}
      </TooltipContainer>
    </Section>
  );
};

export default PageRangeSection;
