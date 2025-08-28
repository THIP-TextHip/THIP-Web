import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Profile from './Profile';
import FeedPost from './FeedPost';
import type { FeedListProps } from '../../types/post';
import { colors, typography } from '@/styles/global/global';
import TotalBar from './TotalBar';
import { getMyProfile } from '@/api/feeds/getMyProfile';
import type { MyProfileData } from '@/types/profile';

const MyFeed = ({ showHeader, posts = [], isLast = false }: FeedListProps) => {
  const [profileData, setProfileData] = useState<MyProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const hasPosts = posts.length > 0;

  // 프로필 데이터 로드
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
    return (
      <></>
      // <LoadingSpinner message="내 피드 정보를 불러오는 중..." size="large" fullHeight={true} />
    );
  }

  return (
    <Container>
      <Profile
        creatorId={profileData.creatorId}
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

const Container = styled.div`
  min-height: 100vh;
  padding-top: 136px;
  padding-bottom: 125px; //이전 76px
  background-color: var(--color-black-main);
`;

const EmptyState = styled.div`
  display: flex;
  min-height: calc(100% - 75px);
  justify-content: center;
  align-items: center;
  margin-top: 150px;

  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  letter-spacing: 0.018px;
`;

export default MyFeed;
