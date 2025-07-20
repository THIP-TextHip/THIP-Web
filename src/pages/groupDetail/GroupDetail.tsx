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
import moreIcon from '../../assets/common/more.svg';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/common/IconButton';
import { mockGroupDetail } from '../../mocks/groupDetail.mock';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import { GroupCard } from '@/components/group/GroupCard';

const GroupDetail = () => {
  const {
    title,
    isPrivate,
    introduction,
    activityPeriod,
    members,
    ddayText,
    genre,
    book,
    recommendations,
  } = mockGroupDetail;

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleMoreButton = () => {};

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
                <IconButton src={peopleIcon} alt="사람 아이콘" /> 참여 중인 독서메이트
              </span>
              <span>
                <MetaMember>{members.current}</MetaMember>
                <MetaTotalMember>/ {members.max}명</MetaTotalMember>
              </span>
            </Meta>
          </MetaInfo>
          <TagRow>
            <Tag>
              모집 <strong>{ddayText}</strong>
            </Tag>
            <Tag>
              장르 <TagGenre>{genre}</TagGenre>
            </Tag>
          </TagRow>
        </BannerSection>
      </TopBackground>

      <BookSection>
        <BookHeader>
          <h3>{book.title}</h3>
          <IconButton src={rightChevron} alt="책 이동 버튼"></IconButton>
        </BookHeader>
        <BookInfo>
          <BookCover src={book.coverUrl} alt={book.title} />
          <BookDetails>
            <div>{book.author}</div>
            <BookIntro>
              도서 소개 <br />
              <p>{book.description}</p>
            </BookIntro>
          </BookDetails>
        </BookInfo>
      </BookSection>
      <RecommendSection>
        <RecommendText>이런 모임방은 어때요?</RecommendText>
        <GroupCardBox>
          {recommendations.map(group => (
            <GroupCard
              key={group.id}
              group={group}
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
