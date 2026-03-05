import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  width: 144px;
  height: 60px;
  padding: 20px 12px;
  border-radius: 16px;
  border: 1px solid ${colors.grey[200]};
  background-color: rgba(18, 18, 18, 0.3);
  z-index: 1001;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.delete {
    .option-text {
      color: ${colors.white};
      font-size: ${typography.fontSize.sm};
      font-weight: ${typography.fontWeight.regular};
      line-height: 20px;
    }
  }

  &.report {
    .option-text {
      color: ${colors.red};
      font-size: ${typography.fontSize.sm};
      font-weight: ${typography.fontWeight.regular};
      line-height: 20px;
    }
  }

  .option-text {
    color: ${colors.white};
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.medium};
    line-height: normal;
  }
`;
