import Skeleton from './Skeleton';
import {
  SkeletonContainer,
  ProfileContainer,
  UserProfileRow,
  UserInfo,
  UserText,
  FollowerRow,
  FollowerAvatars,
  TotalBarContainer,
  PostContainer,
  PostFooter,
} from './OtherFeedSkeleton.styled';

const OtherFeedPostSkeleton = () => (
  <PostContainer>
    <Skeleton.Box width="100%" height={44} borderRadius={8} />
    <Skeleton.Text lines={3} height={16} gap={8} />
    <PostFooter>
      <Skeleton.Box width={52} height={20} />
      <Skeleton.Box width={52} height={20} />
    </PostFooter>
  </PostContainer>
);

interface OtherFeedSkeletonProps {
  showFollowButton?: boolean;
  paddingTop?: number;
}

const OtherFeedSkeleton = ({ showFollowButton = true, paddingTop }: OtherFeedSkeletonProps) => {
  return (
    <SkeletonContainer paddingTop={paddingTop}>
      <ProfileContainer>
        <UserProfileRow>
          <UserInfo>
            <Skeleton.Circle width={54} />
            <UserText>
              <Skeleton.Text width={80} height={18} />
              <Skeleton.Text width={56} height={14} />
            </UserText>
          </UserInfo>
          {showFollowButton && <Skeleton.Box width={72} height={34} borderRadius={20} />}
        </UserProfileRow>

        <FollowerRow>
          <Skeleton.Text width={100} height={12} />
          <FollowerAvatars>
            <Skeleton.Circle width={24} />
            <Skeleton.Circle width={24} />
            <Skeleton.Circle width={24} />
          </FollowerAvatars>
        </FollowerRow>
      </ProfileContainer>

      <TotalBarContainer>
        <Skeleton.Text width={60} height={14} />
      </TotalBarContainer>

      {Array.from({ length: 3 }).map((_, index) => (
        <OtherFeedPostSkeleton key={index} />
      ))}
    </SkeletonContainer>
  );
};

export default OtherFeedSkeleton;
