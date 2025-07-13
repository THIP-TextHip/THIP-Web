import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const TextAreaBox = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 0;
  padding: 0;
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
  font-weight: ${typography.fontWeight.regular};
  padding: 0;
  margin: 0;

  &::placeholder {
    color: ${semanticColors.text.primary};
    font-size: ${typography.fontSize.sm};
  }
`;

export const CharacterCount = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  text-align: right;
  margin-top: 8px;
`;
