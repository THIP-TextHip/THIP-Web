import styled from '@emotion/styled';
import PostBody from '../common/Post/PostBody';
import PostFooter from '../common/Post/PostFooter';
import PostHeader from '../common/Post/PostHeader';
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

const FeedPost = ({ showHeader, isMyFeed, ...postData }: FeedPostProps) => {
  return (
    <>
      <Container>
        {showHeader && <PostHeader {...postData} />}
        <PostBody {...postData} />
        <PostFooter isMyFeed={!!isMyFeed} {...postData} />
      </Container>
      <BorderBottom />
      {/* 페이징 처리에서 마지막 게시글인 경우 BorderBottom 안보이게 처리해야함 */}
    </>
  );
};

export default FeedPost;
