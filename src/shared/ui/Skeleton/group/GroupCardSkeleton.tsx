import Skeleton from '../base/Skeleton';
import {
  Card,
  CoverWrapper,
  Cover,
  Info,
  Title,
  Bottom,
  Participant,
} from '@/components/group/GroupCard.styled';

interface Props {
  type?: 'main' | 'search' | 'modal';
  isRecommend?: boolean;
}

const GroupCardSkeleton = ({ type = 'search', isRecommend = false }: Props) => {
  return (
    <Card cardType={type} style={{ cursor: 'default', pointerEvents: 'none' }}>
      <CoverWrapper>
        <Cover
          as="div"
          cardType={type}
          isRecommend={isRecommend}
          style={{ background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Skeleton.Box width={type === 'search' || isRecommend ? 60 : 80} height={type === 'search' || isRecommend ? 80 : 107} />
        </Cover>
      </CoverWrapper>
      <Info>
        <Title as="div" isRecommend={isRecommend} style={{ marginBottom: '10px' }}>
          <Skeleton.Text width="100%" height={isRecommend ? 14 : 18} />
        </Title>
        <Bottom>
          <Participant as="div" isRecommend={isRecommend}>
            <Skeleton.Text width={60} height={12} />
          </Participant>
          <Skeleton.Text width={80} height={12} />
        </Bottom>
      </Info>
    </Card>
  );
};

export default GroupCardSkeleton;
