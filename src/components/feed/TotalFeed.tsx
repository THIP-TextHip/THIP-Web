import styled from '@emotion/styled';
import FollowList from './FollowList';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';
import { colors, typography } from '@/styles/global/global';

const Container = styled.div`
  height: 100vh;
  padding-top: 136px;
  padding-bottom: 155px;
  background-color: var(--color-black-main);
`;

const EmptyState = styled.div`
  display: flex;
  height: 473px;
  padding: 32px 0 20px 0;
  justify-content: center;
  align-items: center;

  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  letter-spacing: 0.018px;
`;

const TotalFeed = ({ showHeader, posts = [], isMyFeed }: FeedListProps) => {
  const hasPosts = posts.length > 0;

  return (
    <Container>
      <FollowList />
      {hasPosts ? (
        posts.map(post => (
          <FeedPost key={post.feedId} showHeader={showHeader} isMyFeed={isMyFeed} {...post} />
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
