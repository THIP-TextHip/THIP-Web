import Skeleton from '../base/Skeleton';
import {
  CommentSection as StyledCommentSection,
  CommentSectionHeader,
  CommentContent,
} from '@/components/group/CommentSection.styled';

const CommentSectionSkeleton = () => {
  return (
    <StyledCommentSection style={{ cursor: 'default' }}>
      <CommentSectionHeader>
        <Skeleton.Text width={100} height={18} />
        <Skeleton.Box width={24} height={24} />
      </CommentSectionHeader>
      <CommentContent>
        <Skeleton.Text width="90%" height={14} />
      </CommentContent>
    </StyledCommentSection>
  );
};

export default CommentSectionSkeleton;
