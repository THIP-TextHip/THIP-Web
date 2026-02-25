import styled from '@emotion/styled';
import { colors } from '@/styles/global/global';

export const SkeletonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
`;

export const BannerSkeletonSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 76px 20px 20px;
  gap: 20px;
  background: linear-gradient(
    172deg,
    rgba(18, 18, 18, 0.3) 5.94%,
    var(--color-view-viewfield_background_black, #121212) 94%
  );
`;

export const MetaSkeletonRow = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 16px;
`;

export const MetaSkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TagSkeletonRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const BookSkeletonSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 20px;
  gap: 16px;
`;

export const BookSkeletonInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const BookSkeletonDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;
