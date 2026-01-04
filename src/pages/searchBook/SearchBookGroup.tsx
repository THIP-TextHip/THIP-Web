import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { GroupCard } from '@/components/group/GroupCard';
import { type RecruitingRoomsData } from '@/api/books/getRecruitingRooms';
import {
  Wrapper,
  ContentHeader,
  Content,
  EmptyState,
  EmptyTitle,
  EmptySubText,
  BottomButton,
} from './SearchBookGroup.styled';

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
  const handleGroupCardClick = (roomId: number) => {
    navigate(`/group/detail/${roomId}`);
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
                deadLine: room.deadlineEndDate,
                coverUrl: room.bookImageUrl || bookInfo?.imageUrl,
                isOnGoing: room.isPublic,
              }}
              isOngoing={false}
              type={'modal'}
              onClick={() => handleGroupCardClick(room.roomId)}
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
