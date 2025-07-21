import {
  Wrapper,
  TopBackground,
  Header,
  BannerSection,
  BookInfo,
  BookTitle,
  Author,
  Intro,
  SubTitle,
  SubText,
  ButtonSection,
  RecruitingGroupButton,
  RightArea,
  WritePostButton,
  SaveButton,
  FeedSection,
  FeedTitle,
  FilterContainer,
  EmptyState,
  EmptyTitle,
  EmptySubText,
} from './SearchBook.styled';
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
import { IntroModal } from '@/components/search/IntroModal';

const FILTER = ['최신순', '인기순'];

const SearchBook = () => {
  const { title, author, introduction, coverUrl, recruitGroups, posts } = mockSearchBook;
  const [selectedFilter, setSelectedFilter] = useState<string>('인기순');
  const [showIntroModal, setShowIntroModal] = useState(false);

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleIntroClick = () => setShowIntroModal(true);

  const handleCloseIntroModal = () => setShowIntroModal(false);

  const handleMoreButton = () => {};

  const handleRecruitingGroupButton = () => {
    navigate('./group');
  };

  const handleWritePostButton = () => {};

  const handleSaveButton = () => {};

  const hasFeeds = mockSearchBook.posts.length > 0;

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
        <Intro onClick={handleIntroClick}>
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
          />
        </FilterContainer>

        {hasFeeds ? (
          <>
            {posts.map(post => (
              <FeedPost showHeader={true} isMyFeed={false} {...post} />
            ))}
          </>
        ) : (
          <EmptyState>
            <EmptyTitle>이 책으로 작성된 피드가 없어요.</EmptyTitle>
            <EmptySubText>첫 번째 피드를 작성해보세요!</EmptySubText>
          </EmptyState>
        )}
      </FeedSection>

      {showIntroModal && (
        <IntroModal title="소개" content={introduction} onClose={handleCloseIntroModal} />
      )}
    </Wrapper>
  );
};

export default SearchBook;
