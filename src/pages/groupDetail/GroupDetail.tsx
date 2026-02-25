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
import bookCoverLargeImg from '../../assets/books/bookCoverLarge.svg';

import PasswordModal from '@/components/group/PasswordModal';
import { usePopupStore } from '@/stores/popupStore';
import { BannerSkeleton, BookSkeleton } from '@/shared/ui/Skeleton';

const GroupDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState<RoomDetailResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isJoining, setIsJoining] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const openPopup = usePopupStore(state => state.openPopup);
  const closePopup = usePopupStore(state => state.closePopup);

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
      coverUrl: room.bookImageUrl,
      deadLine: room.recruitEndDate,
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

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [response] = await Promise.all([
          getRoomDetail(Number(roomId)),
        ]);
        await minLoadingTime;

        if (response.isSuccess) {
          setRoomData(response.data);
        } else {
          setError(response.message);
        }
      } catch (error: unknown) {
        console.error('방 상세 정보 조회 실패:', error);

        if (error instanceof Error && error.message === '모집기간이 만료된 방입니다.') {
          navigate(`/group/detail/joined/${roomId}`, { replace: true });
          return;
        }

        if (error instanceof Error && error.message === '방 접근 권한이 없습니다.') {
          navigate('/group', { replace: true });
          return;
        }

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

  if (error) {
    return (
      <Wrapper>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
        </Header>
        <div style={{ padding: '100px 20px', textAlign: 'center', color: 'white' }}>{error}</div>
      </Wrapper>
    );
  }

  if (isLoading || !roomData) {
    return (
      <Wrapper>
        <TopBackground genre="">
          <Header>
            <IconButton src={leftArrow} onClick={handleBackButton} />
          </Header>
          <BannerSection>
            <BannerSkeleton />
          </BannerSection>
        </TopBackground>
        <BookSection>
          <BookSkeleton />
        </BookSection>
        <BottomButton disabled>로딩 중...</BottomButton>
      </Wrapper>
    );
  }

  const { memberCount, recruitCount, category, recommendRooms } = roomData;

  const handleBookSectionClick = () => {
    if (roomData.isbn) {
      navigate(`/search/book/${roomData.isbn}`);
    }
  };

  const handleRecommendGroupCardClick = (roomId: number | string) => {
    navigate(`/group/detail/${roomId}`);
  };

  const handleBottomButtonClick = async () => {
    if (!roomId) return;

    if (roomData.isHost) {
      openPopup('confirm-modal', {
        title: '모집을 마감하시겠습니까?',
        disc: `독서메이트 모집을 마감하면 <br> 지금 바로 모임방 활동을 시작할 수 있어요.`,
        onClose: () => closePopup(),
        onConfirm: async () => {
          closePopup();
          try {
            setIsSubmitting(true);
            await postCloseRoom(Number(roomId));
            setRoomData(prev => (prev ? { ...prev } : prev));
            openPopup('snackbar', {
              message: '독서메이트 모집을 성공적으로 마감했어요.',
              variant: 'top',
              onClose: () => closePopup(),
            });
            navigate(`/group/detail/joined/${roomId}`);
          } catch {
            alert('네트워크 오류 또는 서버 오류');
          } finally {
            setIsSubmitting(false);
          }
        },
      });
      return;
    }

    const nextType: 'join' | 'cancel' = isJoining ? 'cancel' : 'join';

    if (nextType === 'cancel') {
      openPopup('confirm-modal', {
        title: '모임방 참여를 취소하시겠어요?',
        disc: '지금 취소해도, 활동 시작 전에 다시 참여 가능해요.',
        onClose: () => closePopup(),
        onConfirm: async () => {
          closePopup();
          try {
            setIsSubmitting(true);
            await postJoinRoom(Number(roomId), 'cancel');
            navigate('/group');
            setTimeout(() => {
              openPopup('snackbar', {
                message: '모임방 참여가 취소되었습니다! 다른 방을 찾아보세요.',
                variant: 'top',
                onClose: () => closePopup(),
              });
            }, 300);
          } catch {
            alert('네트워크 오류 또는 서버 오류');
          } finally {
            setIsSubmitting(false);
          }
        },
      });
      return;
    }

    if (nextType === 'join' && !roomData.isPublic) {
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
      openPopup('snackbar', {
        message: '모임방 참여가 완료되었어요!',
        variant: 'top',
        onClose: () => closePopup(),
      });
    } catch {
      alert('네트워크 오류 또는 서버 오류');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinSuccess = () => {
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
    openPopup('snackbar', {
      message: '모임방 참여가 완료되었어요! 모집 마감 후 활동이 시작돼요.',
      variant: 'top',
      onClose: () => closePopup(),
    });
  };

  const buttonProps = (() => {
    if (roomData.isHost) return { text: '모집 마감하기', disabled: isSubmitting };
    if (isJoining) return { text: '참여 취소하기', disabled: isSubmitting };
    const isFull = memberCount >= recruitCount;
    return { text: '참여하기', disabled: isSubmitting || isFull };
  })();

  return (
    <Wrapper>
      <TopBackground genre={category}>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
        </Header>
        <BannerSection>
          <GroupTitle>
            {roomData.roomName} {!roomData.isPublic && <img src={lockIcon} alt="자물쇠 아이콘" />}
          </GroupTitle>
          <SubTitle>
            <div>소개글</div>
            <br />
            <Intro>{roomData.roomDescription}</Intro>
          </SubTitle>
          <MetaInfo>
            <Meta>
              <span>
                <IconButton src={calendarIcon} alt="달력 아이콘" /> 모임 활동기간
              </span>
              <MetaDate>
                {roomData.progressStartDate} ~ {roomData.progressEndDate}
              </MetaDate>
            </Meta>
            <Meta>
              <span>
                <IconButton src={peopleIcon} alt="사람 아이콘" /> 참여 중인 독서메이트
              </span>
              <span>
                <MetaMember>{roomData.memberCount}</MetaMember>
                <MetaTotalMember>/ {roomData.recruitCount}명</MetaTotalMember>
              </span>
            </Meta>
          </MetaInfo>
          <TagRow>
            <Tag>
              모집 <strong>{roomData.recruitEndDate}</strong>
            </Tag>
            <Tag>
              장르 <TagGenre>{roomData.category}</TagGenre>
            </Tag>
          </TagRow>
        </BannerSection>
      </TopBackground>

      <BookSection onClick={handleBookSectionClick}>
        <BookHeader>
          <h3>{roomData.bookTitle}</h3>
          <IconButton src={rightChevron} alt="책 이동 버튼" />
        </BookHeader>
        <BookInfo>
          <BookCover
            src={roomData.bookImageUrl ? roomData.bookImageUrl : bookCoverLargeImg}
            alt={roomData.bookTitle}
          />
          <BookDetails>
            <div>
              {roomData.authorName} 저 · {roomData.publisher}
            </div>
            <BookIntro>
              도서 소개 <br />
              <p>{roomData.bookDescription}</p>
            </BookIntro>
          </BookDetails>
        </BookInfo>
      </BookSection>

      {recommendRooms.length > 0 && (
        <RecommendSection>
          <RecommendText>이런 모임방은 어때요?</RecommendText>
          <GroupCardBox>
            {recommendRooms.map(room => (
              <GroupCard
                key={room.roomId}
                group={convertRecommendRoomToGroup(room)}
                isOngoing={false}
                isRecommend={true}
                type="modal"
                onClick={() => handleRecommendGroupCardClick(room.roomId)}
              />
            ))}
          </GroupCardBox>
        </RecommendSection>
      )}

      <BottomButton onClick={handleBottomButtonClick} disabled={buttonProps.disabled}>
        {buttonProps.text}
      </BottomButton>

      {showPasswordModal && roomId && (
        <PasswordModal
          roomId={Number(roomId)}
          onClose={() => setShowPasswordModal(false)}
          onJoined={handleJoinSuccess}
        />
      )}
    </Wrapper>
  );
};

export default GroupDetail;
