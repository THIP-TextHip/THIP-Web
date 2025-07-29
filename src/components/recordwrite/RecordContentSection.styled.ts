import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const TextAreaBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  background-color: ${semanticColors.background.primary};
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  resize: none;
  outline: none;
  border: none;
  padding: 0;
  line-height: 1.5;

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
