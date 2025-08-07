import {
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
} from './GroupDetail.styled';
import { ParticipatedWrapper } from './ParticipatedGroupDetail.styled';
import RecordSection from '../../components/group/RecordSection';
import CommentSection from '../../components/group/CommentSection';
import HotTopicSection from '../../components/group/HotTopicSection';
import GroupBookSection from '../../components/group/GroupBookSection';
import type { Poll } from '../../components/group/HotTopicSection';

import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/common/IconButton';
import { mockGroupDetail } from '../../mocks/groupDetail.mock';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';

const ParticipatedGroupDetail = () => {
  const { title, isPrivate, introduction, activityPeriod, members, genre, book } = mockGroupDetail;

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleMoreButton = () => {};

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
              <span>
                <IconButton src={peopleIcon} alt="사람 아이콘" /> 독서메이트
              </span>
              <span>
                <MetaMember>{members.current}</MetaMember>
                <MetaTotalMember>명 참여 중</MetaTotalMember>
              </span>
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
    </ParticipatedWrapper>
  );
};

export default ParticipatedGroupDetail;
