import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import rightArrow from '../../assets/feed/rightArrow.svg';
import people from '../../assets/feed/people.svg';
import character from '../../assets/feed/character.svg';
import { getRecentFollowing, type RecentWriterData } from '@/api/users/getRecentFollowing';
import { Container, FollowContainer, EmptyFollowerContainer } from './FollowList.styled';

const FollowList = () => {
  const navigate = useNavigate();
  const [myFollowings, setMyFollowings] = useState<RecentWriterData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentFollowing = async () => {
    try {
      setLoading(true);
      const response = await getRecentFollowing();

      if (response.isSuccess) {
        setMyFollowings(response.data.myFollowingUsers);
      } else {
        setMyFollowings([]);
      }
    } catch (error) {
      console.error('최근 팔로우 작성자 조회 중 오류:', error);
      setMyFollowings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentFollowing();
  }, []);

  const hasFollowers = myFollowings.length > 0;
  const visible = hasFollowers ? myFollowings.slice(0, 10) : [];

  const handleFindClick = () => {
    navigate('/feed/search');
  };

  const handleMoreClick = () => {
    navigate('/follow/followlist');
  };

  const handleProfileClick = (userId: number) => {
    navigate(`/otherfeed/${userId}`);
  };

  return (
    <Container>
      <div className="title">
        <img src={people} />
        <div>내 띱</div>
      </div>
      {loading ? (
        <></>
      ) : hasFollowers ? (
        <FollowContainer>
          <div className="followerList">
            {visible.map(({ userId, profileImageUrl, nickname }) => (
              <div className="followers" key={userId} onClick={() => handleProfileClick(userId)}>
                <img src={profileImageUrl} alt={nickname} />
                <div className="username">{nickname}</div>
              </div>
            ))}
          </div>
          <img src={rightArrow} alt="더보기" onClick={handleMoreClick} />
        </FollowContainer>
      ) : (
        <EmptyFollowerContainer onClick={handleFindClick}>
          <div>관심있는 독서메이트를 찾아보세요!</div>
          <img src={character} alt="더보기" />
        </EmptyFollowerContainer>
      )}
    </Container>
  );
};
export default FollowList;
