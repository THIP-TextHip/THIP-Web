import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

export const PasswordInputContainer = styled.div`
  margin-top: 16px;
`;

export const PasswordInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${semanticColors.background.cardDark};
  width: 100%;
  height: 48px;
  border-radius: 12px;
  padding: 12px 16px;
  box-sizing: border-box;
`;

export const PasswordInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-weight: ${typography.fontWeight.regular};
  font-size: ${typography.fontSize.sm};
  flex: 1;
  caret-color: ${colors.neongreen};

  &::placeholder {
    color: ${colors.grey[300]};
  }

  /* 숫자만 입력 가능하도록 설정 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  img {
    width: 20px;
    height: 20px;
  }
`;
