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
} from './SearchBook.styled';
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '../../assets/common/leftArrow.svg';
import { IconButton } from '@/components/common/IconButton';
import saveIcon from '../../assets/common/SaveIcon.svg';
import filledSaveIcon from '../../assets/common/filledSaveIcon.svg';
import rightChevron from '../../assets/common/right-Chevron.svg';
import plusIcon from '../../assets/common/plus.svg';
import { useState, useEffect, useRef, useCallback } from 'react';
import { IntroModal } from '@/components/search/IntroModal';
import { getBookDetail, type BookDetail } from '@/api/books/getBookDetail';
import { getRecruitingRooms, type RecruitingRoomsData } from '@/api/books/getRecruitingRooms';
import { postSaveBook } from '@/api/books/postSaveBook';
import { Filter } from '@/components/common/Filter';
import FeedPost from '@/components/feed/FeedPost';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { getFeedsByIsbn, type FeedItem, type FeedSort } from '@/api/feeds/getFeedsByIsbn';
import { usePopupStore } from '@/stores/usePopupStore';
import LoadingSpinner from '@/components/common/LoadingSpinner';

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
  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(true);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
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
      } catch (err) {
        console.error('데이터 조회 오류:', err);
        setError('정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [isbn]);

  const loadFirstFeeds = useCallback(async () => {
    if (!isbn) return;
    try {
      setIsLoadingFeeds(true);
      setFeeds([]);
      setNextCursor(null);
      setIsLast(true);

      const res = await getFeedsByIsbn(isbn, toFeedSort(selectedFilter), null);
      if (res.isSuccess) {
        setFeeds(res.data.feeds);
        setNextCursor(res.data.nextCursor);
        setIsLast(res.data.isLast);
      } else {
        console.error('피드 조회 실패:', res.message);
      }
    } catch (e) {
      console.error('피드 조회 오류:', e);
    } finally {
      setIsLoadingFeeds(false);
    }
  }, [isbn, selectedFilter]);

  useEffect(() => {
    loadFirstFeeds();
  }, [loadFirstFeeds]);

  const loadMore = useCallback(async () => {
    if (!isbn || !nextCursor || isLast || isLoadingMore) return;
    try {
      setIsLoadingMore(true);
      const res = await getFeedsByIsbn(isbn, toFeedSort(selectedFilter), nextCursor);
      if (res.isSuccess) {
        setFeeds(prev => [...prev, ...res.data.feeds]);
        setNextCursor(res.data.nextCursor);
        setIsLast(res.data.isLast);
      } else {
        console.error('피드 추가 로드 실패:', res.message);
      }
    } catch (e) {
      console.error('피드 추가 로드 오류:', e);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isbn, nextCursor, isLast, isLoadingMore, selectedFilter]);

  const lastFeedElementCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore || isLast) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !isLoadingMore && !isLast) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoadingMore, isLast, loadMore],
  );

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

  useEffect(() => {
    if (bookDetail && typeof bookDetail.readCount === 'number') {
      openPopup('counting-bar', {
        message: `🔥 ${bookDetail.readCount}명이 읽기에 참여중이에요! 🔥`,
        variant: 'top',
        onClose: () => usePopupStore.getState().closePopup(),
      });
    }
  }, [bookDetail, openPopup]);

  if (isLoading || error || !bookDetail) {
    if (isLoading) {
      return <LoadingSpinner fullHeight={true} size="large" message="책 정보 불러오는 중..." />;
    }
    return (
      <Wrapper>
        <Header>
          <IconButton src={leftArrow} onClick={handleBackButton} />
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
      </Header>

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
            filters={FILTER as unknown as string[]}
            selectedFilter={selectedFilter}
            setSelectedFilter={filter => setSelectedFilter(filter as (typeof FILTER)[number])}
          />
        </FilterContainer>
        {isLoadingFeeds && feeds.length === 0 ? (
          <LoadingBox>불러오는 중...</LoadingBox>
        ) : feeds.length > 0 ? (
          <FeedPostContainer>
            {feeds.map((post, idx) => (
              <div
                key={post.feedId}
                ref={idx === feeds.length - 1 ? el => lastFeedElementCallback(el) : undefined}
              >
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
          </FeedPostContainer>
        ) : (
          <EmptyState>
            <EmptyTitle>이 책으로 작성된 피드가 없어요.</EmptyTitle>
            <EmptySubText>첫 번째 피드를 작성해보세요!</EmptySubText>
          </EmptyState>
        )}
      </FeedSection>

      {showIntroModal && (
        <IntroModal title="소개" content={bookDetail.description} onClose={handleCloseIntroModal} />
      )}
    </Wrapper>
  );
};

export default SearchBook;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
`;
