import styled from '@emotion/styled';
import { useState } from 'react';
import type { Group } from '../group/MyGroupBox';
import { GroupCard } from '../group/GroupCard';
import { colors, typography } from '@/styles/global/global';
import { Filter } from '../common/Filter';

const GENRE = ['문학', '과학·IT', '사회과학', '인문학', '예술'];

const FILTER = ['마감임박순', '인기순'];

const dummyMyGroups: Group[] = [
  {
    id: '1',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    maximumParticipants: 30,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
    deadLine: 1,
    genre: '문학',
    isOnGoing: true,
  },
  {
    id: '2',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    maximumParticipants: 30,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
    deadLine: 2,
    genre: '문학',
    isOnGoing: true,
  },
  {
    id: '3',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    maximumParticipants: 30,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
    deadLine: 3,
    genre: '문학',
    isOnGoing: true,
  },
  {
    id: '4',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    maximumParticipants: 30,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
    deadLine: 4,
    genre: '문학',
    isOnGoing: true,
  },
  {
    id: '5',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    maximumParticipants: 30,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
    deadLine: 4,
    genre: '과학·IT',
    isOnGoing: false,
  },
  {
    id: '6',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    maximumParticipants: 30,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
    deadLine: 4,
    genre: '과학·IT',
    isOnGoing: false,
  },
];

const SearchResult = () => {
  const [selected, setSelected] = useState<string>('');
  const [showGroup, setShowGroup] = useState<Group[]>(dummyMyGroups);
  const [selectedFilter, setSelectedFilter] = useState<string>('마감임박순');

  const handleSelectTab = (tab: string) => {
    if (selected === tab) {
      setSelected('');
    } else setSelected(tab);
  };

  const isEmptyShowGroup = () => {
    if (showGroup.length === 0) {
      return true;
    } else return false;
  };

  return (
    <>
      <TabContainer>
        {GENRE.map(tab => (
          <Tab key={tab} selected={tab === selected} onClick={() => handleSelectTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>
      <GroupCardHeader>
        <GroupNum>전체 {showGroup.length}</GroupNum>
        <Filter
          filters={FILTER}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        ></Filter>
      </GroupCardHeader>
      <Content>
        {isEmptyShowGroup() ? (
          <EmptyContent>
            <EmptyMainText>해당하는 모임방이 없어요</EmptyMainText>
            <EmptySubText>직접 모임방을 만들어보세요.</EmptySubText>
          </EmptyContent>
        ) : (
          showGroup.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              isOngoing={group.isOnGoing ? true : false}
              type={'search'}
            />
          ))
        )}
      </Content>
    </>
  );
};

export default SearchResult;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 20px;
  margin-bottom: 24px;
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
  gap: 20px;
  overflow-y: auto;
  padding: 0 20px;
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
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

const EmptyContent = styled.div`
  display: flex;
  height: 100vh;
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
  justify-self: center;
`;
const EmptySubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
  justify-self: center;
`;
