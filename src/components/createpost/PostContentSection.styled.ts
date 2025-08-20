import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const TextAreaBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea<{ readOnly?: boolean }>`
  width: 100%;
  min-height: 100px;
  background-color: ${props => (props.readOnly ? '#f5f5f5' : semanticColors.background.primary)};
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  resize: none;
  outline: none;
  border: none;
  overflow: hidden;
  cursor: ${props => (props.readOnly ? 'not-allowed' : 'text')};
  padding: 0;

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const CharacterCount = styled.div`
  align-self: flex-end;
  margin-top: 12px;
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;
