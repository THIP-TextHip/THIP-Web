import FollowList from './FollowList';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';
import { Container, EmptyState } from './TotalFeed.styled';

const TotalFeed = ({ showHeader, posts = [], isTotalFeed, isLast = false }: FeedListProps) => {
  const hasPosts = posts.length > 0;

  return (
    <Container>
      <FollowList />
      {hasPosts ? (
        posts.map((post, index) => (
          <FeedPost
            key={`${post.feedId}-${index}`}
            showHeader={showHeader}
            isMyFeed={isTotalFeed}
            isLast={isLast && index === posts.length - 1}
            {...post}
          />
        ))
      ) : (
        <EmptyState>
          <div>피드에 작성된 글이 없어요</div>
        </EmptyState>
      )}
    </Container>
  );
};
export default TotalFeed;
