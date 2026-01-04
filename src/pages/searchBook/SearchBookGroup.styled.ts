import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;

export const ContentHeader = styled.div`
  display: flex;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[100]};
  border-bottom: 1px solid ${colors.darkgrey.dark};
  margin: 76px 20px 20px 20px;
  padding-bottom: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding: 0 20px;
  margin-bottom: 70px;
  width: 100%;
`;

export const EmptyState = styled.div`
  flex: 1;
  min-height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  margin-bottom: 70px;
  color: ${colors.grey[100]};
  text-align: center;
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
