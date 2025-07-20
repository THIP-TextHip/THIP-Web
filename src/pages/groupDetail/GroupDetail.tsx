import styled from '@emotion/styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/common/IconButton';
import { mockGroupDetail } from '../../mocks/groupDetail.mock';
import lockIcon from '../../assets/group/lock.svg';
import calendarIcon from '../../assets/group/calendar.svg';
import peopleIcon from '../../assets/common/darkPeople.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import { colors, typography } from '@/styles/global/global';
import { GroupCard } from '@/components/group/GroupCard';
import artBackground from '../../assets/genre/artBackground.svg';
import humanityBackground from '../../assets/genre/humanityBackground.svg';
import ScienceITBackground from '../../assets/genre/ScienceITBackground.svg';
import literatureBackground from '../../assets/genre/literatureBackground.svg';
import socialScienceBackground from '../../assets/genre/socialScienceBackground.svg';

const getBackgroundImageByGenre = (genre: string): string => {
  switch (genre) {
    case '문학':
      return literatureBackground;
    case '사회과학':
      return socialScienceBackground;
    case '과학•IT':
      return ScienceITBackground;
    case '예술':
      return artBackground;
    case '인문학':
      return humanityBackground;
    default:
      return literatureBackground;
  }
};

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

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 767px;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;

const TopBackground = styled.div<{ genre: string }>`
  background:
    linear-gradient(
      172deg,
      rgba(18, 18, 18, 0) 5.94%,
      var(--color-view-viewfield_background_black, #121212) 94%
    ),
    url(${({ genre }) => getBackgroundImageByGenre(genre)}) no-repeat center / cover;
`;

const Header = styled.div`
  display: flex;
  position: fixed;
  padding: 16px 20px;
  justify-content: space-between;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    var(--color-view-viewfield_background_black, #121212) 100%
  );
  backdrop-filter: blur(0px);
  z-index: 10;
`;

const BannerSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-top: 56px;
  gap: 20px;
  color: ${colors.white};
`;

const GroupTitle = styled.h1`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  display: flex;
  gap: 2px;
`;

const SubTitle = styled.div`
  font-size: ${typography.fontSize['sm']};
  font-weight: ${typography.fontWeight.semibold};
  margin-top: 20px;
  color: ${colors.white};
`;

const Intro = styled.p`
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
`;

const MetaInfo = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 40px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
  gap: 12px;
  span {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

const MetaDate = styled.span`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize['2xs']};
  font-weight: ${typography.fontWeight.regular};
`;

const MetaMember = styled.span`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
`;

const MetaTotalMember = styled.span`
  color: ${colors.white};
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
`;

const TagRow = styled.div`
  display: flex;
  gap: 12px;
`;

const Tag = styled.div`
  background-color: ${colors.grey[400]};
  color: ${colors.white};
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
  padding: 8px 12px;
  border-radius: 40px;
  strong {
    color: ${colors.neongreen};
  }
`;

const TagGenre = styled.span`
  color: #b5b35d;
`;

const BookSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #1c1c1c;
  margin: 10px 20px 0 20px;
  padding: 20px;
  border-radius: 16px;
`;

const BookHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.white};
  font-size: ${typography.fontSize['base']};
  font-weight: ${typography.fontWeight.medium};
`;

const BookInfo = styled.div`
  display: flex;
  gap: 16px;
`;

const BookCover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
  gap: 20px;
  color: ${colors.white};
`;

const BookIntro = styled.div`
  > p {
    margin-top: 4px;
    color: ${colors.grey[200]};
  }
`;

const RecommendSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 80px;
`;

const RecommendText = styled.h2`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin: 40px 20px 0 20px;
`;

const GroupCardBox = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  gap: 20px;
`;

const BottomButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  background-color: ${colors.purple.main};
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border: none;
  z-index: 10;
`;
