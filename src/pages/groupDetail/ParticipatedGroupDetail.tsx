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
import type { VoteOption } from '../../components/group/HotTopicSection';

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
    // 한마디 작성 페이지로 이동
  };

  const handleHotTopicSectionClick = () => {
    // 뜨거운 감자 페이지로 이동
  };

  const handleBookSectionClick = () => {
    // 책 상세정보 페이지로 이동 (예: /book/:isbn)
    navigate(`/book/${book.isbn || '123'}`);
  };

  // 모킹 데이터
  const recordData = {
    bookAuthor: '최정화 저',
    currentPage: 1,
    progress: 30,
  };

  const commentData = {
    message: '모임방 멤버들과 간단한 인사를 나눠보세요!',
  };

  const hotTopicData = {
    topicText: '투표 1개 내용입니다...',
    voteOptions: [
      { id: '1', text: '김땡땡' },
      { id: '2', text: '김땡땡' },
      { id: '3', text: '김땡땡' },
    ] as VoteOption[],
    currentPage: 0,
    totalPages: 3,
  };

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
        bookAuthor={recordData.bookAuthor}
        currentPage={recordData.currentPage}
        progress={recordData.progress}
        onClick={handleRecordSectionClick}
      />

      <CommentSection message={commentData.message} onClick={handleCommentSectionClick} />

      <HotTopicSection
        topicText={hotTopicData.topicText}
        voteOptions={hotTopicData.voteOptions}
        currentPage={hotTopicData.currentPage}
        totalPages={hotTopicData.totalPages}
        onClick={handleHotTopicSectionClick}
      />
    </ParticipatedWrapper>
  );
};

export default ParticipatedGroupDetail;
