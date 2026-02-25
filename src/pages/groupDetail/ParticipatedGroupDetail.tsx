import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TopBackground,
  Header,
  BannerSection,
  GroupTitle,
  SubTitle,
  Intro,
  MetaDate,
  MetaMember,
  MetaTotalMember,
  TagRow,
  Tag,
  TagGenre,
} from './GroupDetail.styled';
import {
  ParticipatedWrapper,
  ClickableMeta,
  MetaChevron,
  MetaTopRow,
  MetaInfo,
  Meta,
  ErrorContainer,
} from './ParticipatedGroupDetail.styled';
import TitleHeader from '@/components/common/TitleHeader';
import RecordSection from '../../components/group/RecordSection';
import CommentSection from '../../components/group/CommentSection';
import HotTopicSection from '../../components/group/HotTopicSection';
import GroupBookSection from '../../components/group/GroupBookSection';
import GroupActionBottomSheet from '../../components/group/GroupActionBottomSheet';
import { usePopupActions } from '@/hooks/usePopupActions';
import {
  BannerSkeleton,
  GroupBookSectionSkeleton,
  RecordSectionSkeleton,
  CommentSectionSkeleton,
  HotTopicSectionSkeleton,
} from '@/shared/ui/Skeleton';
import {
  getRoomPlaying,
  type RoomPlayingResponse,
  convertVotesToPolls,
  type Poll,
} from '@/api/rooms/getRoomPlaying';
import { leaveRoom } from '@/api/rooms/leaveRoom';
import rightChevron from '../../assets/group/right-chevron.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { IconButton } from '@/components/common/IconButton';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import { isRoomCompleted } from '@/utils/roomStatus';

