import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';
import rightArrow from '../../assets/feed/rightArrow.svg';
import type { UserProfileItemProps } from '@/types/user';
import { colors, typography } from '@/styles/global/global';
import { postFollow } from '@/api/users/postFollow';
import { usePopupStore } from '@/stores/usePopupStore';

const UserProfileItem = ({
  profileImgUrl,
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
      // API 응답으로 팔로우 상태 업데이트
      setFollowed(response.data.isFollowing);
      console.log(`${nickname} - ${response.data.isFollowing ? '띱 완료' : '띱 취소'}`);

      // Snackbar 표시
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
          <img src={profileImgUrl} />
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

const Wrapper = styled.div<{ isLast?: boolean }>`
  width: 100%;
  /* max-width: 500px;
  min-width: 320px; */
  margin: 0 auto;
  height: 78px;
  padding: 20px 0;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid var(--color-darkgrey-dark)')};
  background-color: ${colors.black.main};
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 36px;
      border: 0.5px solid ${colors.grey[300]};
    }

    .user {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .username {
        color: ${colors.white};
        font-size: ${typography.fontSize.sm};
        font-weight: ${typography.fontWeight.medium};
        line-height: normal;
      }

      .usertitle {
        font-size: ${typography.fontSize.xs};
        font-weight: ${typography.fontWeight.regular};
      }
    }
  }

  .followbutton {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid ${colors.grey[300]};
    text-align: center;
    color: ${colors.grey[100]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    line-height: normal;
    cursor: pointer;
  }

  .followlistbutton {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
    color: ${colors.white};
    font-size: ${typography.fontSize['2xs']};
    font-weight: ${typography.fontWeight.regular};
    line-height: 20px;
  }
`;

export default UserProfileItem;
