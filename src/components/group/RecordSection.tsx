import {
  RecordSection as StyledRecordSection,
  RecordSectionHeader,
  RecordSectionTitle,
  RecordSectionChevron,
  RecordSectionContent,
  BookTitle,
  CurrentPage,
  ProgressSection,
  ProgressBar,
  ProgressBarFill,
  ProgressText,
} from './RecordSection.styled';
import rightChevron from '../../assets/common/right-Chevron.svg';

interface RecordSectionProps {
  bookAuthor: string;
  currentPage: number;
  progress: number;
  onClick: () => void;
}

const RecordSection = ({ bookAuthor, currentPage, progress, onClick }: RecordSectionProps) => {
  return (
    <StyledRecordSection>
      <RecordSectionHeader onClick={onClick}>
        <RecordSectionTitle>기록장</RecordSectionTitle>
        <RecordSectionChevron src={rightChevron} alt="기록장 이동 버튼" />
      </RecordSectionHeader>
      <RecordSectionContent>
        <BookTitle>{bookAuthor}</BookTitle>
        <CurrentPage>현재 페이지 {currentPage}</CurrentPage>
        <ProgressSection>
          <ProgressBar>
            <ProgressBarFill progress={progress} />
          </ProgressBar>
          <ProgressText>{progress}%</ProgressText>
        </ProgressSection>
      </RecordSectionContent>
    </StyledRecordSection>
  );
};

export default RecordSection;
