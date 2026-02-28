import { useRef, useEffect } from 'react';
import UserProfileItem from '@/components/feed/UserProfileItem';
import type { UserData } from '@/api/users/getUsers';
import { UserProfileItemSkeleton } from '@/shared/ui/Skeleton';
import { EmptyWrapper, List, ObserverDiv, ResultHeader, Wrapper } from './UserSearchResult.styled';

interface UserSearchResultProps {
  type: 'searching' | 'searched';
  searchedUserList: UserData[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function UserSearchResult({
  type,
  searchedUserList,
  loading,
  hasMore,
  onLoadMore,
}: UserSearchResultProps) {
  const showInitialSkeleton = !!loading && searchedUserList.length === 0;
  const showResultHeader = type === 'searched' && !showInitialSkeleton;
  const isEmpty = searchedUserList.length === 0 && type !== 'searching';

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <Wrapper>
      <List>
        {showResultHeader ? <ResultHeader>전체 {searchedUserList.length}</ResultHeader> : null}

        {showInitialSkeleton ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <UserProfileItemSkeleton key={i} type="followerlist" />
            ))}
          </>
        ) : isEmpty ? (
          <EmptyWrapper>찾는 사용자가 없어요.</EmptyWrapper>
        ) : (
          <>
            {searchedUserList.map((user, index) => (
              <UserProfileItem
                key={user.userId}
                {...user}
                type="followerlist"
                isLast={index === searchedUserList.length - 1}
              />
            ))}
            {hasMore && <ObserverDiv ref={observerRef}></ObserverDiv>}
          </>
        )}
      </List>
    </Wrapper>
  );
}
