import Skeleton from '../base/Skeleton';
import {
  Container,
  UserSection,
  UserInfo,
  ContentSection,
  ActionSection,
} from '@/components/memory/RecordItem/RecordItem.styled';

const RecordItemSkeleton = () => {
  return (
    <Container style={{ cursor: 'default' }}>
      <UserSection>
        <div style={{ marginRight: '8px' }}>
          <Skeleton.Circle width={36} />
        </div>
        <UserInfo>
          <Skeleton.Text width={80} height={14} />
          <Skeleton.Text width={40} height={12} />
        </UserInfo>
        <Skeleton.Text width={60} height={12} />
      </UserSection>

      <ContentSection>
        <Skeleton.Text lines={3} height={14} gap={6} />
      </ContentSection>

      <ActionSection>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Skeleton.Box width={20} height={20} />
          <Skeleton.Text width={20} height={12} />
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Skeleton.Box width={20} height={20} />
          <Skeleton.Text width={20} height={12} />
        </div>
      </ActionSection>
    </Container>
  );
};

export default RecordItemSkeleton;
