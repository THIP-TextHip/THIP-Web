import { useState, useEffect, useRef } from 'react';
import MyFollower from './MyFollower';
import { postFollow } from '@/api/users/postFollow';
import { Container, UserProfile } from './Profile.styled';
import { usePopupStore } from '@/stores/popupStore';
import { usePreventDoubleClick } from '@/hooks/usePreventDoubleClick';

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
  const followedRef = useRef<boolean>(!!isFollowing);
  const { openPopup } = usePopupStore();
  const { isLoading: isFollowLoading, run: runFollow } = usePreventDoubleClick();

  useEffect(() => {
    setFollowed(isFollowing);
    followedRef.current = !!isFollowing;
  }, [isFollowing]);

  const toggleFollow = () => {
    if (!userId) return;
    runFollow(async () => {
      const nextFollowed = !followedRef.current;
      followedRef.current = nextFollowed;
      setFollowed(nextFollowed);

      try {
        const response = await postFollow(userId, nextFollowed);
        if (followedRef.current !== nextFollowed) return;

        if (response.data.isFollowing !== nextFollowed) {
          followedRef.current = response.data.isFollowing;
          setFollowed(response.data.isFollowing);
        }

        openPopup('snackbar', {
          message: response.data.isFollowing ? `${nickname}님을 띱 했어요.` : `${nickname}님을 띱 취소했어요.`,
          variant: 'top',
          onClose: () => {},
        });
      } catch {
        if (followedRef.current !== nextFollowed) return;
        const rollbackState = !nextFollowed;
        followedRef.current = rollbackState;
        setFollowed(rollbackState);
      }
    });
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
          <div className="followbutton" onClick={toggleFollow} style={{ opacity: isFollowLoading ? 0.6 : 1 }}>
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
