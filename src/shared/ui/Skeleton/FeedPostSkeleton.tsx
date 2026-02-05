import styled from '@emotion/styled';
import Skeleton from './Skeleton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 16px;
  background-color: var(--color-black-main);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ImageSkeleton = styled(Skeleton.Box)`
  margin-top: 8px;
`;

const Footer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

/**
 * FeedPost 스켈레톤 컴포넌트 예시
 * 피드 포스트 로딩 시 사용
 */
const FeedPostSkeleton = () => {
  return (
    <Container>
      {/* 헤더: 프로필 이미지 + 사용자 이름 */}
      <Header>
        <Skeleton.Circle width={40} />
        <Skeleton.Text width="120px" height={16} />
      </Header>

      {/* 본문: 텍스트 라인들 */}
      <ContentWrapper>
        <Skeleton.Text lines={3} height={16} gap={8} />
        {/* 이미지가 있는 경우 */}
        <ImageSkeleton width="100%" height="200px" borderRadius={8} />
      </ContentWrapper>

      {/* 푸터: 아이콘 버튼들 */}
      <Footer>
        <Skeleton.Box width={60} height={20} />
        <Skeleton.Box width={60} height={20} />
      </Footer>
    </Container>
  );
};

export default FeedPostSkeleton;
