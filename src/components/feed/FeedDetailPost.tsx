import styled from '@emotion/styled';
import PostHeader from '@/components/common/Post/PostHeader';
import FeedDetailPostBody from './FeedDetailPostBody';
import PostFooter from '@/components/common/Post/PostFooter';
import type { FeedDetailData } from '@/api/feeds/getFeedDetail';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* min-width: 320px;
  max-width: 540px; */
  margin: 0 auto;
  padding: 40px 20px;
  gap: 16px;
  background-color: var(--color-black-main);
`;

const BorderBottom = styled.div`
  width: 94.8%;
  /* min-width: 280px;
  max-width: 500px; */
  margin: 0 auto;
  padding: 0 20px;
  height: 6px;
  background: #1c1c1c;
`;

interface FeedDetailPostProps extends FeedDetailData {
  isMyFeed?: boolean;
}

const FeedDetailPost = ({ isMyFeed, tagList, aliasColor, ...postData }: FeedDetailPostProps) => {
  return (
    <>
      <Container>
        <PostHeader {...postData} aliasColor={aliasColor} />
        <FeedDetailPostBody {...postData} tags={tagList} />
        <PostFooter isDetail={true} isMyFeed={!!isMyFeed} {...postData} />
      </Container>
      <BorderBottom />
    </>
  );
};

export default FeedDetailPost;
