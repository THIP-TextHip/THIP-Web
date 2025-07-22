import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../styles/global/global';

export const TextAreaBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 16px;
  background-color: ${semanticColors.background.primary};
  border: 1px solid ${colors.grey[300]};
  border-radius: 12px;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${semanticColors.text.secondary};
  }

  &:focus {
    border-color: ${semanticColors.text.primary};
  }
`;

export const CharacterCount = styled.div`
  align-self: flex-end;
  margin-top: 8px;
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;
