import Skeleton from '../base/Skeleton';
import {
  MetaSkeletonRow,
  MetaSkeletonItem,
  TagSkeletonRow,
} from './GroupDetailSkeleton.styled';

const BannerSkeleton = () => {
  return (
    <>
      {/* Group Title */}
      <Skeleton.Text width={200} height={24} />

      {/* Subtitle & Intro */}
      <div style={{ marginTop: '20px' }}>
        <Skeleton.Text width={60} height={14} />
        <div style={{ marginTop: '8px' }}>
          <Skeleton.Text lines={2} height={12} gap={6} />
        </div>
      </div>

      {/* Meta Info */}
      <MetaSkeletonRow>
        <MetaSkeletonItem>
          <Skeleton.Text width={100} height={12} />
          <Skeleton.Text width={150} height={12} />
        </MetaSkeletonItem>
        <MetaSkeletonItem>
          <Skeleton.Text width={120} height={12} />
          <Skeleton.Text width={60} height={12} />
        </MetaSkeletonItem>
      </MetaSkeletonRow>

      {/* Tags */}
      <TagSkeletonRow>
        <Skeleton.Box width={100} height={28} borderRadius={14} />
        <Skeleton.Box width={80} height={28} borderRadius={14} />
      </TagSkeletonRow>
    </>
  );
};

export default BannerSkeleton;
