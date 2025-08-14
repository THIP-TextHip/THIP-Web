import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

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

export const TopBackground = styled.div<{ bookImgUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 45vh;
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
  margin-top: 66px;
  gap: 32px;
  color: ${colors.white};
  z-index: 10;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BookTitle = styled.h1`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
`;

export const Author = styled.p`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[200]};
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubTitle = styled.p`
  font-size: ${typography.fontSize['sm']};
  font-weight: ${typography.fontWeight.semibold};
  margin-top: 20px;
  color: ${colors.white};
`;

export const SubText = styled.p`
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

export const RecruitingGroupButton = styled.button`
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
  cursor: pointer;
`;

export const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const WritePostButton = styled.button`
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
  cursor: pointer;
`;

export const SaveButton = styled.button`
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const FeedSection = styled.section`
  display: flex;
  width: 96%;
  flex-direction: column;
  margin-top: 20px;
`;

export const FeedTitle = styled.h2`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  padding: 20px;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin: 0 20px;
  padding: 0 0 10px 0;
  border-bottom: 1px solid ${colors.darkgrey.dark};
`;

export const EmptyState = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  margin-bottom: 70px;
  color: ${colors.grey[100]};
`;

export const EmptyTitle = styled.p`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
  color: ${colors.white};
`;

export const EmptySubText = styled.p`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.grey[100]};
`;
