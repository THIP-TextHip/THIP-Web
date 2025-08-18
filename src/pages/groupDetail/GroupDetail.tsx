// src/pages/group/GroupDetail.tsx
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
import { postJoinRoom } from '@/api/rooms/postJoinRoom';
import { postCloseRoom } from '@/api/rooms/postCloseRoom';
import type { Group } from '@/components/group/MyGroupBox';

import PasswordModal from '@/components/group/PasswordModal';

const GroupDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState<RoomDetailResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isJoining, setIsJoining] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
      deadLine: '',
      genre: '',
      isOnGoing: true,
    };
  };

  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (!roomId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await getRoomDetail(Number(roomId));

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

  useEffect(() => {
    if (roomData) {
      setIsJoining(roomData.isJoining);
    }
  }, [roomData]);

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

  const handleBookSectionClick = () => {
    const isbn = roomData?.isbn;
    if (isbn) {
      navigate(`/search/book/${isbn}`);
    }
  };

  const handleRecommendGroupCardClick = (roomId: number | string) => {
    navigate(`/group/detail/${roomId}`);
  };

  const handleBottomButtonClick = async () => {
    if (!roomId) return;

    if (roomData.isHost) {
      try {
        setIsSubmitting(true);
        await postCloseRoom(Number(roomId));
        setRoomData(prev => (prev ? { ...prev } : prev));
        alert('모집을 마감했습니다.');
      } catch {
        alert('네트워크 오류 또는 서버 오류');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const nextType: 'join' | 'cancel' = isJoining ? 'cancel' : 'join';

    if (nextType === 'join' && !isPublic) {
      setShowPasswordModal(true);
      return;
    }

    try {
      setIsSubmitting(true);
      await postJoinRoom(Number(roomId), nextType);

      setIsJoining(prev => !prev);

      setRoomData(prev =>
        prev
          ? {
              ...prev,
              isJoining: !prev.isJoining,
              memberCount:
                nextType === 'join'
                  ? Math.min(prev.memberCount + 1, prev.recruitCount)
                  : Math.max(prev.memberCount - 1, 0),
            }
          : prev,
      );
    } catch {
      alert('네트워크 오류 또는 서버 오류');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <TopBackground genre={category}>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
        </Header>
        <BannerSection>
          <GroupTitle>
            {roomName} {!isPublic && <img src={lockIcon} alt="자물쇠 아이콘" />}
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
              모집 <strong>{recruitEndDate}</strong>
            </Tag>
            <Tag>
              장르 <TagGenre>{category}</TagGenre>
            </Tag>
          </TagRow>
        </BannerSection>
      </TopBackground>

      <BookSection onClick={handleBookSectionClick}>
        <BookHeader>
          <h3>{bookTitle}</h3>
          <IconButton src={rightChevron} alt="책 이동 버튼" />
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
              type="modal"
              onClick={() => handleRecommendGroupCardClick(room.roomId)}
            />
          ))}
        </GroupCardBox>
      </RecommendSection>

      <BottomButton onClick={handleBottomButtonClick} disabled={isSubmitting}>
        {roomData.isHost ? '모집 마감하기' : isJoining ? '참여 취소하기' : '참여하기'}
      </BottomButton>

      {showPasswordModal && roomId && (
        <PasswordModal
          roomId={Number(roomId)}
          onClose={() => setShowPasswordModal(false)}
          onJoined={() => {
            setIsJoining(true);
            setRoomData(prev =>
              prev
                ? {
                    ...prev,
                    isJoining: true,
                    memberCount: Math.min(prev.memberCount + 1, prev.recruitCount),
                  }
                : prev,
            );
          }}
        />
      )}
    </Wrapper>
  );
};

export default GroupDetail;
