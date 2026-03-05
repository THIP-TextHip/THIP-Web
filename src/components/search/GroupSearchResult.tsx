import { useMemo } from 'react';
import type { RefObject } from 'react';
import { GroupCard } from '../group/GroupCard';
import { Filter } from '../common/Filter';
import type { SearchRoomItem } from '@/api/rooms/getSearchRooms';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  TabContainer,
  Tab,
  Content,
  GroupCardHeader,
  GroupNum,
  EmptyContent,
  EmptyMainText,
  EmptySubText,
  LoadingText,
  ErrorText,
} from './GroupSearchResult.styled';

const FILTER = ['마감임박순', '인기순'];
const CATEGORIES = ['전체', '문학', '과학·IT', '사회과학', '인문학', '예술'] as const;

type ResultType = 'searching' | 'searched';

interface Props {
  type: ResultType;
  rooms: SearchRoomItem[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  sentinelRef?: RefObject<HTMLDivElement | null>;
  error: string | null;
  selectedFilter: string;
  setSelectedFilter: (v: string) => void;
  onChangeCategory: (category: string) => void;
  currentCategory: string;
  showTabs: boolean;
  onClickRoom: (roomId: number) => void;
}

const mapToGroupCardModel = (r: SearchRoomItem) => ({
  id: String(r.roomId),
  title: r.roomName,
  userName: '',
  participants: r.memberCount,
  maximumParticipants: r.recruitCount,
  coverUrl: r.bookImageUrl,
  deadLine: r.deadlineDate,
  genre: (r as SearchRoomItem)?.genre ?? '',
  isOnGoing: r.isPublic,
});

const GroupSearchResult = ({
  type,
  rooms,
  isLoading,
  isLoadingMore = false,
  hasMore = false,
  sentinelRef,
  error,
  selectedFilter,
  setSelectedFilter,
  onChangeCategory,
  currentCategory,
  showTabs,
  onClickRoom,
}: Props) => {
  const mapped = useMemo(() => rooms.map(mapToGroupCardModel), [rooms]);
  // searching 중에는 아직 debounce 대기 중일 수 있으므로 빈 결과 화면을 표시하지 않음
  const isEmpty = !isLoading && mapped.length === 0 && type !== 'searching';
  // 기존 결과를 유지한 채 재검색 중인 상태 (필터·카테고리 변경 시)
  const isRefetching = isLoading && mapped.length > 0;

  return (
    <>
      {showTabs && (
        <TabContainer>
          {CATEGORIES.map(tab => {
            const selected = tab === currentCategory || (tab === '전체' && currentCategory === '');
            return (
              <Tab
                key={tab}
                selected={selected}
                onClick={() => onChangeCategory(tab === '전체' ? '' : tab)}
                aria-pressed={selected}
              >
                {tab}
              </Tab>
            );
          })}
        </TabContainer>
      )}

      {(showTabs || type === 'searched') && (
        <GroupCardHeader>
          {/* 재검색 중엔 이전 카운트를 유지하고, 초기 검색 완료 시 카운트를 표시 */}
          <GroupNum>{isLoading && !isRefetching ? '' : `전체 ${mapped.length}`}</GroupNum>
          <Filter
            filters={FILTER}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </GroupCardHeader>
      )}

      <Content isRefetching={isRefetching}>
        {error && <ErrorText>{error}</ErrorText>}

        {isEmpty ? (
          <EmptyContent>
            <EmptyMainText>해당하는 모임방이 없어요</EmptyMainText>
            <EmptySubText>검색어를 바꿔보거나 직접 모임방을 만들어보세요.</EmptySubText>
          </EmptyContent>
        ) : (
          mapped.map((group, idx) => (
            <GroupCard
              key={group.id}
              group={group}
              type={'search'}
              isOngoing={false}
              isFirstCard={type === 'searching' && idx === 0}
              onClick={() => onClickRoom(Number(group.id))}
            />
          ))
        )}

        {hasMore && <div ref={sentinelRef} style={{ height: 20 }} />}
        {isLoadingMore && mapped.length > 0 && (
          <LoadingText>
            <LoadingSpinner size="small" fullHeight={false} />
          </LoadingText>
        )}
      </Content>
    </>
  );
};

export default GroupSearchResult;
