import styled from '@emotion/styled';
import PostBody from '../common/Post/PostBody';
import PostFooter from '../common/Post/PostFooter';
import PostHeader from '../common/Post/PostHeader';
import type { PostData } from '../../types/post';
import { colors } from '@/styles/global/global';

const RecommendedFeedCard = (postData: PostData) => {
  return (
    <CardContainer>
      <PostHeader {...postData} />
      <PostBody {...postData} />
      <PostFooter isMyFeed={false} {...postData} />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: ${colors.darkgrey.dark};
  border-radius: 12px;
  width: 100%;
  height: 100%;
`;

export default RecommendedFeedCard;