const ParticipatedGroupDetail = () => {
  const { openConfirm, openSnackbar } = usePopupActions();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const [roomData, setRoomData] = useState<RoomPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (!roomId) {
        setError('방 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [response] = await Promise.all([
          getRoomPlaying(parseInt(roomId)),
          minLoadingTime,
        ]);

        if (response.isSuccess) {
          setRoomData(response);
        } else {
          setError(response.message);
        }
      } catch (err: unknown) {
        console.error('방 상세 정보 조회 오류:', err);

        if (err instanceof Error && err.message === '방 접근 권한이 없습니다.') {
          navigate('/group', { replace: true });
          return;
        }

        setError('방 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [roomId]);

  const handleBackButton = () => {
    navigate('/group');
  };

  const handleMoreButton = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleDeleteGroup = () => {
    openConfirm({
      title: '모임방을 삭제하시겠어요?',
      disc: '방을 삭제하게 되면\n독서메이트들과의 추억이 사라집니다.',
      onConfirm: () => {
        openSnackbar({
          message: '삭제 기능은 현재 개발 중입니다.',
          variant: 'top',
          isError: true,
          onClose: () => {},
        });
      },
    });
  };

  const handleLeaveGroup = () => {
    openConfirm({
      title: '모임방을 나가시겠어요?',
      disc: '방을 나가시게 되면\n독서메이트들과의 추억이 사라집니다.',
      onConfirm: async () => {
        if (!roomId) return;

        try {
          const response = await leaveRoom(parseInt(roomId));

          if (response.isSuccess) {
            openSnackbar({
              message: '모임 나가기를 완료했어요.',
              variant: 'top',
              isError: false,
              onClose: () => {},
            });
            navigate('/group', { replace: true });
          } else {
            openSnackbar({
              message: response.message,
              variant: 'top',
              isError: true,
              onClose: () => {},
            });
          }
        } catch (error: unknown) {
          console.error('방 나가기 오류:', error);

          let errorMessage = '방 나가기 중 오류가 발생했습니다.';

          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            if (axiosError.response?.data?.message) {
              errorMessage = axiosError.response.data.message;
            }
          }

          openSnackbar({
            message: errorMessage,
            variant: 'top',
            isError: true,
            onClose: () => {},
          });
        }
      },
    });
  };

  const handleReportGroup = () => {
    console.log('방 신고하기');
  };

  const handleRecordSectionClick = () => {
    navigate(`/rooms/${roomId}/memory`);
  };

  const handleHotTopicSectionClick = () => {
    navigate(`/rooms/${roomId}/memory`);
  };

  const handlePollClick = (pageNumber: number) => {
    navigate(`/rooms/${roomId}/memory?page=${pageNumber}&filter=poll`);
  };

  const handleCommentSectionClick = () => {
    navigate(`/today-words/${roomId}`);
  };

  const handleBookSectionClick = () => {
    if (roomData?.data.isbn) {
      navigate(`/search/book/${roomData.data.isbn}`);
    }
  };

  const handleMembersClick = () => {
    navigate(`/group/${roomId}/members`);
  };

  if (error) {
    return (
      <ParticipatedWrapper>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          onLeftClick={handleBackClick}
        />
        <ErrorContainer>{error}</ErrorContainer>
      </ParticipatedWrapper>
    );
  }

  if (loading || !roomData) {
    return (
      <ParticipatedWrapper>
        <TopBackground genre="">
          <Header>
            <IconButton src={leftArrow} onClick={handleBackButton} />
          </Header>
          <BannerSection>
            <BannerSkeleton />
          </BannerSection>
        </TopBackground>
        <GroupBookSectionSkeleton />
        <RecordSectionSkeleton />
        <CommentSectionSkeleton />
        <HotTopicSectionSkeleton />
      </ParticipatedWrapper>
    );
  }

  const data = roomData.data;
  const polls: Poll[] = convertVotesToPolls(data.currentVotes);
  const hasPolls = polls.length > 0;
  const isCompleted = isRoomCompleted(data.progressEndDate);
  const formatDate = (dateString: string) => dateString.replace(/-/g, '.');

  return (
    <ParticipatedWrapper>
      <TopBackground genre={data.category}>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
          {!isCompleted && <IconButton src={moreIcon} onClick={handleMoreButton} />}
        </Header>
        <BannerSection>
          <GroupTitle>
            {data.roomName} {!data.isPublic && <img src={lockIcon} alt="자물쇠 아이콘" />}
          </GroupTitle>
          <SubTitle>
            <div>소개글</div>
            <br />
            <Intro>{data.roomDescription}</Intro>
          </SubTitle>
          <MetaInfo>
            <Meta>
              <span>
                <IconButton src={calendarIcon} alt="달력 아이콘" /> 모임 활동기간
              </span>
              <MetaDate>
                {formatDate(data.progressStartDate)} ~ {formatDate(data.progressEndDate)}
              </MetaDate>
            </Meta>
            <Meta>
              <ClickableMeta onClick={handleMembersClick}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <MetaTopRow>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <IconButton src={peopleIcon} alt="사람 아이콘" />
                      <span>독서메이트</span>
                    </div>
                    <MetaChevron src={rightChevron} alt="독서메이트 목록 보기" />
                  </MetaTopRow>
                  <span>
                    <MetaMember>{data.memberCount}</MetaMember>
                    <MetaTotalMember>명 참여 중</MetaTotalMember>
                  </span>
                </div>
              </ClickableMeta>
            </Meta>
          </MetaInfo>
          <TagRow>
            <Tag>
              장르 <TagGenre genre={data.category}>{data.category}</TagGenre>
            </Tag>
          </TagRow>
        </BannerSection>
      </TopBackground>

      <GroupBookSection title={data.bookTitle} author={data.authorName} onClick={handleBookSectionClick} />
      <RecordSection
        currentPage={data.currentPage}
        progress={data.userPercentage}
        onClick={handleRecordSectionClick}
      />
      <CommentSection
        message="모임방 멤버들과 간단한 인사를 나눠보세요!"
        onClick={handleCommentSectionClick}
      />
      <HotTopicSection
        polls={polls}
        hasPolls={hasPolls}
        onClick={handleHotTopicSectionClick}
        onPollClick={handlePollClick}
      />

      <GroupActionBottomSheet
        isOpen={isBottomSheetOpen}
        isGroupOwner={data.isHost}
        onClose={handleCloseBottomSheet}
        onDeleteGroup={handleDeleteGroup}
        onLeaveGroup={handleLeaveGroup}
        onReportGroup={handleReportGroup}
      />
    </ParticipatedWrapper>
  );
};

export default ParticipatedGroupDetail;
