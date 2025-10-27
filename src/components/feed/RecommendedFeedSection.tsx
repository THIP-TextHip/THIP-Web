import styled from '@emotion/styled';
import RecommendedFeedCard from './RecommendedFeedCard';
import { colors, typography } from '@/styles/global/global';
import type { PostData } from '@/types/post';

// 목업 데이터
const mockRecommendedFeeds: PostData[] = [
  {
    feedId: 101,
    creatorId: 1,
    creatorNickname: 'user.01',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    postDate: '12시간 전',
    isbn: '9788936434267',
    bookTitle: '책이름을입력해주세요...',
    bookAuthor: '한강',
    contentBody:
      '세줄까지만 입력 가능합니다.ㄴ ㅇㄹㄴㄴ ㅇㅎㄴ녀;ㅇㄹ만; ↑ㅇㅎㅇ ↓ ↑ㅇ앙; ↓ ↑ㅇ악; ↓ ↑ ㅁ보름ㅇㄹ과; ㅁ먼엄안ㅇ만;ㅇㄹ라; ㅁ ㅁ엄만; 입력...',
    contentUrls: [],
    likeCount: 123,
    commentCount: 123,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 102,
    creatorId: 1,
    creatorNickname: 'user.01',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    postDate: '12시간 전',
    isbn: '9788936434267',
    bookTitle: '책이름을입력해주세요...',
    bookAuthor: '한강',
    contentBody: '한 줄이어도 카드 영역은 그대로 유지',
    contentUrls: [],
    likeCount: 123,
    commentCount: 123,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 103,
    creatorId: 1,
    creatorNickname: 'user.01',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    postDate: '12시간 전',
    isbn: '9788936434267',
    bookTitle: '책이름을입력해주세요...',
    bookAuthor: '한강',
    contentBody: '안 줄이어도 카드 영역은 그대로 유지해야 합니다.',
    contentUrls: [],
    likeCount: 123,
    commentCount: 123,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 104,
    creatorId: 1,
    creatorNickname: 'user.01',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    postDate: '12시간 전',
    isbn: '9788936434267',
    bookTitle: '책이름을입력해주세요...',
    bookAuthor: '한강',
    contentBody:
      '세줄까지만 입력 가능합니다.ㄴ ㅇㄹㄴㄴ ㅇㅎㄴ녀;ㅇㄹ만; ↑ㅇㅎㅇ ↓ ↑ㅇ앙; ↓ ↑ㅇ악; ↓ ↑ ㅁ보름ㅇㄹ과; ㅁ먼엄안ㅇ만;ㅇㄹ라; ㅁ ㅁ엄만; 입력...',
    contentUrls: [],
    likeCount: 123,
    commentCount: 123,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 105,
    creatorId: 1,
    creatorNickname: 'user.01',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    postDate: '12시간 전',
    isbn: '9788936434267',
    bookTitle: '책이름을입력해주세요...',
    bookAuthor: '한강',
    contentBody:
      '세줄까지만 입력 가능합니다.ㄴ ㅇㄹㄴㄴ ㅇㅎㄴ녀;ㅇㄹ만; ↑ㅇㅎㅇ ↓ ↑ㅇ앙; ↓ ↑ㅇ악; ↓ ↑ ㅁ보름ㅇㄹ과; ㅁ먼엄안ㅇ만;ㅇㄹ라; ㅁ ㅁ엄만; 입력...',
    contentUrls: [],
    likeCount: 123,
    commentCount: 123,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
];

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.black.main};
`;

const SectionHeader = styled.div`
  padding: 40px 20px 20px;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  color: ${colors.white};
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  line-height: normal;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  line-height: 20px;
  margin: 0;
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CardList = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px 28px;
  width: fit-content;
`;

const BorderBottom = styled.div`
  width: 94.8%;
  margin: 0 auto;
  padding: 0 20px;
  height: 6px;
  background: #1c1c1c;
`;

// Component
const RecommendedFeedSection = () => {
  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderText>지금 뜨는 추천 글</HeaderText>
        <SubText>비슷한 취향의 인플루언서, 작가가</SubText>
        <SubText>추천하는 도서를 만나보세요.</SubText>
      </SectionHeader>
      <CarouselContainer>
        <CardList>
          {mockRecommendedFeeds.map(feed => (
            <RecommendedFeedCard key={feed.feedId} {...feed} />
          ))}
        </CardList>
      </CarouselContainer>
      <BorderBottom />
    </SectionContainer>
  );
};

export default RecommendedFeedSection;
