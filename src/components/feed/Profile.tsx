import { useState, useEffect } from 'react';
import MyFollower from './MyFollower';
import { postFollow } from '@/api/users/postFollow';
import { Container, UserProfile } from './Profile.styled';
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
export default Profile;
