import { useState } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '../common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import { Modal, Overlay } from './modal.styles';

interface MyGroupModalProps {
  onClose: () => void;
}

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

export const MyGroupModal = ({ onClose }: MyGroupModalProps) => {
  const [selected, setSelected] = useState<'진행중' | '모집중' | ''>('');

  const filtered = selected
    ? dummyMyGroups.filter(g => (selected === '진행중' ? g.isOnGoing : !g.isOnGoing))
    : dummyMyGroups;
  return (
    <Overlay>
      <Modal>
        <TitleHeader
          title="내 모임방"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={onClose}
        />

        <TabContainer>
          {(['진행중', '모집중'] as const).map(tab => (
            <Tab
              key={tab}
              selected={tab === selected}
              onClick={() => setSelected(prev => (prev === tab ? '' : tab))}
            >
              {tab}
            </Tab>
          ))}
        </TabContainer>

        <Content>
          {filtered.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              type={group.isOnGoing ? 'ongoing' : 'recruiting'}
            />
          ))}
        </Content>
      </Modal>
    </Overlay>
  );
};

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 76px 20px 20px 20px;
`;

const Tab = styled.button<{ selected: boolean }>`
  white-space: nowrap;
  padding: 6px 12px;
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-regular);
  border: none;
  border-radius: 16px;
  background: ${({ selected }) =>
    selected ? 'var(--color-purple-main)' : 'var(--color-darkgrey-main)'};
  color: #fff;
  cursor: pointer;
`;

const Content = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: auto;
  padding: 0 20px;

  grid-template-columns: 1fr;

  @media (min-width: 584px) {
    grid-template-columns: 1fr 1fr;
  }
`;
