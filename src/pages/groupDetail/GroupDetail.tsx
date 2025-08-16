import { useState, useEffect } from 'react';
import {
  Wrapper,
  TopBackground,
  Header,
  BannerSection,
  GroupTitle,
  SubTitle,
  Intro,
  MetaInfo,
  Meta,
  MetaDate,
  MetaMember,
  MetaTotalMember,
  TagRow,
  Tag,
  TagGenre,
  BookSection,
  BookHeader,
  BookInfo,
  BookCover,
  BookDetails,
  BookIntro,
  RecommendSection,
  RecommendText,
  GroupCardBox,
  BottomButton,
} from './GroupDetail.styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@/components/common/IconButton';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import { GroupCard } from '@/components/group/GroupCard';
import {
  getRoomDetail,
  type RoomDetailResponse,
  type RecommendRoom,
} from '@/api/rooms/getRoomDetail';
import type { Group } from '@/components/group/MyGroupBox';

const GroupDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState<RoomDetailResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackButton = () => {
    navigate(-1);
  };

  const convertRecommendRoomToGroup = (room: RecommendRoom): Group => {
    return {
      id: room.roomId.toString(),
      title: room.roomName,
      userName: '',
      participants: room.memberCount,
      maximumParticipants: room.recruitCount,
      coverUrl: room.roomImageUrl,
      deadLine: 0,
      genre: '',
      isOnGoing: true,
    };
  };

  const calculateDday = (recruitEndDate: string): string => {
    const today = new Date();
    const endDate = new Date(recruitEndDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(endDate);
    if (diffDays < 0) return '모집 종료';
    if (diffDays === 0) return '오늘 마감';
    return `${diffDays}일 남음`;
  };

  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (!roomId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await getRoomDetail(Number(roomId));
        console.log(response);

        if (response.isSuccess) {
          setRoomData(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        console.error('방 상세 정보 조회 실패:', error);
        setError('방 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetail();
  }, [roomId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || !roomData) {
    return <div>에러: {error}</div>;
  }

  const {
    roomName,
    isPublic,
    roomDescription,
    progressStartDate,
    progressEndDate,
    memberCount,
    recruitCount,
    recruitEndDate,
    category,
    bookTitle,
    authorName,
    bookDescription,
    bookImageUrl,
    recommendRooms,
  } = roomData;

  return (
    <Wrapper>
      <TopBackground genre={category}>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
        </Header>
        <BannerSection>
          <GroupTitle>
            {roomName} {!isPublic && <img src={lockIcon} alt="자물쇠 아이콘"></img>}
          </GroupTitle>
          <SubTitle>
            <div>소개글</div>
            <br />
            <Intro>{roomDescription}</Intro>
          </SubTitle>
          <MetaInfo>
            <Meta>
              <span>
                <IconButton src={calendarIcon} alt="달력 아이콘" /> 모임 활동기간
              </span>
              <MetaDate>
                {progressStartDate} ~ {progressEndDate}
              </MetaDate>
            </Meta>
            <Meta>
              <span>
                <IconButton src={peopleIcon} alt="사람 아이콘" /> 참여 중인 독서메이트
              </span>
              <span>
                <MetaMember>{memberCount}</MetaMember>
                <MetaTotalMember>/ {recruitCount}명</MetaTotalMember>
              </span>
            </Meta>
          </MetaInfo>
          <TagRow>
            <Tag>
              모집 <strong>{calculateDday(recruitEndDate)}</strong>
            </Tag>
            <Tag>
              장르 <TagGenre>{category}</TagGenre>
            </Tag>
          </TagRow>
        </BannerSection>
      </TopBackground>
      <BookSection>
        <BookHeader>
          <h3>{bookTitle}</h3>
          <IconButton src={rightChevron} alt="책 이동 버튼"></IconButton>
        </BookHeader>
        <BookInfo>
          <BookCover src={bookImageUrl} alt={bookTitle} />
          <BookDetails>
            <div>{authorName}</div>
            <BookIntro>
              도서 소개 <br />
              <p>{bookDescription}</p>
            </BookIntro>
          </BookDetails>
        </BookInfo>
      </BookSection>
      <RecommendSection>
        <RecommendText>이런 모임방은 어때요?</RecommendText>
        <GroupCardBox>
          {recommendRooms.map(room => (
            <GroupCard
              key={room.roomId}
              group={convertRecommendRoomToGroup(room)}
              isOngoing={true}
              isRecommend={true}
              type={'modal'}
            />
          ))}
        </GroupCardBox>
      </RecommendSection>
      <BottomButton>참여하기</BottomButton>
    </Wrapper>
  );
};

export default GroupDetail;
