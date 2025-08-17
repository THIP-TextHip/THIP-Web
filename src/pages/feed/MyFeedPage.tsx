import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import NavBar from '../../components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import writefab from '../../assets/common/writefab.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import OtherFeed from '@/components/feed/OtherFeed';
import { getOtherFeed, type OtherFeedItem } from '@/api/feeds/getOtherFeed';
import { getOtherProfile } from '@/api/users/getOtherProfile';
import type { OtherProfileData } from '@/types/profile';

const Container = styled.div`
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
`;

const MyFeedPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [feedData, setFeedData] = useState<OtherFeedItem[]>([]);
  const [profileData, setProfileData] = useState<OtherProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 다른 사용자 피드 및 프로필 데이터 로드
  useEffect(() => {
    const loadOtherData = async () => {
      if (!userId) {
        setError('사용자 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [feedResponse, profileResponse] = await Promise.all([
          getOtherFeed(Number(userId)),
          getOtherProfile(Number(userId)),
        ]);

        console.log('🔍 MyFeedPage - Profile Response:', profileResponse.data);
        console.log('🔍 MyFeedPage - isWriter 값:', profileResponse.data.isWriter);

        setFeedData(feedResponse.data.feedList);
        setProfileData(profileResponse.data);
        setError(null);
      } catch (err) {
        console.error('다른 사용자 데이터 로드 실패:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadOtherData();
  }, [userId]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return (
    <Container>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBackClick}
      />
      <OtherFeed
        userId={Number(userId)}
        showHeader={false}
        posts={feedData}
        isMyFeed={true}
        profileData={profileData}
        showFollowButton={false} // 띱하기 버튼 숨김
      />
      <NavBar src={writefab} path="/post/create" />
    </Container>
  );
};

export default MyFeedPage;
