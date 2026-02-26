import Skeleton from '../base/Skeleton';
import { MessageSkeletonItem, UserInfoSkeleton, UserDetailsSkeleton } from './MessageListSkeleton.styled';

const MessageItemSkeleton = () => {
  return (
    <MessageSkeletonItem>
      <UserInfoSkeleton>
        <Skeleton.Circle width={36} />
        <UserDetailsSkeleton>
          <Skeleton.Text width={60} height={12} />
          <Skeleton.Text width={40} height={10} />
        </UserDetailsSkeleton>
      </UserInfoSkeleton>
      <Skeleton.Text lines={2} height={14} gap={6} />
    </MessageSkeletonItem>
  );
};

export default MessageItemSkeleton;
