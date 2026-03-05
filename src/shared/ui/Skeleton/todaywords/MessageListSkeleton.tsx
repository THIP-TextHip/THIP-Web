import DateDividerSkeleton from './DateDividerSkeleton';
import MessageItemSkeleton from './MessageItemSkeleton';
import { SkeletonWrapper } from './MessageListSkeleton.styled';

const MessageListSkeleton = () => {
  return (
    <SkeletonWrapper>
      <DateDividerSkeleton />
      {Array.from({ length: 4 }).map((_, index) => (
        <MessageItemSkeleton key={index} />
      ))}
    </SkeletonWrapper>
  );
};

export default MessageListSkeleton;
