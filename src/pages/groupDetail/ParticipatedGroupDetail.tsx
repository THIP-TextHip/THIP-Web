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
} from './ParticipatedGroupDetail.styled';
import RecordSection from '../../components/group/RecordSection';
import CommentSection from '../../components/group/CommentSection';
import HotTopicSection from '../../components/group/HotTopicSection';
import GroupBookSection from '../../components/group/GroupBookSection';
import GroupActionBottomSheet from '../../components/group/GroupActionBottomSheet';
import { usePopupActions } from '@/hooks/usePopupActions';
import {
  getRoomPlaying,
  type RoomPlayingResponse,
  convertVotesToPolls,
  type Poll,
} from '@/api/rooms/getRoomPlaying';
import rightChevron from '../../assets/group/right-chevron.svg';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { IconButton } from '@/components/common/IconButton';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import styled from '@emotion/styled';

const ParticipatedGroupDetail = () => {
  const { openConfirm, openSnackbar } = usePopupActions();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  // API 상태 관리
  const [roomData, setRoomData] = useState<RoomPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI 상태 관리
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // API 호출
  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (!roomId) {
        setError('방 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getRoomPlaying(parseInt(roomId));

        if (response.isSuccess) {
          setRoomData(response);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('방 정보를 불러오는 중 오류가 발생했습니다.');
        console.error('방 상세 정보 조회 오류:', err);
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
        console.log('방 삭제 확정');
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
      onConfirm: () => {
        console.log('방 나가기 확정');
        openSnackbar({
          message: '나가기 기능은 현재 개발 중입니다.',
          variant: 'top',
          isError: true,
          onClose: () => {},
        });
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

  // 로딩 상태
  if (loading) {
    return (
      <ParticipatedWrapper>
        <LoadingContainer>로딩 중...</LoadingContainer>
      </ParticipatedWrapper>
    );
  }

  // 에러 상태
  if (error || !roomData) {
    return (
      <ParticipatedWrapper>
        <ErrorContainer>{error || '데이터를 불러올 수 없습니다.'}</ErrorContainer>
      </ParticipatedWrapper>
    );
  }

  const { data } = roomData;

  // API 데이터를 컴포넌트에 맞게 변환
  const polls: Poll[] = convertVotesToPolls(data.currentVotes);
  const hasPolls = polls.length > 0;

  // 날짜 포맷팅 (YYYY-MM-DD -> YYYY.MM.DD)
  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, '.');
  };

  // 장르에 따른 배경색 결정 (카테고리 컬러 사용)
  const getGenreForBackground = () => {
    // categoryColor를 사용하거나 기본값으로 장르명 사용
    return data.category;
  };

  // 댓글 섹션 메시지
  const commentData = {
    message: '모임방 멤버들과 간단한 인사를 나눠보세요!',
  };

  return (
    <ParticipatedWrapper>
      <TopBackground genre={getGenreForBackground()}>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
          <IconButton src={moreIcon} onClick={handleMoreButton} />
        </Header>
        <BannerSection>
          <GroupTitle>
            {data.roomName} {!data.isPublic && <img src={lockIcon} alt="자물쇠 아이콘"></img>}
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

      <GroupBookSection
        title={data.bookTitle}
        author={data.authorName}
        onClick={handleBookSectionClick}
      />

      <RecordSection
        currentPage={data.currentPage}
        progress={data.userPercentage}
        onClick={handleRecordSectionClick}
      />

      <CommentSection message={commentData.message} onClick={handleCommentSectionClick} />

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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-grey-200);
  font-size: var(--string-size-base, 16px);
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-red);
  font-size: var(--string-size-base, 16px);
  text-align: center;
  padding: 20px;
`;

export default ParticipatedGroupDetail;
