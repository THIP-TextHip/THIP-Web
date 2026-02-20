import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../../components/common/NavBar';
import TitleHeader from '@/components/common/TitleHeader';
import writefab from '../../assets/common/writefab.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import OtherFeed from '@/components/feed/OtherFeed';
import { getOtherFeed, type OtherFeedItem } from '@/api/feeds/getOtherFeed';
import { getMyProfile } from '@/api/feeds/getMyProfile';
import type { OtherProfileData } from '@/types/profile';
import { OtherFeedSkeleton } from '@/shared/ui/Skeleton';
import { Container } from './MyFeedPage.styled';

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

  useEffect(() => {
    const loadOtherData = async () => {
      if (!userId) {
        setError('사용자 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [feedResponse, profileResponse] = (await Promise.all([
          getOtherFeed(Number(userId)),
          getMyProfile(),
          minLoadingTime,
        ])) as [
          Awaited<ReturnType<typeof getOtherFeed>>,
          Awaited<ReturnType<typeof getMyProfile>>,
          void,
        ];

        setFeedData(feedResponse.data.feedList);
        setProfileData({ ...profileResponse.data, isFollowing: false });
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
    return (
      <Container>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          onLeftClick={handleBackClick}
        />
        <OtherFeedSkeleton showFollowButton={false} />
        <NavBar src={writefab} path="/post/create" />
      </Container>
    );
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
        showFollowButton={false}
        isMyself={true}
      />
      <NavBar src={writefab} path="/post/create" />
    </Container>
  );
};

export default MyFeedPage;
