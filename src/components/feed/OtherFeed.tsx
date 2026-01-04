import { useState, useEffect } from 'react';
import Profile from './Profile';
import FeedPost from './FeedPost';
import TotalBar from './TotalBar';
import type { OtherFeedItem } from '@/api/feeds/getOtherFeed';
import type { OtherProfileData } from '@/types/profile';
import { getOtherFeed } from '@/api/feeds/getOtherFeed';
import { getMyFeeds } from '@/api/feeds/getMyFeed';
import { getMyProfile } from '@/api/feeds/getMyProfile';
import type { PostData } from '@/types/post';
import LoadingSpinner from '../common/LoadingSpinner';
import { Container, EmptyState } from './OtherFeed.styled';

interface OtherFeedProps {
  showHeader?: boolean;
  posts?: OtherFeedItem[];
  isMyFeed?: boolean;
  profileData?: OtherProfileData | null;
  userId?: number;
  showFollowButton?: boolean;
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

  useEffect(() => {
    const loadFeeds = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        if (isMyself) {
          const [feedsResponse, profileResponse] = await Promise.all([
            getMyFeeds(),
            getMyProfile(),
          ]);
          setFeedPosts(feedsResponse.data.feedList);
          setTotalFeedCount(profileResponse.data.totalFeedCount);
        } else {
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

export default OtherFeed;
