import Skeleton from '../base/Skeleton';
import ProfileSkeleton from './ProfileSkeleton';
import TotalBarSkeleton from './TotalBarSkeleton';
import { SkeletonContainer, PostContainer, PostFooter } from './OtherFeedSkeleton.styled';

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
      <ProfileSkeleton showFollowButton={showFollowButton} />
      <TotalBarSkeleton />
      {Array.from({ length: 3 }).map((_, index) => (
        <OtherFeedPostSkeleton key={index} />
      ))}
    </SkeletonContainer>
  );
};

export default OtherFeedSkeleton;
