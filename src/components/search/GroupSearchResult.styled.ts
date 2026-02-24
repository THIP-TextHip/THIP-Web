import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 20px;
  margin-bottom: 16px;
`;

export const Tab = styled.button<{ selected?: boolean }>`
  white-space: nowrap;
  padding: 8px 12px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) => (selected ? `${colors.purple.main}` : `${colors.darkgrey.main}`)};
  color: #fff;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 20px 60px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const GroupCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
`;

export const GroupNum = styled.span`
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const EmptyContent = styled.div`
  display: flex;
  height: 60vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const EmptyMainText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
`;

export const EmptySubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
`;

export const LoadingText = styled.div`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  text-align: center;
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: ${typography.fontSize.sm};
  text-align: center;
`;
