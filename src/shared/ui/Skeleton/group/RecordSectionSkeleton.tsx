import Skeleton from '../base/Skeleton';
import {
  RecordSection as StyledRecordSection,
  RecordSectionHeader,
  RecordSectionContent,
} from '@/components/group/RecordSection.styled';

const RecordSectionSkeleton = () => {
  return (
    <StyledRecordSection style={{ cursor: 'default' }}>
      <RecordSectionHeader>
        <Skeleton.Text width={60} height={18} />
        <Skeleton.Box width={24} height={24} />
      </RecordSectionHeader>
      <RecordSectionContent>
        <Skeleton.Text width={100} height={14} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <Skeleton.Text width={40} height={32} />
          <Skeleton.Text width={20} height={16} />
        </div>
        <Skeleton.Box width="100%" height={8} borderRadius={4} />
      </RecordSectionContent>
    </StyledRecordSection>
  );
};

export default RecordSectionSkeleton;
