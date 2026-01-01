import { useState, useEffect } from 'react';
import Profile from './Profile';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';
import TotalBar from './TotalBar';
import { getMyProfile } from '@/api/feeds/getMyProfile';
import type { MyProfileData } from '@/types/profile';
import { Container, EmptyState } from './MyFeed.styled';

const MyFeed = ({ showHeader, posts = [], isLast = false }: FeedListProps) => {
  const [profileData, setProfileData] = useState<MyProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const hasPosts = posts.length > 0;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await getMyProfile();
        setProfileData(response.data);
      } catch (error) {
        console.error('프로필 정보 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading || !profileData) {
    return <></>;
  }

  return (
    <Container>
      <Profile
        userId={profileData.creatorId || profileData.userId}
        showFollowButton={false}
        profileImageUrl={profileData.profileImageUrl}
        nickname={profileData.nickname}
        aliasName={profileData.aliasName}
        aliasColor={profileData.aliasColor}
        followerCount={profileData.followerCount}
        latestFollowerProfileImageUrls={profileData?.latestFollowerProfileImageUrls || []}
      />
      <TotalBar count={profileData.totalFeedCount} />
      {hasPosts ? (
        posts.map((post, index) => (
          <FeedPost
            key={`${post.feedId}-${index}`}
            showHeader={showHeader}
            isMyFeed={true}
            isLast={isLast && index === posts.length - 1}
            {...post}
          />
        ))
      ) : (
        <EmptyState>
          <div>피드에 글을 작성해 보세요</div>
        </EmptyState>
      )}
    </Container>
  );
};

export default MyFeed;
