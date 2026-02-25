import Skeleton from '../base/Skeleton';
import {
  Container,
  MemberItem,
  ProfileSection,
  MemberInfo,
  MemberStatus,
} from '@/components/members/MemberList.styled';

const MemberListSkeleton = () => {
  return (
    <Container>
      {Array.from({ length: 5 }).map((_, i) => (
        <MemberItem key={i} style={{ cursor: 'default', pointerEvents: 'none' }}>
          <ProfileSection>
            <div>
              <Skeleton.Circle width={36} />
            </div>
            <MemberInfo>
              <Skeleton.Text width={80} height={14} />
              <Skeleton.Text width={60} height={12} />
            </MemberInfo>
          </ProfileSection>
          <MemberStatus as="div">
            <Skeleton.Text width={80} height={11} />
          </MemberStatus>
          <div style={{ width: 24, height: 24, marginLeft: 4 }}>
            <Skeleton.Box width={24} height={24} />
          </div>
        </MemberItem>
      ))}
    </Container>
  );
};

export default MemberListSkeleton;
