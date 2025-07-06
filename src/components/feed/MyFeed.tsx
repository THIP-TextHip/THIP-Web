import styled from '@emotion/styled';
import MyProfile from './MyProfile';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';

const Container = styled.div`
  padding-top: 136px;
  padding-bottom: 155px;
  background-color: var(--color-black-main);
`;

const MyFeed = ({ showHeader, posts = [] }: FeedListProps) => {
  return (
    <Container>
      <MyProfile />
      {posts.map(post => (
        <FeedPost key={post.postId} showHeader={showHeader} {...post} />
      ))}
    </Container>
  );
};

export default MyFeed;
