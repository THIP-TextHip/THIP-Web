import styled from '@emotion/styled';
import MyProfile from './MyProfile';
import FeedPost from './FeedPost';
import type { PostData } from '../../types/post';

const Container = styled.div`
  padding-top: 136px;
  padding-bottom: 155px;
  background-color: var(--color-black-main);
`;

export type MyFeedProps = {
  showHeader: boolean;
  posts: PostData[];
};

const MyFeed = ({ showHeader, posts = [] }: MyFeedProps) => {
  return (
    <Container>
      <MyProfile />
      {posts.map(post => (
        <FeedPost key={post.postId} {...post} showHeader={showHeader} />
      ))}
    </Container>
  );
};

export default MyFeed;
