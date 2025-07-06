import styled from '@emotion/styled';
import FollowList from './FollowList';
import FeedPost from './FeedPost';
import type { PostData } from '../../types/post';

const Container = styled.div`
  padding-top: 136px;
  padding-bottom: 155px;
  background-color: var(--color-black-main);
`;

export type TotalFeedProps = {
  showHeader: boolean;
  posts: PostData[];
};

const TotalFeed = ({ showHeader, posts = [] }: TotalFeedProps) => {
  return (
    <Container>
      <FollowList />
      {posts.map(post => (
        <FeedPost key={post.postId} {...post} showHeader={showHeader} />
      ))}
    </Container>
  );
};

export default TotalFeed;
