import styled from '@emotion/styled';
import { useMemo } from 'react';
import { GroupCard } from '../group/GroupCard';
import { colors, typography } from '@/styles/global/global';
import { Filter } from '../common/Filter';
import type { SearchRoomItem } from '@/api/rooms/getSearchRooms';

const FILTER = ['마감임박순', '인기순'];
const CATEGORIES = ['문학', '과학·IT', '사회과학', '인문학', '예술'] as const;

type ResultType = 'searching' | 'searched';

interface Props {
  type: ResultType;
  rooms: SearchRoomItem[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  lastRoomElementCallback?: (node: HTMLDivElement | null) => void;

  error: string | null;
  selectedFilter: string;
  setSelectedFilter: (v: string) => void;
  onChangeCategory: (category: string) => void;
  currentCategory: string;
}

const mapToGroupCardModel = (r: SearchRoomItem) => ({
  id: String(r.roomId),
  title: r.roomName,
  userName: '',
  participants: r.memberCount,
  maximumParticipants: r.recruitCount,
  coverUrl: r.bookImageUrl,
  deadLine: r.deadlineDate,
  genre: r.genre ?? '',
  isOnGoing: r.isPublic,
});

const GroupSearchResult = ({
  type,
  rooms,
  isLoading,
  isLoadingMore = false,
  hasMore = false,
  lastRoomElementCallback,
  error,
  selectedFilter,
  setSelectedFilter,
  onChangeCategory,
  currentCategory,
}: Props) => {
  const mapped = useMemo(() => rooms.map(mapToGroupCardModel), [rooms]);
  const isEmpty = !isLoading && mapped.length === 0;

  return (
    <>
      <TabContainer>
        {CATEGORIES.map(tab => {
          const selected = tab === currentCategory;
          return (
            <Tab
              key={tab}
              selected={selected}
              onClick={() => onChangeCategory(selected ? '' : tab)}
              aria-pressed={selected}
            >
              {tab}
            </Tab>
          );
        })}
      </TabContainer>

      <GroupCardHeader>
        {type === 'searched' && <GroupNum>전체 {mapped.length}</GroupNum>}
        <Filter
          filters={FILTER}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </GroupCardHeader>

      <Content>
        {error && <ErrorText>{error}</ErrorText>}

        {isEmpty ? (
          <EmptyContent>
            <EmptyMainText>해당하는 모임방이 없어요</EmptyMainText>
            <EmptySubText>검색어를 바꿔보거나 직접 모임방을 만들어보세요.</EmptySubText>
          </EmptyContent>
        ) : (
          mapped.map((group, idx) => (
            <div
              key={group.id}
              ref={
                lastRoomElementCallback && idx === mapped.length - 1
                  ? lastRoomElementCallback
                  : undefined
              }
            >
              <GroupCard group={group} isOngoing={group.isOnGoing} type="search" />
            </div>
          ))
        )}

        {isLoadingMore && mapped.length > 0 && <LoadingText>불러오는 중...</LoadingText>}
        {!hasMore && mapped.length > 0 && <EndText>더 이상 결과가 없어요</EndText>}
      </Content>
    </>
  );
};

export default GroupSearchResult;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 20px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ selected?: boolean }>`
  white-space: nowrap;
  padding: 8px 12px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) =>
    selected ? 'var(--color-purple-main)' : 'var(--color-darkgrey-main)'};
  color: #fff;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding: 0 20px 24px;
`;

const GroupCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const GroupNum = styled.span`
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

const EmptyContent = styled.div`
  display: flex;
  height: 60vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const EmptyMainText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
`;

const EmptySubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
`;

const LoadingText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  text-align: center;
`;

const EndText = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.xs};
  text-align: center;
`;

const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: ${typography.fontSize.sm};
  text-align: center;
`;
