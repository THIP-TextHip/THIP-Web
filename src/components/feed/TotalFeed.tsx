import styled from '@emotion/styled';
import FollowList from './FollowList';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';

const Container = styled.div`
  padding-top: 136px;
  padding-bottom: 155px;
  background-color: var(--color-black-main);
`;

const TotalFeed = ({ showHeader, posts = [] }: FeedListProps) => {
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
