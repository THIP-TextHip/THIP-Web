import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../styles/global/global';

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
  font-size: ${typography.fontSize.sm};
  width: 100%;
  resize: none;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.regular};
  padding: 0;
  margin: 0;
  caret-color: ${colors.neongreen};

  &::placeholder {
    color: ${colors.grey[300]};
    font-size: ${typography.fontSize.sm};
  }
`;

export const CharacterCount = styled.div`
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  text-align: right;
  margin-top: 8px;
`;
