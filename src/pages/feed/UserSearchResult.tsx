import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import UserProfileItem from '@/components/feed/UserProfileItem';
import type { UserData } from '@/api/users/getUsers';

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
  const isEmptySearchedUserList = () => {
    if (searchedUserList.length === 0) return true;
    else return false;
  };

  // 무한 스크롤을 위한 Intersection Observer
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
        {type === 'searching' ? <></> : <ResultHeader>전체 {searchedUserList.length}</ResultHeader>}

        {isEmptySearchedUserList() ? (
          <EmptyWrapper>{loading ? '사용자 찾는 중...' : '찾는 사용자가 없어요.'}</EmptyWrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  margin-bottom: 72px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 72px;
`;

const ResultHeader = styled.div`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.darkgrey.dark};
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 40%;
  color: var(--color-text-primary_white, #fefefe);
  text-align: center;
  font-size: var(--string-size-large01, 18px);
  font-weight: var(--string-weight-semibold, 600);
  line-height: var(--string-lineheight-height24, 24px); /* 133.333% */
`;

const ObserverDiv = styled.div`
  height: 100px;
`;
