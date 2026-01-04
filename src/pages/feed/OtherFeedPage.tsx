import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../../components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import writefab from '../../assets/common/writefab.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import OtherFeed from '@/components/feed/OtherFeed';
import { getOtherFeed, type OtherFeedItem } from '@/api/feeds/getOtherFeed';
import { getOtherProfile } from '@/api/users/getOtherProfile';
import type { OtherProfileData } from '@/types/profile';
import { Container } from './MyFeedPage.styled';

const OtherFeedPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [feedData, setFeedData] = useState<OtherFeedItem[]>([]);
  const [profileData, setProfileData] = useState<OtherProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  };

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
        isMyFeed={false}
        profileData={profileData}
        showFollowButton={!profileData?.isWriter}
      />
      <NavBar src={writefab} path="/post/create" />
    </Container>
  );
};

export default OtherFeedPage;
