import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import UserProfileItem from '@/components/feed/UserProfileItem';
import type { UserProfileType } from '@/types/user';
import { getFollowerList } from '@/api/users/getFollowerList';
import { getFollowingList } from '@/api/users/getFollowingList';
import type { FollowData } from '@/types/follow';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TotalBar, UserProfileList, Wrapper } from './FollowerListPage.syled';
import { UserProfileItemSkeleton } from '@/shared/ui/Skeleton';

const FollowerListPage = () => {
  const navigate = useNavigate();
  const { type, userId } = useParams<{ type: UserProfileType; userId?: string }>();
  const title = type === 'followerlist' ? '띱 목록' : '내 띱 목록';

  const [userList, setUserList] = useState<FollowData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [isLast, setIsLast] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const loadUserList = useCallback(
    async (cursor?: string) => {
      if (loading) return;

      try {
        setLoading(true);
        setError(null);
        let response;

        const minLoadingTime = !cursor ? new Promise(resolve => setTimeout(resolve, 500)) : null;

        if (type === 'followerlist') {
          if (!userId) {
            setError('사용자 ID가 없습니다.');
            return;
          }
          const [data] = await Promise.all([
            getFollowerList(userId, { size: 10, cursor: cursor || null }),
            minLoadingTime,
          ]);
          response = data;
        } else {
          const [data] = await Promise.all([
            getFollowingList({ size: 10, cursor: cursor || null }),
            minLoadingTime,
          ]);
          response = data;
        }

        let userData: FollowData[] = [];
        if (type === 'followerlist') {
          userData = (response.data as { followers: FollowData[] })?.followers || [];
        } else {
          userData = (response.data as { followings: FollowData[] })?.followings || [];
        }

        if (!response || !response.data) {
          setError('API 응답이 없습니다.');
          return;
        }

        if (cursor) {
          setUserList(prev => [...prev, ...userData]);
        } else {
          setUserList(userData);
        }

        setNextCursor(response.data.nextCursor);
        setIsLast(response.data.isLast);
        if (type === 'followerlist') {
          const total = (response.data as { totalFollowerCount?: number }).totalFollowerCount;
          if (typeof total === 'number') setTotalCount(total);
        } else {
          const total = (response.data as { totalFollowingCount?: number }).totalFollowingCount;
          if (typeof total === 'number') setTotalCount(total);
        }
        setRetryCount(0);
      } catch (error) {
        console.error('사용자 목록 로드 실패:', error);
        setError('사용자 목록을 불러오는데 실패했습니다.');
        setRetryCount(prev => prev + 1);
      } finally {
        setLoading(false);
      }
    },
    [type, userId],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (loading || isLast || error || retryCount >= 3 || !nextCursor) {
        return;
      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        loadUserList(nextCursor);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLast, error, retryCount, nextCursor, loadUserList]);

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  useEffect(() => {
    const doc = document.documentElement;
    const needsMore = doc.scrollHeight <= window.innerHeight + 100;
    if (!loading && !isLast && !!nextCursor && needsMore) {
      loadUserList(nextCursor);
    }
  }, [userList, loading, isLast, nextCursor, loadUserList]);

  return (
    <Wrapper>
      <TitleHeader leftIcon={<img src={leftArrow} alt="뒤로가기" />} onLeftClick={handleBackClick} title={title} />
      <TotalBar>전체 {totalCount}</TotalBar>
      {loading && userList.length === 0 ? (
        <UserProfileList>
          {Array.from({ length: 5 }).map((_, i) => (
            <UserProfileItemSkeleton key={i} type={type as UserProfileType} />
          ))}
        </UserProfileList>
      ) : (
        <UserProfileList>
          {userList.map((user, index) => (
            <UserProfileItem
              key={user.userId}
              profileImageUrl={user.profileImageUrl}
              nickname={user.nickname}
              aliasName={user.aliasName}
              aliasColor={user.aliasColor}
              followerCount={user.followerCount}
              userId={user.userId}
              type={type as UserProfileType}
              isFollowing={user.isFollowing}
              isLast={index === userList.length - 1}
              isMyself={user.isMyself}
            />
          ))}
          {loading && userList.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              <LoadingSpinner size="small" />
            </div>
          )}
        </UserProfileList>
      )}
    </Wrapper>
  );
};

export default FollowerListPage;
