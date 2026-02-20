import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import rightArrow from '../../assets/feed/rightArrow.svg';
import type { UserProfileItemProps } from '@/types/user';
import { postFollow } from '@/api/users/postFollow';
import { Wrapper, UserProfile } from './UserProfileItem.styled';
import { usePopupStore } from '@/stores/popupStore';
import { usePreventDoubleClick } from '@/hooks/usePreventDoubleClick';

const UserProfileItem = ({
  profileImageUrl,
  nickname,
  aliasName,
  aliasColor,
  followerCount,
  isFollowing,
  userId,
  isLast,
  type,
  isMyself,
}: UserProfileItemProps) => {
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(!!isFollowing);
  const followedRef = useRef<boolean>(!!isFollowing);
  const { openPopup } = usePopupStore();
  const { isLoading: isFollowLoading, run: runFollow } = usePreventDoubleClick();

  const handleProfileClick = () => {
    if (isMyself) {
      navigate(`/myfeed/${userId}`);
    } else {
      navigate(`/otherfeed/${userId}`);
    }
  };

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return;
    runFollow(async () => {
      const nextFollowed = !followedRef.current;
      followedRef.current = nextFollowed;
      setFollowed(nextFollowed);

      await new Promise(resolve => setTimeout(resolve, 300));

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
    <Wrapper onClick={handleProfileClick} isLast={isLast}>
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
        {type === 'followlist' && (
          <div className="followbutton" onClick={toggleFollow} style={{ opacity: isFollowLoading ? 0.6 : 1 }}>
            {followed ? '띱 취소' : '띱 하기'}
          </div>
        )}
        {type === 'followerlist' && (
          <div className="followlistbutton">
            <div>{followerCount ?? 0}명이 띱하는 중</div>
            <img src={rightArrow} />
          </div>
        )}
      </UserProfile>
    </Wrapper>
  );
};
export default UserProfileItem;
