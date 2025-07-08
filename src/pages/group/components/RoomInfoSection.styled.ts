import styled from '@emotion/styled';
import { typography, semanticColors } from '../../../styles/global/global';

export const TextAreaBox = styled.div`
  position: relative;
  background-color: ${semanticColors.background.cardDark};
  border-radius: 12px;
  padding: 12px 16px;
`;

export const TextArea = styled.textarea`
  background: none;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  width: 100%;
  resize: none;
  font-family: ${typography.fontFamily.primary};

  &::placeholder {
    color: ${semanticColors.text.ghost};
    font-size: ${typography.fontSize.base};
  }
`;

export const CharacterCount = styled.div`
  position: absolute;
  bottom: 12px;
  right: 16px;
  color: ${semanticColors.text.ghost};
  font-size: ${typography.fontSize.xs};
`;
