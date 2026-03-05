import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import UserProfileItem from '@/components/feed/UserProfileItem';
import type { UserProfileType } from '@/types/user';
import { getFollowerList } from '@/api/users/getFollowerList';
import { getFollowingList } from '@/api/users/getFollowingList';
import type { FollowData } from '@/types/follow';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TotalBar, UserProfileList, Wrapper } from './FollowerListPage.syled';
import { UserProfileItemSkeleton } from '@/shared/ui/Skeleton';

const FollowerListPage = () => {
  const navigate = useNavigate();
  const { type, userId } = useParams<{ type: UserProfileType; userId?: string }>();
  const title = type === 'followerlist' ? '띱 목록' : '내 띱 목록';

  const [totalCount, setTotalCount] = useState(0);

  const userList = useInifinieScroll<FollowData>({
    enabled: !!type,
    reloadKey: `${type}-${userId ?? ''}`,
    fetchPage: async cursor => {
      const minLoadingTime = cursor ? null : new Promise(resolve => setTimeout(resolve, 500));

      if (type === 'followerlist') {
        if (!userId) {
          throw new Error('사용자 ID가 없습니다.');
        }

        const response = await getFollowerList(userId, { size: 10, cursor });
        if (minLoadingTime) await minLoadingTime;

        const total = response.data.totalFollowerCount;
        if (typeof total === 'number') setTotalCount(total);

        return {
          items: response.data.followers || [],
          nextCursor: response.data.nextCursor || null,
          isLast: response.data.isLast,
        };
      }

      const response = await getFollowingList({ size: 10, cursor });
      if (minLoadingTime) await minLoadingTime;

      const total = response.data.totalFollowingCount;
      if (typeof total === 'number') setTotalCount(total);

      return {
        items: response.data.followings || [],
        nextCursor: response.data.nextCursor || null,
        isLast: response.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, userId]);

  const showInitialSkeleton = userList.isLoading && userList.items.length === 0;

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={() => navigate(-1)}
        title={title}
      />
      <TotalBar>전체 {totalCount}</TotalBar>

      {showInitialSkeleton ? (
        <UserProfileList>
          {Array.from({ length: 5 }).map((_, i) => (
            <UserProfileItemSkeleton key={i} type={type as UserProfileType} />
          ))}
        </UserProfileList>
      ) : (
        <UserProfileList>
          {userList.items.map((user, index) => (
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
              isLast={index === userList.items.length - 1}
              isMyself={user.isMyself}
            />
          ))}

          {!userList.isLast && <div ref={userList.sentinelRef} style={{ height: 20 }} />}
          {userList.isLoadingMore && (
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
