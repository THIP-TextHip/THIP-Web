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
  FeedPostContainer,
  LoadingBox,
} from './SearchBook.styled';
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '../../assets/common/leftArrow.svg';
import { IconButton } from '@/components/common/IconButton';
import saveIcon from '../../assets/common/SaveIcon.svg';
import filledSaveIcon from '../../assets/common/filledSaveIcon.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import plusIcon from '../../assets/common/plus.svg';
import { useState, useEffect, useRef } from 'react';
import { IntroModal } from '@/components/search/IntroModal';
import { getBookDetail, type BookDetail } from '@/api/books/getBookDetail';
import { getRecruitingRooms, type RecruitingRoomsData } from '@/api/books/getRecruitingRooms';
import { postSaveBook } from '@/api/books/postSaveBook';
import { Filter } from '@/components/common/Filter';
import FeedPost from '@/components/feed/FeedPost';
import { getFeedsByIsbn, type FeedItem, type FeedSort } from '@/api/feeds/getFeedsByIsbn';
import { usePopupStore } from '@/stores/popupStore';
import { FeedPostSkeleton, BookDetailSkeleton } from '@/shared/ui/Skeleton';
import { usePreventDoubleClick } from '@/hooks/usePreventDoubleClick';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';

const FILTER = ['최신순', '인기순'] as const;
const toFeedSort = (f: (typeof FILTER)[number]): FeedSort => (f === '최신순' ? 'latest' : 'like');

