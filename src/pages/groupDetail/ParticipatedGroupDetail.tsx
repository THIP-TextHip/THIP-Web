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
} from './GroupDetail.styled';
import {
  RecordSection,
  RecordSectionHeader,
  RecordSectionTitle,
  RecordSectionChevron,
  RecordSectionContent,
  BookTitle,
  CurrentPage,
  ProgressSection,
  ProgressBar,
  ProgressBarFill,
  ProgressText,
  CommentSection,
  CommentSectionHeader,
  CommentContent,
  CommentText,
  HotTopicSection,
  HotTopicSectionHeader,
  HotTopicContent,
  HotTopicText,
  VoteOptionsList,
  VoteOption,
  VoteOptionNumber,
  VoteOptionText,
  Pagination,
  PaginationDot,
} from './ParticipatedGroupDetail.styled';

import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/common/IconButton';
import { mockGroupDetail } from '../../mocks/groupDetail.mock';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';

const ParticipatedGroupDetail = () => {
  const { title, isPrivate, introduction, activityPeriod, members, ddayText, genre } =
    mockGroupDetail;

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

  return (
    <Wrapper>
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

      <RecordSection>
        <RecordSectionHeader onClick={handleRecordSectionClick}>
          <RecordSectionTitle>기록장</RecordSectionTitle>
          <RecordSectionChevron src={rightChevron} alt="기록장 이동 버튼" />
        </RecordSectionHeader>
        <RecordSectionContent>
          <BookTitle>최정화 저</BookTitle>
          <CurrentPage>현재 페이지 1</CurrentPage>
          <ProgressSection>
            <ProgressBar>
              <ProgressBarFill progress={30} />
            </ProgressBar>
            <ProgressText>30%</ProgressText>
          </ProgressSection>
        </RecordSectionContent>
      </RecordSection>

      <CommentSection>
        <CommentSectionHeader onClick={handleCommentSectionClick}>
          <RecordSectionTitle>오늘의 한마디</RecordSectionTitle>
          <RecordSectionChevron src={rightChevron} alt="한마디 이동 버튼" />
        </CommentSectionHeader>
        <CommentContent>
          <CommentText>모임방 멤버들과 간단한 인사를 나눠보세요!</CommentText>
        </CommentContent>
      </CommentSection>

      <HotTopicSection>
        <HotTopicSectionHeader onClick={handleHotTopicSectionClick}>
          <RecordSectionTitle>모임방의 뜨거운 감자</RecordSectionTitle>
          <RecordSectionChevron src={rightChevron} alt="뜨거운 감자 이동 버튼" />
        </HotTopicSectionHeader>
        <HotTopicContent>
          <HotTopicText>투표 1개 내용입니다...</HotTopicText>
          <VoteOptionsList>
            <VoteOption>
              <VoteOptionNumber>1.</VoteOptionNumber>
              <VoteOptionText>김땡땡</VoteOptionText>
            </VoteOption>
            <VoteOption>
              <VoteOptionNumber>1.</VoteOptionNumber>
              <VoteOptionText>김땡땡</VoteOptionText>
            </VoteOption>
            <VoteOption>
              <VoteOptionNumber>1.</VoteOptionNumber>
              <VoteOptionText>김땡땡</VoteOptionText>
            </VoteOption>
          </VoteOptionsList>
          <Pagination>
            <PaginationDot active />
            <PaginationDot />
            <PaginationDot />
          </Pagination>
        </HotTopicContent>
      </HotTopicSection>
    </Wrapper>
  );
};

export default ParticipatedGroupDetail;
