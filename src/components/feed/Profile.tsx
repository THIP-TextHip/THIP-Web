import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MyFollower from './MyFollower';
import { postFollow } from '@/api/users/postFollow';
import { usePopupStore } from '@/stores/popupStore';

export interface ProfileProps {
  showFollowButton?: boolean;
  isFollowing?: boolean;
  profileImageUrl: string;
  nickname: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
  latestFollowerProfileImageUrls?: string[];
  userId?: number;
  isMyFeed?: boolean;
}

const Profile = ({
  showFollowButton,
  isFollowing,
  profileImageUrl,
  nickname,
  aliasName,
  aliasColor,
  followerCount,
  latestFollowerProfileImageUrls = [],
  userId,
  isMyFeed,
}: ProfileProps) => {
  const [followed, setFollowed] = useState(isFollowing);
  const { openPopup } = usePopupStore();

  useEffect(() => {
    setFollowed(isFollowing);
  }, [isFollowing]);

  const toggleFollow = async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await postFollow(userId, !followed);

      setFollowed(response.data.isFollowing);

      const message = response.data.isFollowing
        ? `${nickname}님을 띱 했어요.`
        : `${nickname}님을 띱 취소했어요.`;

      openPopup('snackbar', {
        message,
        variant: 'top',
        onClose: () => {},
      });
    } catch (error) {
      console.error('띱하기 실패:', error);
    }
  };

  return (
    <Container>
      <UserProfile>
        <div className="userInfo">
          <img src={profileImageUrl} />
          <div className="user">
            <div className="username">{nickname}</div>
            <div className="usertitle" style={{ color: aliasColor }}>
              {aliasName}
            </div>
          </div>
        </div>
        {showFollowButton && !isMyFeed && (
          <div className="followbutton" onClick={toggleFollow}>
            {followed ? '띱 취소' : '띱 하기'}
          </div>
        )}
      </UserProfile>
      <MyFollower
        followerCount={followerCount}
        latestFollowerProfileImageUrls={latestFollowerProfileImageUrls}
        userId={userId}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 166px;
  padding: 0 20px;
  padding-top: 32px;
  margin: 0 auto;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    img {
      width: 54px;
      height: 54px;
      border-radius: 54px;
      border: 0.5px solid var(--color-white);
    }

    .user {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .username {
        color: var(--color-text-primary_white, #fefefe);
        font-size: var(--string-size-large01, 18px);
        font-weight: var(--string-weight-semibold, 600);
        line-height: var(--string-lineheight-height24, 24px); /* 133.333% */
        letter-spacing: 0.018px;
      }

      .usertitle {
        font-size: var(--string-size-medium01, 14px);
        font-weight: var(--string-weight-regular, 400);
        line-height: var(--string-lineheight-feedcontent_height20, 20px); /* 142.857% */
      }
    }
  }

  .followbutton {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #888;

    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-medium, 500);
    line-height: normal;
    cursor: pointer;
  }
`;

export default Profile;
