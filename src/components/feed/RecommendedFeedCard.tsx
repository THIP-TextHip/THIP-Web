import styled from '@emotion/styled';
import PostBody from '../common/Post/PostBody';
import PostFooter from '../common/Post/PostFooter';
import PostHeader from '../common/Post/PostHeader';
import type { PostData } from '../../types/post';
import { colors } from '@/styles/global/global';
import lookmoreInfluencer from '@/assets/feed/lookmore-influencer.svg';

interface RecommendedFeedCardProps extends PostData {
  aliasColor?: string;
}

const RecommendedFeedCard = (postData: RecommendedFeedCardProps) => {
  const handleCardClick = () => {
    window.open(`/feed/${postData.feedId}`, '_blank');
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <PostHeader {...postData} aliasName={postData.alias} aliasColor={postData.aliasColor} />
      <PostBodyWrapper>
        <PostBody {...postData} />
        <PostFooter isMyFeed={false} {...postData} />
      </PostBodyWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  background-color: ${colors.darkgrey.dark};
  border-radius: 12px;
  width: 100%;
  height: 100%;

  > *:last-child {
    margin-top: auto;
  }

  /* 북마크 아이콘 숨기기 */
  .right {
    display: none;
  }
`;

const PostBodyWrapper = styled.div`
  .content {
    -webkit-line-clamp: 3 !important;
    min-height: 60px;
  }

  /* prettier-ignore */
  && img.lookmore-icon,
  && .lookmore-icon {
    content: url("${lookmoreInfluencer}") !important;
  }

  /* 책 카드 클릭 무효화 - 카드 전체 클릭만 작동하도록 */
  > div > div:first-of-type {
    pointer-events: none;
  }
`;

export default RecommendedFeedCard;
