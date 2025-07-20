import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { IconButton } from '@/components/common/IconButton';
import { mockSearchBook } from '@/mocks/searchBook.mock';
import saveIcon from '../../assets/common/SaveIcon.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import plusIcon from '../../assets/common/plus.svg';
import { Filter } from '@/components/common/Filter';
import { useState } from 'react';
import FeedPost from '@/components/feed/FeedPost';

const FILTER = ['최신순', '인기순'];

const SearchBook = () => {
  const { title, author, introduction, coverUrl, recruitGroups, posts } = mockSearchBook;
  const [selectedFilter, setSelectedFilter] = useState<string>('인기순');

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleMoreButton = () => {};

  const handleRecruitingGroupButton = () => {};

  const handleWritePostButton = () => {};

  const handleSaveButton = () => {};
  return (
    <Wrapper>
      <TopBackground bookImgUrl={coverUrl} />
      <Header>
        <IconButton src={leftArrow} onClick={handleBackButton} />
        <IconButton src={moreIcon} onClick={handleMoreButton} />
      </Header>
      <BannerSection>
        <BookInfo>
          <BookTitle>{title}</BookTitle>
          <Author>{author}</Author>
        </BookInfo>
        <Intro>
          <SubTitle>소개</SubTitle>
          <SubText>{introduction}</SubText>
        </Intro>

        <ButtonSection>
          <RecruitingGroupButton onClick={handleRecruitingGroupButton}>
            모집중인 모임방 {recruitGroups.length}개{' '}
            <img src={rightChevron} alt="오른쪽 화살표 아이콘" />
          </RecruitingGroupButton>
          <RightArea>
            <WritePostButton onClick={handleWritePostButton}>
              피드에 글쓰기 <img src={plusIcon} alt="더하기 아이콘" />
            </WritePostButton>
            <SaveButton onClick={handleSaveButton}>
              <img src={saveIcon} alt="저장 버튼"></img>
            </SaveButton>
          </RightArea>
        </ButtonSection>
      </BannerSection>

      <FeedSection>
        <FeedTitle>피드 글 둘러보기</FeedTitle>
        <FilterContainer>
          <Filter
            filters={FILTER}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          ></Filter>
        </FilterContainer>
        {posts.map(post => (
          <FeedPost showHeader={true} isMyFeed={false} {...post}></FeedPost>
        ))}
        ;
      </FeedSection>
    </Wrapper>
  );
};

export default SearchBook;

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

const TopBackground = styled.div<{ bookImgUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50vh;
  background:
    linear-gradient(
      172deg,
      rgba(18, 18, 18, 0) 5.94%,
      var(--color-view-viewfield_background_black, #121212) 94%
    ),
    url(${({ bookImgUrl }) => bookImgUrl}) no-repeat center / cover;
  filter: blur(2px);
  z-index: 0;
`;

const Header = styled.div`
  display: flex;
  position: fixed;
  padding: 16px 20px;
  justify-content: space-between;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
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
  margin-top: 66px;
  gap: 32px;
  color: ${colors.white};
  z-index: 10;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const BookTitle = styled.h1`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
`;

const Author = styled.p`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[200]};
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SubTitle = styled.p`
  font-size: ${typography.fontSize['sm']};
  font-weight: ${typography.fontWeight.semibold};
  margin-top: 20px;
  color: ${colors.white};
`;

const SubText = styled.p`
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const RecruitingGroupButton = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid ${colors.grey[200]};
  border-radius: 12px;
  background: transparent;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const WritePostButton = styled.button`
  flex: 1;
  height: 48px;
  background-color: ${colors.purple.main};
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 10px 12px;
  gap: 8px;
  min-width: 200px;
  border: none;
`;

const SaveButton = styled.button`
  width: 48px;
  height: 48px;
  background: transparent;
  border: 1px solid ${colors.grey[200]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeedSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const FeedTitle = styled.h2`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin: 0 20px;
  padding: 0 0 10px 0;
  border-bottom: 1px solid ${colors.darkgrey.dark};
`;
