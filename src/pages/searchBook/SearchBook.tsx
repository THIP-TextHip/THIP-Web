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
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '../../assets/common/leftArrow.svg';
import moreIcon from '../../assets/common/more.svg';
import { IconButton } from '@/components/common/IconButton';
import saveIcon from '../../assets/common/SaveIcon.svg';
import filledSaveIcon from '../../assets/common/filledSaveIcon.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import plusIcon from '../../assets/common/plus.svg';
import { useState, useEffect } from 'react';
import { IntroModal } from '@/components/search/IntroModal';
import { getBookDetail, type BookDetail } from '@/api/books/getBookDetail';
import { getRecruitingRooms, type RecruitingRoomsData } from '@/api/books/getRecruitingRooms';
import { postSaveBook } from '@/api/books/postSaveBook';
import { Filter } from '@/components/common/Filter';
import FeedPost from '@/components/feed/FeedPost';
import { mockSearchBook } from '@/mocks/searchBook.mock';

const FILTER = ['최신순', '인기순'];

const SearchBook = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [selectedFilter, setSelectedFilter] = useState<string>('인기순');
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [recruitingRoomsData, setRecruitingRoomsData] = useState<RecruitingRoomsData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!isbn) {
        setError('ISBN이 필요합니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const [bookResponse, recruitingResponse] = await Promise.all([
          getBookDetail(isbn),
          getRecruitingRooms(isbn),
        ]);

        if (bookResponse.isSuccess) {
          setBookDetail(bookResponse.data);
          setIsSaved(bookResponse.data.isSaved);
        } else {
          setError(bookResponse.message);
        }

        if (recruitingResponse.isSuccess) {
          setRecruitingRoomsData(recruitingResponse.data);
        } else {
          console.error('모집중인 모임방 조회 실패:', recruitingResponse.message);
        }
      } catch (error) {
        console.error('데이터 조회 오류:', error);
        setError('정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [isbn]);

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleIntroClick = () => setShowIntroModal(true);

  const handleCloseIntroModal = () => setShowIntroModal(false);

  const handleMoreButton = () => {};

  const handleRecruitingGroupButton = () => {
    if (bookDetail) {
      navigate('/search/book/group', {
        state: {
          recruitingRooms: recruitingRoomsData || {
            recruitingRoomList: [],
            totalRoomCount: 0,
            nextCursor: '',
            isLast: true,
          },
          bookInfo: {
            isbn: bookDetail.isbn,
            title: bookDetail.title,
            author: bookDetail.authorName,
            imageUrl: bookDetail.imageUrl,
          },
        },
      });
    }
  };

  const handleWritePostButton = () => {};

  const handleSaveButton = async () => {
    if (!isbn || isSaving) return;

    try {
      setIsSaving(true);
      const response = await postSaveBook(isbn, !isSaved);

      if (response.isSuccess) {
        setIsSaved(response.data.isSaved);
      } else {
        console.error('북마크 실패:', response.message);
      }
    } catch (error) {
      console.error('북마크 중 오류 발생:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || error || !bookDetail) {
    return (
      <Wrapper>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
          <IconButton src={moreIcon} onClick={handleMoreButton} />
        </Header>
        <div style={{ padding: '100px 20px', textAlign: 'center', color: 'white' }}>
          {isLoading ? '로딩 중...' : error || '책 정보를 찾을 수 없습니다.'}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TopBackground bookImgUrl={bookDetail.imageUrl} />
      <Header>
        <IconButton src={leftArrow} onClick={handleBackButton} />
        <IconButton src={moreIcon} onClick={handleMoreButton} />
      </Header>
      <BannerSection>
        <BookInfo>
          <BookTitle>{bookDetail.title}</BookTitle>
          <Author>{bookDetail.authorName}</Author>
        </BookInfo>
        <Intro onClick={handleIntroClick}>
          <SubTitle>소개</SubTitle>
          <SubText>{bookDetail.description}</SubText>
        </Intro>

        <ButtonSection>
          <RecruitingGroupButton onClick={handleRecruitingGroupButton}>
            모집중인 모임방 {recruitingRoomsData?.totalRoomCount || 0}개{' '}
            <img src={rightChevron} alt="오른쪽 화살표 아이콘" />
          </RecruitingGroupButton>
          <RightArea>
            <WritePostButton onClick={handleWritePostButton}>
              피드에 글쓰기 <img src={plusIcon} alt="더하기 아이콘" />
            </WritePostButton>
            <SaveButton onClick={handleSaveButton} disabled={isSaving}>
              <img src={isSaved ? filledSaveIcon : saveIcon} alt="저장 버튼" />
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

        {mockSearchBook.posts.length > 0 ? (
          <>
            {mockSearchBook.posts.map((post, index) => (
              <FeedPost key={index} showHeader={true} isMyFeed={false} {...post} />
            ))}
          </>
        ) : (
          <EmptyState>
            <EmptyTitle>이 책으로 작성된 피드가 없어요.</EmptyTitle>
            <EmptySubText>첫 번째 피드를 작성해보세요!</EmptySubText>
          </EmptyState>
        )}
      </FeedSection>{' '}
      {showIntroModal && (
        <IntroModal title="소개" content={bookDetail.description} onClose={handleCloseIntroModal} />
      )}
    </Wrapper>
  );
};

export default SearchBook;
