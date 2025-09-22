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
  deadLine: room.deadlineDate,
  genre: category,
});

const Group = () => {
  const navigate = useNavigate();
  const [isMyGroupModalOpen, setIsMyGroupModalOpen] = useState(false);
  const [isCompletedGroupModalOpen, setIsCompletedGroupModalOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { title: '마감 임박한 독서 모임방', groups: [] },
    { title: '인기 있는 독서 모임방', groups: [] },
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
      ]);
    } catch (error) {
      console.error('방 목록 조회 오류:', error);
      setSections([
        { title: '마감 임박한 독서 모임방', groups: [] },
        { title: '인기 있는 독서 모임방', groups: [] },
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

  const handleNoticeButton = () => {
    navigate('/notice');
  };

  return (
    <Wrapper>
      {isMyGroupModalOpen && <MyGroupModal onClose={closeMyGroupModal} />}
      {isCompletedGroupModalOpen && <CompletedGroupModal onClose={closeCompletedGroupModal} />}
      <MainHeader
        type="group"
        leftButtonClick={openCompletedGroupModal}
        rightButtonClick={handleNoticeButton}
      />
      <SearchBar placeholder="모임방 참여할 사람!" onClick={handleSearchBarClick} />
      <MyGroupBox onMyGroupsClick={openMyGroupModal}></MyGroupBox>
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
  justify-content: flex-start;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 56px;
  background-color: #121212;
`;
