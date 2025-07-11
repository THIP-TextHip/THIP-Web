import styled from '@emotion/styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import TitleHeader from '../common/TitleHeader';
import { Modal, Overlay } from './Modal.styles';

interface CompletedGroupModalProps {
  onClose: () => void;
}

const dummyCompletedGroups: Group[] = [
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
  },
];

const userName = '00';

const CompletedGroupModal = ({ onClose }: CompletedGroupModalProps) => {
  return (
    <Overlay>
      <Modal>
        <TitleHeader
          title="완료된 모임방"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={onClose}
        />
        <Text>{userName}님이 참여했던 모임방들을 확인해보세요.</Text>
        <Content>
          {dummyCompletedGroups.map(group => (
            <GroupCard key={group.id} group={group}></GroupCard>
          ))}
        </Content>
      </Modal>
    </Overlay>
  );
};

export default CompletedGroupModal;

const Text = styled.p`
  font-size: var(--font-size-medium01);
  font-weight: var(--font-weight-regular);
  color: var(--color-white);
  margin: 96px 20px 20px 20px;
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
