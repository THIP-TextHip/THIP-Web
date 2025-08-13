import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import { getBackgroundImageByGenre } from '../../utils/getBackgroundImageByGenre';

export const Wrapper = styled.div`
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

export const TopBackground = styled.div<{ genre: string }>`
  width: 100%;
  background:
    linear-gradient(
      172deg,
      rgba(18, 18, 18, 0) 5.94%,
      var(--color-view-viewfield_background_black, #121212) 94%
    ),
    url(${({ genre }) => getBackgroundImageByGenre(genre)}) no-repeat center / cover;
`;

export const Header = styled.div`
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

export const BannerSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-top: 56px;
  gap: 20px;
  color: ${colors.white};
`;

export const GroupTitle = styled.h1`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  display: flex;
  gap: 2px;
`;

export const SubTitle = styled.div`
  font-size: ${typography.fontSize['sm']};
  font-weight: ${typography.fontWeight.semibold};
  margin-top: 20px;
  color: ${colors.white};
`;

export const Intro = styled.p`
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
  line-height: 20px;
`;

export const MetaInfo = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 40px;
`;

export const Meta = styled.div`
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

export const MetaDate = styled.span`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize['2xs']};
  font-weight: ${typography.fontWeight.regular};
`;

export const MetaMember = styled.span`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
`;

export const MetaTotalMember = styled.span`
  color: ${colors.white};
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
`;

export const TagRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const Tag = styled.div`
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

export const TagGenre = styled.span`
  color: ${colors.character.orange};
`;

export const BookSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 94%;
  gap: 24px;
  background: ${colors.darkgrey.dark};
  margin: 10px 20px 0 20px;
  padding: 20px;
  border-radius: 16px;
`;

export const BookHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.white};
  font-size: ${typography.fontSize['base']};
  font-weight: ${typography.fontWeight.medium};
`;

export const BookInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const BookCover = styled.img`
  width: 80px;
  height: 107px;
  object-fit: cover;
`;

export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
  gap: 20px;
  color: ${colors.white};
  margin: auto 0;
`;

export const BookIntro = styled.div`
  > p {
    margin-top: 4px;
    color: ${colors.grey[200]};
  }
`;

export const RecommendSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 80px;
`;

export const RecommendText = styled.h2`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin: 40px 20px 0 20px;
`;

export const GroupCardBox = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  gap: 20px;
`;

export const BottomButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  height: 50px;
  background-color: ${colors.purple.main};
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border: none;
  z-index: 10;
`;
