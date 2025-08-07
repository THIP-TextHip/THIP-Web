import {
  GroupBookSection as StyledGroupBookSection,
  BookTitle,
  BookAuthor,
  ChevronIcon,
  RightSection,
} from './GroupBookSection.styled';
import rightChevron from '../../assets/group/right-chevron.svg';

interface GroupBookSectionProps {
  title: string;
  author: string;
  onClick: () => void;
}

const GroupBookSection = ({ title, author, onClick }: GroupBookSectionProps) => {
  return (
    <StyledGroupBookSection onClick={onClick}>
      <BookTitle>{title}</BookTitle>
      <RightSection>
        <BookAuthor>{author}</BookAuthor>
        <ChevronIcon src={rightChevron} alt="책 이동 버튼" />
      </RightSection>
    </StyledGroupBookSection>
  );
};

export default GroupBookSection;
