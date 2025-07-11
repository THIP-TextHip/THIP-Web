import MainHeader from '@/components/common/MainHeader';
import NavBar from '@/components/common/NavBar';
import SearchBar from '@/components/common/SearchBar';
import type { Group as GroupType } from '@/components/group/MyGroupBox';
import { MyGroupBox } from '../../components/group/MyGroupBox';
import Blank from '@/components/common/Blank';
import styled from '@emotion/styled';
import { RecruitingGroupCarousel, type Section } from '@/components/group/RecruitingGroupCarousel';
import { useState } from 'react';
import { MyGroupModal } from '@/components/group/MyGroupModal';
import CompletedGroupModal from '@/components/group/CompletedGroupModal';
import { useNavigate } from 'react-router-dom';

const dummyMyGroups: GroupType[] = [
  {
    id: '1',
    title: '호르몬 체인지 완독하는 방',
    participants: 22,
    userName: 'hoho',
    progress: 40,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
  },
  {
    id: '2',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    progress: 0,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
  },
  {
    id: '3',
    title: '일본 소설 좋아하는 사람들',
    userName: 'hoho3',
    participants: 30,
    progress: 100,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
  },
];

const dummyRecruitingGroups: GroupType[] = [
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

const sections: Section[] = [
  { title: '마감 임박한 독서 모임방', groups: dummyRecruitingGroups },
  { title: '인기 있는 독서 모임방', groups: dummyRecruitingGroups },
  { title: '인플루언서·작가 독서 모임방', groups: dummyRecruitingGroups },
];

const Group = () => {
  const navigate = useNavigate();
  const [isMyGroupModalOpen, setIsMyGroupModalOpen] = useState(false);
  const [isCompletedGroupModalOpen, setIsCompletedGroupModalOpen] = useState(false);

  const openMyGroupModal = () => setIsMyGroupModalOpen(true);
  const closeMyGroupModal = () => setIsMyGroupModalOpen(false);

  const openCompletedGroupModal = () => setIsCompletedGroupModalOpen(true);
  const closeCompletedGroupModal = () => setIsCompletedGroupModalOpen(false);

  const handleSearchBarClick = () => {
    navigate('/groupSearch');
  };
  return (
    <Wrapper>
      {isMyGroupModalOpen && <MyGroupModal onClose={closeMyGroupModal} />}
      {isCompletedGroupModalOpen && <CompletedGroupModal onClose={closeCompletedGroupModal} />}
      <MainHeader type="group" leftButtonClick={openCompletedGroupModal} />
      <SearchBar placeholder="모임방 참여할 사람!" onClick={handleSearchBarClick} />
      <MyGroupBox groups={dummyMyGroups} onMyGroupsClick={openMyGroupModal}></MyGroupBox>
      <Blank height={'10px'} margin={'32px 0'}></Blank>
      <RecruitingGroupCarousel sections={sections} />
      <NavBar />
    </Wrapper>
  );
};

export default Group;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 767px;
  height: 100%;
  margin: 0 auto;
  background-color: #121212;
`;
