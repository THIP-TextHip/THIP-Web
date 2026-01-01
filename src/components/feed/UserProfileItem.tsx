import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import rightArrow from '../../assets/feed/rightArrow.svg';
import type { UserProfileItemProps } from '@/types/user';
import { postFollow } from '@/api/users/postFollow';
import { usePopupStore } from '@/stores/usePopupStore';
import { Wrapper, UserProfile } from './UserProfileItem.styled';

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
  const [followed, setFollowed] = useState(isFollowing);
  const { openPopup } = usePopupStore();

  const handleProfileClick = () => {
    if (isMyself) {
      navigate(`/myfeed/${userId}`);
    } else {
      navigate(`/otherfeed/${userId}`);
    }
  };

  const toggleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();

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
      console.error('팔로우/언팔로우 실패:', error);
    }
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
          <div className="followbutton" onClick={toggleFollow}>
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
