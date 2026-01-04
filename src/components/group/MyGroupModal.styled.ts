import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 20px;
`;

export const Tab = styled.button<{ selected: boolean }>`
  white-space: nowrap;
  padding: 8px 12px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) => (selected ? colors.purple.main : colors.darkgrey.main)};
  color: #fff;
  cursor: pointer;
`;

export const Content = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: auto;
  padding: 0 20px 20px 20px;
  grid-template-columns: 1fr;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-bottom: 60px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 584px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const BottomSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0 24px;
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #ff6b6b;
  font-size: ${typography.fontSize.base};
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1; /* 그리드 2열일 때도 전체 너비 차지 */
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
