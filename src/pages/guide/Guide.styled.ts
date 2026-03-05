import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div<{ isDragging?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background: ${colors.black.main};
  color: ${colors.white};
  user-select: none;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
`;

export const Header = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  max-width: 767px;
  margin: 0 auto;
  padding: 16px 20px;
  background-color: ${colors.black.main};

  .next-button {
    width: 49px;
    height: 28px;
    padding: 4px 12px;
    border-radius: 20px;
    background-color: ${colors.purple.main};
    color: ${colors.white};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 20px;
    text-align: center;
    margin-left: auto;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 66px 20px 0 20px;
  gap: 20px;
  flex: 1;
  min-height: calc(100vh - 66px);
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 135px;
  gap: 20px;
`;

export const TitleText = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize['xl']};
  font-weight: ${typography.fontWeight.bold};
  line-height: 24px;
`;

export const Description = styled.div`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  text-align: center;
`;

export const MockupContainer = styled.div`
  img {
    width: 220px;
    height: 453.052px;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  min-width: 320px;
  max-width: 767px;
  padding: 0 20px;
`;

export const Indicators = styled.div`
  display: flex;
  justify-content: center;
  left: 50%;
`;

export const Indicator = styled.div<{ active: boolean }>`
  width: 4px;
  height: 4px;
  background: ${({ active }) => (active ? colors.white : colors.grey[300])};
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
`;

export const SkipButton = styled.div`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  line-height: normal;
  cursor: pointer;
`;
