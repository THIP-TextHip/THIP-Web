import Skeleton from '../base/Skeleton';
import {
  HotTopicSection as StyledHotTopicSection,
  HotTopicSectionHeader,
  HotTopicContent,
} from '@/components/group/HotTopicSection.styled';

const HotTopicSectionSkeleton = () => {
  return (
    <StyledHotTopicSection>
      <HotTopicSectionHeader>
        <Skeleton.Text width={140} height={18} />
      </HotTopicSectionHeader>
      <HotTopicContent>
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: '16px' }}>
            <Skeleton.Text width="80%" height={16} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton.Box width="100%" height={40} borderRadius={8} />
            <Skeleton.Box width="100%" height={40} borderRadius={8} />
          </div>
        </div>
      </HotTopicContent>
    </StyledHotTopicSection>
  );
};

export default HotTopicSectionSkeleton;
