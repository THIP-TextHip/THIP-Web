import styled from '@emotion/styled';
import PostBody from '../common/Post/PostBody';
import PostFooter from '../common/Post/PostFooter';
import PostHeader from '../common/Post/PostHeader';
import type { PostData } from '../../types/post';
import { colors } from '@/styles/global/global';

interface RecommendedFeedCardProps extends PostData {
  aliasColor?: string;
}

const RecommendedFeedCard = (postData: RecommendedFeedCardProps) => {
  return (
    <CardContainer>
      <PostHeader {...postData} aliasName={postData.alias} aliasColor={postData.aliasColor} />
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
