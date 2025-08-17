import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MyFollower from './MyFollower';
import { postFollow } from '@/api/users/postFollow';
import { usePopupStore } from '@/stores/usePopupStore';

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
      console.error('userId가 없습니다.');
      return;
    }

    try {
      console.log('현재 팔로우 상태:', followed);
      console.log('요청할 타입:', !followed);

      // 현재 팔로우 상태의 반대값으로 API 호출
      const response = await postFollow(userId, !followed);

      console.log('API 응답:', response);

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
      // 에러 발생 시 상태 변경하지 않음
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
  min-width: 320px;
  max-width: 540px;
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
    gap: 4px;

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
        color: var(--color-white);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);
        line-height: normal;
      }

      .usertitle {
        color: var(--color-text-humanities_skyblue, #a1d5ff);
        font-size: var(--font-size-xs);
        font-weight: var(--string-weight-regular, 400);
        line-height: normal;
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
