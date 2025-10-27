import styled from '@emotion/styled';
import RecommendedFeedCard from './RecommendedFeedCard';
import { colors, typography } from '@/styles/global/global';
import type { PostData } from '@/types/post';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

// 목업 데이터 (aliasColor 추가 필요)
interface MockPostData extends PostData {
  aliasColor?: string;
}

const mockRecommendedFeeds: MockPostData[] = [
  {
    feedId: 101,
    creatorId: 1,
    creatorNickname: '책덕후민지',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    aliasColor: colors.neongreen,
    postDate: '2시간 전',
    isbn: '9788936434267',
    bookTitle: '채식주의자',
    bookAuthor: '한강',
    contentBody:
      '한강 작가님의 문장은 정말 날카롭고도 아름다워요. 문장 하나하나가 단순히 글이 아니라, 인간의 본성과 욕망, 그리고 사회의 폭력성을 정교하게 해부하는 칼날처럼 느껴졌어요. 읽는 내내 숨이 막히는 긴장감과 함께, 인간이라는 존재에 대한 불편한 진실을 마주해야 했습니다. 특히 마지막 장면은 잊을 수 없을 만큼 강렬했어요. 그 장면이 주는 여운이 너무 커서 책을 덮은 후에도 한동안 아무 말도 할 수 없었어요. 한강 작가님이 표현한 고통과 침묵, 그리고 인간의 내면은 오랜 시간 제 마음속에 남아 계속 생각나게 합니다.',
    contentUrls: [],
    likeCount: 342,
    commentCount: 28,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 102,
    creatorId: 2,
    creatorNickname: '북튜버지수',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    aliasColor: colors.neongreen,
    postDate: '5시간 전',
    isbn: '9788954676540',
    bookTitle: '달러구트 꿈 백화점',
    bookAuthor: '이미예',
    contentBody: '힐링이 필요할 때 읽기 좋은 책! 따뜻한 이야기가 마음을 녹여줍니다.',
    contentUrls: [],
    likeCount: 287,
    commentCount: 19,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 103,
    creatorId: 3,
    creatorNickname: '문학소녀윤아',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    aliasColor: colors.neongreen,
    postDate: '8시간 전',
    isbn: '9788937460449',
    bookTitle: '1984',
    bookAuthor: '조지 오웰',
    contentBody:
      '지금 읽어도 너무나 현대적인 고전. 빅브라더의 감시 사회가 현실이 되어가는 것 같아 무섭기도 하네요. 모든 사람이 꼭 읽어야 할 필독서입니다.',
    contentUrls: [],
    likeCount: 521,
    commentCount: 45,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 104,
    creatorId: 4,
    creatorNickname: '작가지망생',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    aliasColor: colors.neongreen,
    postDate: '1일 전',
    isbn: '9788932917245',
    bookTitle: '불편한 편의점',
    bookAuthor: '김호연',
    contentBody:
      '올해 읽은 책 중 최고예요! 독고 씨와 염 여사의 이야기가 너무 따뜻하고 감동적이었어요. 읽으면서 계속 울었던 것 같아요. 모두에게 추천합니다!',
    contentUrls: [],
    likeCount: 456,
    commentCount: 38,
    isSaved: false,
    isLiked: false,
    isPublic: true,
    isWriter: false,
  },
  {
    feedId: 105,
    creatorId: 5,
    creatorNickname: '책읽는개발자',
    creatorProfileImageUrl: 'https://via.placeholder.com/36',
    alias: '공식 인플루언서',
    aliasColor: colors.neongreen,
    postDate: '2일 전',
    isbn: '9788936434298',
    bookTitle: '작별하지 않는다',
    bookAuthor: '한강',
    contentBody:
      '한강 작가의 섬세한 문장들이 가슴을 울립니다. 상실과 기억, 그리고 삶에 대한 깊은 성찰을 담은 작품이에요. 천천히 음미하며 읽었습니다.',
    contentUrls: [],
    likeCount: 398,
    commentCount: 31,
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

const EmblaViewport = styled.div`
  overflow: hidden;
  padding: 0 20px;
`;

const EmblaContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  gap: 12px;
`;

const EmblaSlide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 calc(100% - 10px);
  min-width: 0;
  padding-bottom: 40px;
`;

const BorderBottom = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  height: 6px;
  background: #1c1c1c;
`;

// Component
const RecommendedFeedSection = () => {
  const options: EmblaOptionsType = {
    align: 'center',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  };

  const [emblaRef] = useEmblaCarousel(options);

  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderText>지금 뜨는 추천 글</HeaderText>
        <SubText>비슷한 취향의 인플루언서, 작가가</SubText>
        <SubText>추천하는 도서를 만나보세요.</SubText>
      </SectionHeader>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {mockRecommendedFeeds.map(feed => (
            <EmblaSlide key={feed.feedId}>
              <RecommendedFeedCard {...feed} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>
      <BorderBottom />
    </SectionContainer>
  );
};

export default RecommendedFeedSection;