const SearchBook = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState<(typeof FILTER)[number]>('인기순');
  const [showIntroModal, setShowIntroModal] = useState(false);

  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [recruitingRoomsData, setRecruitingRoomsData] = useState<RecruitingRoomsData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const isSavedRef = useRef(false);
  const { isLoading: isSaveLoading, run: runSave } = usePreventDoubleClick();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openPopup = usePopupStore(state => state.openPopup);

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!isbn) {
        setError('ISBN이 필요합니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [bookResponse, recruitingResponse] = await Promise.all([
          getBookDetail(isbn),
          getRecruitingRooms(isbn),
        ]);
        await minLoadingTime;

        if (bookResponse.isSuccess) {
          setBookDetail(bookResponse.data);
          setIsSaved(bookResponse.data.isSaved);
          isSavedRef.current = bookResponse.data.isSaved;
        } else {
          setError(bookResponse.message);
        }

        if (recruitingResponse.isSuccess) {
          setRecruitingRoomsData(recruitingResponse.data);
        }
      } catch {
        setError('정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [isbn]);

  const feeds = useInifinieScroll<FeedItem>({
    enabled: !!isbn,
    reloadKey: `${isbn ?? ''}-${selectedFilter}`,
    fetchPage: async cursor => {
      if (!isbn) return { items: [], nextCursor: null, isLast: true };
      const res = await getFeedsByIsbn(isbn, toFeedSort(selectedFilter), cursor ?? null);
      if (!res.isSuccess) throw new Error(res.message || '피드 로드 실패');
      return {
        items: res.data.feeds,
        nextCursor: res.data.nextCursor,
        isLast: res.data.isLast,
      };
    },
    rootMargin: '100px 0px',
    threshold: 0.1,
  });

  const handleBackButton = () => navigate(-1);
  const handleIntroClick = () => setShowIntroModal(true);
  const handleCloseIntroModal = () => setShowIntroModal(false);

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

  const handleWritePostButton = () => {
    if (bookDetail) {
      const selectedBook = {
        title: bookDetail.title,
        author: bookDetail.authorName,
        cover: bookDetail.imageUrl,
        isbn: bookDetail.isbn,
      };
      navigate('/post/create', { state: { selectedBook } });
    } else {
      navigate('/post/create');
    }
  };

  const handleSaveButton = () => {
    if (!isbn) return;
    runSave(async () => {
      const nextSaved = !isSavedRef.current;
      isSavedRef.current = nextSaved;
      setIsSaved(nextSaved);

      try {
        const response = await postSaveBook(isbn, nextSaved);
        if (!response.isSuccess && isSavedRef.current === nextSaved) {
          const rollback = !nextSaved;
          isSavedRef.current = rollback;
          setIsSaved(rollback);
        }
      } catch {
        if (isSavedRef.current === nextSaved) {
          const rollback = !nextSaved;
          isSavedRef.current = rollback;
          setIsSaved(rollback);
        }
      }
    });
  };

  useEffect(() => {
    if (bookDetail && typeof bookDetail.readCount === 'number') {
      openPopup('counting-bar', {
        message: `🔥 ${bookDetail.readCount}명이 읽기에 참여중이에요! 🔥`,
        variant: 'top',
        onClose: () => usePopupStore.getState().closePopup(),
      });
    }
  }, [bookDetail, openPopup]);

  if (error) {
    return (
      <Wrapper>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
        </Header>
        <div style={{ padding: '100px 20px', textAlign: 'center', color: 'white' }}>{error}</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {bookDetail && <TopBackground bookImgUrl={bookDetail.imageUrl} />}
      <Header>
        <IconButton src={leftArrow} onClick={handleBackButton} />
      </Header>

      {isLoading || !bookDetail ? (
        <BookDetailSkeleton />
      ) : (
        <BannerSection>
          <BookInfo>
            <BookTitle>{bookDetail.title}</BookTitle>
            <Author>
              {bookDetail.authorName} 저 · {bookDetail.publisher}
            </Author>
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
              <SaveButton onClick={handleSaveButton} style={{ opacity: isSaveLoading ? 0.6 : 1 }}>
                <img src={isSaved ? filledSaveIcon : saveIcon} alt="저장 버튼" />
              </SaveButton>
            </RightArea>
          </ButtonSection>
        </BannerSection>
      )}

      <FeedSection>
        <FeedTitle>피드 글 둘러보기</FeedTitle>

        <FilterContainer>
          <Filter
            filters={FILTER as unknown as string[]}
            selectedFilter={selectedFilter}
            setSelectedFilter={filter => setSelectedFilter(filter as (typeof FILTER)[number])}
          />
        </FilterContainer>
        {feeds.isLoading && feeds.items.length === 0 ? (
          <FeedPostContainer>
            {Array.from({ length: 3 }).map((_, i) => (
              <FeedPostSkeleton key={i} />
            ))}
          </FeedPostContainer>
        ) : feeds.items.length > 0 ? (
          <FeedPostContainer>
            {feeds.items.map(post => (
              <div key={post.feedId}>
                <FeedPost
                  showHeader={true}
                  isMyFeed={false}
                  feedId={post.feedId}
                  creatorNickname={post.creatorNickname}
                  creatorProfileImageUrl={post.creatorProfileImageUrl}
                  postDate={post.postDate}
                  isbn={post.isbn}
                  bookTitle={post.bookTitle}
                  bookAuthor={post.bookAuthor}
                  contentBody={post.contentBody}
                  contentUrls={post.contentUrls}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  isSaved={post.isSaved}
                  isLiked={post.isLiked}
                  isWriter={post.isWriter}
                />
              </div>
            ))}
            {!feeds.isLast && <div ref={feeds.sentinelRef} style={{ height: 20 }} />}
            {feeds.isLoadingMore && <LoadingBox>불러오는 중...</LoadingBox>}
          </FeedPostContainer>
        ) : (
          <EmptyState>
            <EmptyTitle>이 책으로 작성된 피드가 없어요.</EmptyTitle>
            <EmptySubText>첫 번째 피드를 작성해보세요!</EmptySubText>
          </EmptyState>
        )}
      </FeedSection>

      {showIntroModal && bookDetail && (
        <IntroModal title="소개" content={bookDetail.description} onClose={handleCloseIntroModal} />
      )}
    </Wrapper>
  );
};

export default SearchBook;
