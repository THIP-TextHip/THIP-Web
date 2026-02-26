import Skeleton from '../base/Skeleton';
import { BookSkeletonInfo, BookSkeletonDetails } from './GroupDetailSkeleton.styled';

const BookSkeleton = () => {
  return (
    <>
      {/* Book Header */}
      <Skeleton.Text width={150} height={18} />

      {/* Book Info */}
      <BookSkeletonInfo>
        <Skeleton.Box width={80} height={107} />
        <BookSkeletonDetails>
          <Skeleton.Text width={120} height={12} />
          <div style={{ marginTop: '8px' }}>
            <Skeleton.Text width={60} height={12} />
            <div style={{ marginTop: '4px' }}>
              <Skeleton.Text lines={3} height={12} gap={4} />
            </div>
          </div>
        </BookSkeletonDetails>
      </BookSkeletonInfo>
    </>
  );
};

export default BookSkeleton;
