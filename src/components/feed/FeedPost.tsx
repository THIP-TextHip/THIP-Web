import styled from '@emotion/styled';
import PostBody from '../common/Post/PostBody';
import PostFooter from '../common/Post/PostFooter';
import PostHeader from '../common/Post/PostHeader';
import type { FeedPostProps } from '../../types/post';

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

const FeedPost = ({ showHeader, isLast, isMyFeed, onSaveToggle, ...postData }: FeedPostProps) => {
  return (
    <>
      <Container>
        {showHeader && <PostHeader {...postData} />}
        <PostBody {...postData} />
        <PostFooter isMyFeed={!!isMyFeed} onSaveToggle={onSaveToggle} {...postData} />
      </Container>
      {!isLast && <BorderBottom />}
    </>
  );
};

export default FeedPost;
