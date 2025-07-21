import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import rightArrow from '../../assets/feed/rightArrow.svg';
import people from '../../assets/feed/people.svg';
import character from '../../assets/feed/character.svg';

const followerData = {
  followers: [
    { userId: 1, src: 'https://placehold.co/36x36', username: 'user1' },
    { userId: 2, src: 'https://placehold.co/36x36', username: 'user2' },
    { userId: 3, src: 'https://placehold.co/36x36', username: 'user3' },
    { userId: 4, src: 'https://placehold.co/36x36', username: 'user4' },
    { userId: 5, src: 'https://placehold.co/36x36', username: 'user5' },
    { userId: 6, src: 'https://placehold.co/36x36', username: 'user6' },
    { userId: 7, src: 'https://placehold.co/36x36', username: 'user7' },
    { userId: 8, src: 'https://placehold.co/36x36', username: 'user8' },
    { userId: 9, src: 'https://placehold.co/36x36', username: 'user9' },
    { userId: 10, src: 'https://placehold.co/36x36', username: 'user10' },
    { userId: 11, src: 'https://placehold.co/36x36', username: 'user11' },
    { userId: 12, src: 'https://placehold.co/36x36', username: 'user12' },
  ],
};

const FollowList = () => {
  const navigate = useNavigate();
  const { followers } = followerData;
  const hasFollowers = followers.length > 0;
  const visible = hasFollowers ? followers.slice(0, 10) : [];

  const handleFindClick = () => {
    navigate('/feed/usersearch');
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
      {hasFollowers ? (
        <FollowContainer>
          <div className="followerList">
            {visible.map(({ userId, src, username }) => (
              <div className="followers" key={username} onClick={() => handleProfileClick(userId)}>
                <img src={src} />
                <div className="username">{username}</div>
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
    font-size: 11px;
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
        font-size: var(--string-size-small02, 11px);
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
