import { useState, useEffect } from 'react';
import MyFollower from './MyFollower';
import { postFollow } from '@/api/users/postFollow';
import { usePopupStore } from '@/stores/usePopupStore';
import { Container, UserProfile } from './Profile.styled';

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

export default Profile;
