import Skeleton from '../base/Skeleton';
import { Wrapper, UserProfile } from '@/components/feed/UserProfileItem.styled';

interface UserProfileItemSkeletonProps {
  type?: 'followlist' | 'followerlist';
}

const UserProfileItemSkeleton = ({ type = 'followerlist' }: UserProfileItemSkeletonProps) => {
  return (
    <Wrapper isLast={false} style={{ cursor: 'default', pointerEvents: 'none' }}>
      <UserProfile>
        <div className="userInfo">
          <div>
            <Skeleton.Circle width={36} />
          </div>
          <div className="user">
            <Skeleton.Text width={80} height={14} />
            <Skeleton.Text width={60} height={12} />
          </div>
        </div>
        {type === 'followlist' && (
          <div className="followbutton" style={{ cursor: 'default' }}>
            <Skeleton.Text width={60} height={14} />
          </div>
        )}
        {type === 'followerlist' && (
          <div className="followlistbutton">
            <Skeleton.Text width={100} height={11} />
          </div>
        )}
      </UserProfile>
    </Wrapper>
  );
};

export default UserProfileItemSkeleton;
