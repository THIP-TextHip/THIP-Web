import type { UserProfileItemProps } from '@/types/user';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import UserProfileItem from '@/components/feed/UserProfileItem';

interface UserSearchResultProps {
  type: 'searching' | 'searched';
  searchedUserList: UserProfileItemProps[];
}

export function UserSearchResult({ type, searchedUserList }: UserSearchResultProps) {
  const isEmptySearchedUserList = () => {
    if (searchedUserList.length === 0) return true;
    else return false;
  };

  return (
    <Wrapper>
      <List>
        {type === 'searching' ? <></> : <ResultHeader>전체 {searchedUserList.length}</ResultHeader>}

        {isEmptySearchedUserList() ? (
          <EmptyWrapper></EmptyWrapper>
        ) : (
          searchedUserList.map((user, index) => (
            <UserProfileItem
              key={user.userId}
              {...user}
              type="followerlist"
              isLast={index === searchedUserList.length - 1}
            />
          ))
        )}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 72px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 60vh;
`;
