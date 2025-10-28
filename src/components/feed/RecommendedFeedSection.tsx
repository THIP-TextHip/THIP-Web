import styled from '@emotion/styled';
import RecommendedFeedCard from './RecommendedFeedCard';
import { colors, typography } from '@/styles/global/global';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { allMockRecommendedFeeds } from '@/mocks/recommendedFeeds.mock';


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
interface RecommendedFeedSectionProps {
  sectionIndex?: number;
}

const RecommendedFeedSection = ({ sectionIndex = 0 }: RecommendedFeedSectionProps) => {
  const options: EmblaOptionsType = {
    align: 'center',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  };

  const [emblaRef] = useEmblaCarousel(options);

  // 섹션 인덱스에 따라 다른 5개 게시글 선택
  const startIndex = (sectionIndex * 5) % allMockRecommendedFeeds.length;
  const selectedFeeds = [
    ...allMockRecommendedFeeds.slice(startIndex, startIndex + 5),
    ...allMockRecommendedFeeds.slice(0, Math.max(0, startIndex + 5 - allMockRecommendedFeeds.length)),
  ].slice(0, 5);

  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderText>지금 뜨는 추천 글</HeaderText>
        <SubText>비슷한 취향의 인플루언서, 작가가</SubText>
        <SubText>추천하는 도서를 만나보세요.</SubText>
      </SectionHeader>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {selectedFeeds.map(feed => (
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
