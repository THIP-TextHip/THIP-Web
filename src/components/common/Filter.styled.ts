import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const SelectedText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 20px;
  position: absolute;
  top: 30px;
  left: -20px;
  border: solid 1px ${colors.grey[200]};
  border-radius: 16px;
  background: ${colors.black.main};
`;
