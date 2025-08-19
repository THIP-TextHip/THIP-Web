import styled from '@emotion/styled';
import FollowList from './FollowList';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';
import { colors, typography } from '@/styles/global/global';

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

const Container = styled.div`
  min-height: 100vh;
  padding-top: 136px;
  padding-bottom: 125px; //이전 76px
  background-color: var(--color-black-main);
`;

const EmptyState = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  margin-top: 150px;
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  letter-spacing: 0.018px;
`;

export default TotalFeed;
