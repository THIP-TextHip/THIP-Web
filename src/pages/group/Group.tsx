import MainHeader from '@/components/common/MainHeader';
import NavBar from '@/components/common/NavBar';
import SearchBar from '@/components/search/SearchBar';
import type { Group as GroupType } from '@/components/group/MyGroupBox';
import { MyGroupBox } from '../../components/group/MyGroupBox';
import Blank from '@/components/common/Blank';
import styled from '@emotion/styled';
import { RecruitingGroupCarousel, type Section } from '@/components/group/RecruitingGroupCarousel';
import { useState, useEffect } from 'react';
import { MyGroupModal } from '@/components/group/MyGroupModal';
import CompletedGroupModal from '@/components/group/CompletedGroupModal';
import { useNavigate } from 'react-router-dom';
import makegroupfab from '../../assets/common/makegroupfab.svg';
import { getRoomsByCategory, type RoomItem } from '@/api/rooms/getRoomsByCategory';

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

const convertRoomItemToGroup = (
  room: RoomItem,
  category: string,
  listType: 'deadline' | 'popular',
): GroupType => ({
  id: `${room.roomId}-${category}-${listType}`,
  title: room.roomName,
  participants: room.memberCount,
  maximumParticipants: room.recruitCount,
  coverUrl: room.bookImageUrl,
  deadLine: Math.ceil(
    (new Date(room.deadlineDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  ),
  genre: category,
});

const Group = () => {
  const navigate = useNavigate();
  const [isMyGroupModalOpen, setIsMyGroupModalOpen] = useState(false);
  const [isCompletedGroupModalOpen, setIsCompletedGroupModalOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { title: '마감 임박한 독서 모임방', groups: [] },
    { title: '인기 있는 독서 모임방', groups: [] },
    { title: '인플루언서·작가 독서 모임방', groups: [] },
  ]);

  const fetchAllRoomsData = async () => {
    try {
      const categories = ['문학', '인문학', '사회과학', '과학·IT', '예술'];
      const deadlineRoomsData: GroupType[] = [];
      const popularRoomsData: GroupType[] = [];

      for (const category of categories) {
        const response = await getRoomsByCategory(category);
        if (response.isSuccess) {
          const deadlineGroups = response.data.deadlineRoomList.map(room =>
            convertRoomItemToGroup(room, category, 'deadline'),
          );
          const popularGroups = response.data.popularRoomList.map(room =>
            convertRoomItemToGroup(room, category, 'popular'),
          );
          deadlineRoomsData.push(...deadlineGroups);
          popularRoomsData.push(...popularGroups);
        }
      }

      setSections([
        { title: '마감 임박한 독서 모임방', groups: deadlineRoomsData },
        { title: '인기 있는 독서 모임방', groups: popularRoomsData },
        { title: '인플루언서·작가 독서 모임방', groups: [] },
      ]);
    } catch (error) {
      console.error('방 목록 조회 오류:', error);
      setSections([
        { title: '마감 임박한 독서 모임방', groups: [] },
        { title: '인기 있는 독서 모임방', groups: [] },
        { title: '인플루언서·작가 독서 모임방', groups: [] },
      ]);
    }
  };

  useEffect(() => {
    fetchAllRoomsData();
  }, []);

  const openMyGroupModal = () => setIsMyGroupModalOpen(true);
  const closeMyGroupModal = () => setIsMyGroupModalOpen(false);

  const openCompletedGroupModal = () => setIsCompletedGroupModalOpen(true);
  const closeCompletedGroupModal = () => setIsCompletedGroupModalOpen(false);

  const handleSearchBarClick = () => {
    navigate('/group/search');
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
      <NavBar src={makegroupfab} path="/group/create" />
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
