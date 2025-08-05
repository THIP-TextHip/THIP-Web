import styled from '@emotion/styled';
import Profile from './Profile';
import FeedPost from './FeedPost';
import TotalBar from './TotalBar';
import { colors, typography } from '../../styles/global/global';
import type { OtherFeedItem } from '@/api/feeds/getOtherFeed';
import type { MyProfileData } from '@/types/profile';

interface OtherFeedProps {
  showHeader?: boolean;
  posts?: OtherFeedItem[];
  isMyFeed?: boolean;
  profileData?: MyProfileData | null;
}

const OtherFeed = ({ posts = [], profileData }: OtherFeedProps) => {
  const hasPosts = posts.length > 0;

  if (!profileData) {
    return <></>;
  }

  return (
    <Container>
      <Profile
        showFollowButton={true}
        isFollowing={false}
        profileImageUrl={profileData.profileImageUrl}
        nickname={profileData.nickname}
        aliasName={profileData.aliasName}
        aliasColor={profileData.aliasColor}
        followerCount={profileData.followerCount}
        latestFollowerProfileImageUrls={profileData?.latestFollowerProfileImageUrls || []}
      />
      <TotalBar count={profileData.totalFeedCount} />
      {hasPosts ? (
        posts.map(post => (
          <FeedPost key={post.feedId} showHeader={false} isMyFeed={false} {...post} />
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
  padding-top: 56px;
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

export default OtherFeed;
