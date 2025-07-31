import styled from '@emotion/styled';
import { typography, semanticColors } from '../../styles/global/global';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

export const PollContentContainer = styled.div`
  background-color: ${semanticColors.background.card};
  border-radius: 8px;
  padding: 16px;
  position: relative;

  .char-count {
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: ${semanticColors.text.ghost};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.regular};
  }
`;

export const PollInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};
  padding-bottom: 24px;

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const PollOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionsTitle = styled.div`
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const OptionInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${semanticColors.background.card};
  border: 1px solid ${semanticColors.background.cardDark};
  border-radius: 8px;
  padding: 16px;
  gap: 12px;
`;

export const OptionInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  font-family: ${typography.fontFamily.primary};

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 16px;
    height: 16px;
    opacity: 0.6;
  }

  &:hover img {
    opacity: 1;
  }
`;

export const AddOptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${semanticColors.background.primary};
  border: 1px solid ${semanticColors.background.cardDark};
  border-radius: 8px;
  padding: 16px;
  color: ${semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  font-family: ${typography.fontFamily.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${semanticColors.background.card};
    color: ${semanticColors.text.primary};
  }
`;

export const StatusMessage = styled.div<{ completed: boolean }>`
  color: ${props =>
    props.completed ? semanticColors.text.primary : semanticColors.text.secondary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
  padding: 12px;
  background-color: ${props => (props.completed ? 'transparent' : semanticColors.background.card)};
  border-radius: 8px;
  margin-top: 8px;
`;
