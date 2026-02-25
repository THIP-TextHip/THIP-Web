import Skeleton from '../base/Skeleton';
import { TotalBarContainer } from './TotalBarSkeleton.styled';

const TotalBarSkeleton = () => {
  return (
    <TotalBarContainer>
      <Skeleton.Text width={60} height={14} />
    </TotalBarContainer>
  );
};

export default TotalBarSkeleton;
