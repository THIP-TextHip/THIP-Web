import Skeleton from '../base/Skeleton';
import {
  Container,
  Header,
  ContentWrapper,
  ImageSkeleton,
  Footer,
} from './FeedPostSkeleton.styled';

/**
 * FeedPost 스켈레톤 컴포넌트 예시
 * 피드 포스트 로딩 시 사용
 */
const FeedPostSkeleton = () => {
  return (
    <Container>
      <Header>
        <Skeleton.Circle width={40} />
        <Skeleton.Text width="120px" height={16} />
      </Header>

      <ContentWrapper>
        <Skeleton.Text lines={3} height={16} gap={8} />
        <ImageSkeleton width="100%" height="200px" borderRadius={8} />
      </ContentWrapper>

      <Footer>
        <Skeleton.Box width={60} height={20} />
        <Skeleton.Box width={60} height={20} />
      </Footer>
    </Container>
  );
};

export default FeedPostSkeleton;
