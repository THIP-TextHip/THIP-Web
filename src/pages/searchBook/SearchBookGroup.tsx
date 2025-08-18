import TitleHeader from '@/components/common/TitleHeader';
import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { GroupCard } from '@/components/group/GroupCard';
import { type RecruitingRoomsData } from '@/api/books/getRecruitingRooms';

interface LocationState {
  recruitingRooms: RecruitingRoomsData;
  bookInfo: {
    isbn: string;
    title: string;
    author: string;
    imageUrl: string;
  };
}

const SearchBookGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recruitingRooms, bookInfo } = (location.state as LocationState) || {};

  const handleBackButton = () => {
    navigate(-1);
  };
  const handleMakeGroup = () => {
    const selectedBook = {
      title: bookInfo.title,
      author: bookInfo.author,
      cover: bookInfo.imageUrl,
      isbn: bookInfo.isbn,
    };
    navigate('/group/create', { state: { selectedBook } });
  };

  const groupList = recruitingRooms?.recruitingRoomList || [];
  const totalCount = recruitingRooms?.totalRoomCount || 0;
  const hasGroups = groupList.length > 0;

  return (
    <Wrapper>
      <TitleHeader
        title="모집중인 모임방"
        leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
        onLeftClick={handleBackButton}
      />
      <ContentHeader>전체 {totalCount}</ContentHeader>
      {hasGroups ? (
        <Content>
          {groupList.map((room, index) => (
            <GroupCard
              key={room.roomId || index}
              group={{
                id: room.roomId,
                title: room.roomName,
                participants: room.memberCount,
                maximumParticipants: room.recruitCount,
                deadLine: '',
                coverUrl: room.bookImageUrl || bookInfo?.imageUrl,
              }}
              isOngoing={true}
              type={'modal'}
            />
          ))}
        </Content>
      ) : (
        <EmptyState>
          <EmptyTitle>이 책으로 모집중인 모임방이 없어요.</EmptyTitle>
          <EmptySubText>직접 모임방을 만들어보세요!</EmptySubText>
        </EmptyState>
      )}
      <BottomButton onClick={handleMakeGroup}>모임방 만들기</BottomButton>
    </Wrapper>
  );
};

export default SearchBookGroup;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;
const ContentHeader = styled.div`
  display: flex;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[100]};
  border-bottom: 1px solid ${colors.darkgrey.dark};
  margin: 76px 20px 20px 20px;
  padding-bottom: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding: 0 20px;
  margin-bottom: 70px;
  width: 100%;
`;

const EmptyState = styled.div`
  flex: 1;
  min-height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  margin-bottom: 70px;
  color: ${colors.grey[100]};
  text-align: center;
`;

const EmptyTitle = styled.p`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
  color: ${colors.white};
`;

const EmptySubText = styled.p`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
`;
const BottomButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  height: 50px;
  background-color: ${colors.purple.main};
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border: none;
  z-index: 10;
`;
