import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${colors.darkgrey.main};
  color: ${colors.white};
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 674px;
  max-height: 50%;
  overflow-y: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid ${colors.grey[300]};
  background-color: ${colors.darkgrey[50]};
  border-radius: 50%;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: 12px;
`;

export const Content = styled.p`
  white-space: pre-wrap;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.6;
  color: ${colors.grey[100]};
`;
