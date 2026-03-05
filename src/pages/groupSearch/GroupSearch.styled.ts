import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
`;

export const AllRoomsButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  background-color: transparent;
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
`;
