import Skeleton from '../base/Skeleton';

const DateDividerSkeleton = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Skeleton.Box width={120} height={45} borderRadius={16} />
    </div>
  );
};

export default DateDividerSkeleton;
