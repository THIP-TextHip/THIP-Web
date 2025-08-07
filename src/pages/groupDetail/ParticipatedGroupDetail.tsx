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
import type { Poll } from '../../components/group/HotTopicSection';
import { usePopupActions } from '@/hooks/usePopupActions';
import rightChevron from '../../assets/group/right-chevron.svg';

import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/common/IconButton';
import { mockGroupDetail } from '../../mocks/groupDetail.mock';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import { useState } from 'react';

const ParticipatedGroupDetail = () => {
  const { title, isPrivate, introduction, activityPeriod, members, genre, book } = mockGroupDetail;
  const { openConfirm } = usePopupActions();

  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 모임방 생성자 여부 (실제로는 API에서 받아와야 함)
  const [isGroupOwner] = useState(false); // true면 생성자, false면 참여자

  const handleBackButton = () => {
    navigate(-1);
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
        // 실제 삭제 API 호출 후 홈으로 이동
        navigate('/group');
      },
    });
  };

  const handleLeaveGroup = () => {
    openConfirm({
      title: '모임방을 나가시겠어요?',
      disc: '방을 나가시게 되면\n독서메이트들과의 추억이 사라집니다.',
      onConfirm: () => {
        console.log('방 나가기 확정');
        // 실제 나가기 API 호출 후 홈으로 이동
        navigate('/group');
      },
    });
  };

  const handleReportGroup = () => {
    // 방 신고하기 로직
    console.log('방 신고하기');
    // 실제로는 신고 모달이나 페이지로 이동
  };

  const handleRecordSectionClick = () => {
    navigate('/memory');
  };

  const handleCommentSectionClick = () => {
    navigate('/today-words');
  };

  const handleHotTopicSectionClick = () => {
    // 뜨거운 감자 전체 페이지로 이동
    navigate('/memory'); // 또는 투표 전체 리스트 페이지
  };

  const handleBookSectionClick = () => {
    navigate(`/book/123`);
  };

  // 투표 클릭 시 해당 페이지의 기록장으로 이동
  const handlePollClick = (pageNumber: number) => {
    // 해당 투표가 위치한 페이지 번호로 필터를 씌운 기록장 화면으로 이동
    navigate(`/memory?page=${pageNumber}&filter=poll`);
  };

  const handleMembersClick = () => {
    navigate('/group/members'); // 또는 실제 독서메이트 페이지 경로
  };

  // 모킹 데이터
  const recordData = {
    currentPage: 1,
    progress: 30,
  };

  const commentData = {
    message: '모임방 멤버들과 간단한 인사를 나눠보세요!',
  };

  // 투표 데이터 (투표 결과 없이 질문과 선택지만)
  const mockPolls: Poll[] = [
    {
      id: '1',
      question: '3연에 나오는 심장은 무엇을 의미하는 걸까요?',
      options: [
        { id: '1', text: '김땡땡' },
        { id: '2', text: '김땡땡' },
      ],
      pageNumber: 456, // 해당 투표가 위치한 페이지
    },
    {
      id: '2',
      question: '또 다른 투표 질문입니다',
      options: [
        { id: '1', text: '선택지 1' },
        { id: '2', text: '선택지 2' },
        { id: '3', text: '선택지 3' },
      ],
      pageNumber: 123,
    },
    {
      id: '3',
      question: '세 번째 투표입니다',
      options: [
        { id: '1', text: 'A 답변' },
        { id: '2', text: 'B 답변' },
      ],
      pageNumber: 789,
    },
  ];

  // 투표가 없을 때 테스트하려면 이걸 사용
  // const mockPolls: Poll[] = [];

  const hasPolls = mockPolls.length > 0;

  return (
    <ParticipatedWrapper>
      <TopBackground genre={genre}>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
          <IconButton src={moreIcon} onClick={handleMoreButton} />
        </Header>
        <BannerSection>
          <GroupTitle>
            {title} {isPrivate && <img src={lockIcon} alt="자물쇠 아이콘"></img>}
          </GroupTitle>
          <SubTitle>
            <div>소개글</div>
            <br />
            <Intro>{introduction}</Intro>
          </SubTitle>
          <MetaInfo>
            <Meta>
              <span>
                <IconButton src={calendarIcon} alt="달력 아이콘" /> 모임 활동기간
              </span>
              <MetaDate>
                {activityPeriod.start} ~ {activityPeriod.end}
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
                    <MetaMember>{members.current}</MetaMember>
                    <MetaTotalMember>명 참여 중</MetaTotalMember>
                  </span>
                </div>
              </ClickableMeta>
            </Meta>
          </MetaInfo>
          <TagRow>
            <Tag>
              장르 <TagGenre>{genre}</TagGenre>
            </Tag>
          </TagRow>
        </BannerSection>
      </TopBackground>

      <GroupBookSection title={book.title} author={book.author} onClick={handleBookSectionClick} />

      <RecordSection
        currentPage={recordData.currentPage}
        progress={recordData.progress}
        onClick={handleRecordSectionClick}
      />

      <CommentSection message={commentData.message} onClick={handleCommentSectionClick} />

      <HotTopicSection
        polls={mockPolls}
        hasPolls={hasPolls}
        onClick={handleHotTopicSectionClick}
        onPollClick={handlePollClick}
      />

      <GroupActionBottomSheet
        isOpen={isBottomSheetOpen}
        isGroupOwner={isGroupOwner}
        onClose={handleCloseBottomSheet}
        onDeleteGroup={handleDeleteGroup}
        onLeaveGroup={handleLeaveGroup}
        onReportGroup={handleReportGroup}
      />
    </ParticipatedWrapper>
  );
};

export default ParticipatedGroupDetail;
