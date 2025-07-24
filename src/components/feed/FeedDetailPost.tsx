import styled from '@emotion/styled';
import PostHeader from '@/components/common/Post/PostHeader';
import FeedDetailPostBody from './FeedDetailPostBody';
import PostFooter from '@/components/common/Post/PostFooter';
import type { FeedPostProps } from '../../types/post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 16px;
  background-color: var(--color-black-main);
`;

const BorderBottom = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--color-darkgrey-dark);
`;

const FeedDetailPost = ({ isMyFeed, ...postData }: FeedPostProps) => {
  return (
    <>
      <Container>
        <PostHeader {...postData} />
        <FeedDetailPostBody {...postData} />
        <PostFooter isDetail={true} isMyFeed={!!isMyFeed} {...postData} />
      </Container>
      <BorderBottom />
    </>
  );
};

export default FeedDetailPost;
