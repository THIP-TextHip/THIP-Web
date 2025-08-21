import {
  CommentSection as StyledCommentSection,
  CommentSectionHeader,
  CommentSectionTitle,
  CommentSectionChevron,
  CommentContent,
  CommentText,
} from './CommentSection.styled';
import rightChevron from '../../assets/group/right-chevron.svg';

interface CommentSectionProps {
  message: string;
  onClick: () => void;
}

const CommentSection = ({ message, onClick }: CommentSectionProps) => {
  return (
    <StyledCommentSection onClick={onClick}>
      <CommentSectionHeader>
        <CommentSectionTitle>오늘의 한마디</CommentSectionTitle>
        <CommentSectionChevron src={rightChevron} alt="한마디 이동 버튼" />
      </CommentSectionHeader>
      <CommentContent>
        <CommentText>{message}</CommentText>
      </CommentContent>
    </StyledCommentSection>
  );
};

export default CommentSection;
