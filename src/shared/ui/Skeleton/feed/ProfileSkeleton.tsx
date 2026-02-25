import Skeleton from '../base/Skeleton';
import {
  ProfileContainer,
  UserProfileRow,
  UserInfo,
  UserText,
  FollowerRow,
  FollowerAvatars,
} from './ProfileSkeleton.styled';

interface ProfileSkeletonProps {
  showFollowButton?: boolean;
}

const ProfileSkeleton = ({ showFollowButton = true }: ProfileSkeletonProps) => {
  return (
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
  );
};

export default ProfileSkeleton;
