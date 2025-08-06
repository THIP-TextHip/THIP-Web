import {
  RecordSection as StyledRecordSection,
  RecordSectionHeader,
  RecordSectionTitle,
  RecordSectionChevron,
  RecordSectionContent,
  CurrentPage,
  ProgressBar,
  PercentText,
  ProgressBarFill,
  ProgressText,
} from './RecordSection.styled';
import rightChevron from '../../assets/group/right-chevron.svg';

interface RecordSectionProps {
  bookAuthor: string;
  currentPage: number;
  progress: number;
  onClick: () => void;
}

const RecordSection = ({ currentPage, progress, onClick }: RecordSectionProps) => {
  return (
    <StyledRecordSection>
      <RecordSectionHeader onClick={onClick}>
        <RecordSectionTitle>기록장</RecordSectionTitle>
        <RecordSectionChevron src={rightChevron} alt="기록장 이동 버튼" />
      </RecordSectionHeader>
      <RecordSectionContent>
        <CurrentPage>현재 페이지 {currentPage}</CurrentPage>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <ProgressText>{progress}</ProgressText>
          <PercentText>%</PercentText>
        </div>
        <ProgressBar>
          <ProgressBarFill progress={progress} />
        </ProgressBar>
      </RecordSectionContent>
    </StyledRecordSection>
  );
};

export default RecordSection;
