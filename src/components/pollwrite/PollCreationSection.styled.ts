import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../styles/global/global';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PollContentContainer = styled.div`
  position: relative;
`;

export const PollInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.medium};
  font-family: ${typography.fontFamily.primary};

  &::placeholder {
    color: ${semanticColors.text.ghost};
  }
`;

export const PollOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.grey[300]};
  border-radius: 12px;
  padding: 12px;
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
  background-color: ${semanticColors.button.fill.white};
  border-radius: 12px;
  border: none;
  padding: 10px;
  color: ${semanticColors.text.onlightPrimary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  font-family: ${typography.fontFamily.primary};
  line-height: 24px;
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
