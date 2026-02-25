import Skeleton from '../base/Skeleton';
import {
  GroupBookSection as StyledGroupBookSection,
  RightSection,
} from '@/components/group/GroupBookSection.styled';

const GroupBookSectionSkeleton = () => {
  return (
    <StyledGroupBookSection style={{ cursor: 'default', pointerEvents: 'none' }}>
      <Skeleton.Text width={150} height={16} />
      <RightSection>
        <Skeleton.Text width={80} height={12} />
        <Skeleton.Box width={24} height={24} />
      </RightSection>
    </StyledGroupBookSection>
  );
};

export default GroupBookSectionSkeleton;
