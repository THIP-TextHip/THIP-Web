import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Profile from './Profile';
import FeedPost from './FeedPost';
import TotalBar from './TotalBar';
import { colors, typography } from '../../styles/global/global';
import type { OtherFeedItem } from '@/api/feeds/getOtherFeed';
import type { OtherProfileData } from '@/types/profile';
import { getOtherFeed } from '@/api/feeds/getOtherFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import { getMyProfile } from '@/api/feeds/getMyProfile';
import type { PostData } from '@/types/post';
import LoadingSpinner from '../common/LoadingSpinner';

interface OtherFeedProps {
  showHeader?: boolean;
  posts?: OtherFeedItem[];
  isMyFeed?: boolean;
  profileData?: OtherProfileData | null;
  userId?: number;
  showFollowButton?: boolean; // showFollowButton prop 추가
  isMyself?: boolean;
}

const OtherFeed = ({
  posts = [],
  profileData,
  userId,
  showFollowButton,
  isMyFeed,
  isMyself,
}: OtherFeedProps) => {
  const [feedPosts, setFeedPosts] = useState<OtherFeedItem[] | PostData[]>(posts);
  const [loading, setLoading] = useState(false);
  const [totalFeedCount, setTotalFeedCount] = useState(profileData?.totalFeedCount || 0);

  // isMyself 값에 따라 적절한 API 호출
  useEffect(() => {
    const loadFeeds = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        if (isMyself) {
          // 자신의 피드인 경우 getMyFeeds와 getMyProfile 병렬 호출
          const [feedsResponse, profileResponse] = await Promise.all([
            getMyFeeds(),
            getMyProfile()
          ]);
          setFeedPosts(feedsResponse.data.feedList);
          // getMyProfile에서 총 피드 수 업데이트
          setTotalFeedCount(profileResponse.data.totalFeedCount);
        } else {
          // 다른 사용자의 피드인 경우 getOtherFeed 호출
          const response = await getOtherFeed(userId);
          setFeedPosts(response.data.feedList);
        }
      } catch (error) {
        console.error('피드 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeeds();
  }, [userId, isMyself]);

  const hasPosts = feedPosts.length > 0;

  if (!profileData) {
    return <></>;
  }

  return (
    <Container>
      <Profile
        userId={userId}
        showFollowButton={
          showFollowButton !== undefined ? showFollowButton : !profileData.isWriter && !isMyself
        }
        isFollowing={profileData.isFollowing}
        profileImageUrl={profileData.profileImageUrl}
        nickname={profileData.nickname}
        aliasName={profileData.aliasName}
        aliasColor={profileData.aliasColor}
        followerCount={profileData.followerCount}
        latestFollowerProfileImageUrls={profileData?.latestFollowerProfileImageUrls || []}
        isMyFeed={isMyFeed}
      />
      <TotalBar count={totalFeedCount} />
      {loading ? (
        <LoadingSpinner fullHeight={true} size="medium" />
      ) : hasPosts && !loading ? (
        feedPosts.map(post => (
          <FeedPost key={post.feedId} showHeader={false} isMyFeed={isMyFeed} {...post} />
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
