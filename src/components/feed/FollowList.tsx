import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import rightArrow from '../../assets/feed/rightArrow.svg';
import people from '../../assets/feed/people.svg';
import character from '../../assets/feed/character.svg';
import { typography } from '@/styles/global/global';
import { getRecentFollowing, type RecentWriterData } from '@/api/users/getRecentFollowing';

const FollowList = () => {
  const navigate = useNavigate();
  const [myFollowings, setMyFollowings] = useState<RecentWriterData[]>([]);
  const [loading, setLoading] = useState(false);

  // API에서 최근 글 작성한 팔로우 리스트 조회
  const fetchRecentFollowing = async () => {
    try {
      setLoading(true);
      const response = await getRecentFollowing();

      if (response.isSuccess) {
        setMyFollowings(response.data.myFollowingUsers);
      } else {
        console.error('최근 팔로우 작성자 조회 실패:', response.message);
        setMyFollowings([]);
      }
    } catch (error) {
      console.error('최근 팔로우 작성자 조회 중 오류:', error);
      setMyFollowings([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 조회
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 20px;
  background-color: var(--color-black-main);

  .title {
    display: flex;
    flex-direction: row;
    color: var(--color-white);
    font-size: ${typography.fontSize['2xs']};
    font-weight: var(--font-weight-medium);
    line-height: 20px;
  }
`;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    cursor: pointer;
  }

  .followerList {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 12px;

    /* ✅ 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */
    .followerList::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }

    .followers {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;

      .username {
        width: 36px;
        overflow: hidden;
        color: #fff;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
        font-size: ${typography.fontSize['2xs']};
        font-weight: var(--string-weight-regular, 400);
        line-height: 20px;
      }

      img {
        display: flex;
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        border-radius: 36px;
        border: 0.5px solid #888;
      }
    }
  }
`;

const EmptyFollowerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 12px;
  margin: 12px 0;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: var(--color-darkgrey-dark);

  color: var(--color-grey-100);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: 20px;
  cursor: pointer;
`;

export default FollowList;
