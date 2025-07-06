import styled from '@emotion/styled';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import type { PostData } from '../../types/post';

const Container = styled.div`
  display: flex;
  min-width: 320px;
  margin: 0 auto;
  background-color: var(--color-black-main);
  width: 100%;
  max-width: 500px;
  height: auto;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const BorderBottom = styled.div`
  width: 100%;
  height: 10px;
  background-color: #282828;
`;

export type FeedPostProps = PostData & {
  showHeader: boolean;
};

const FeedPost = ({ showHeader, ...postData }: FeedPostProps) => {
  return (
    <>
      <Container>
        {showHeader && <PostHeader {...postData} />}
        <PostBody {...postData} />
        <PostFooter {...postData} />
      </Container>
      <BorderBottom />
      {/* 페이징 처리에서 마지막 게시글인 경우 BorderBottom 안보이게 처리해야함 */}
    </>
  );
};

export default FeedPost;
