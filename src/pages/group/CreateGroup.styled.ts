import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${semanticColors.background.primary};
  min-width: 360px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 96px 20px 100px 20px;
  box-sizing: border-box;
`;

export const Section = styled.div<{ showDivider?: boolean }>`
  margin-bottom: 32px;
  ${({ showDivider }) =>
    showDivider &&
    `
    border-bottom: 1px solid ${colors.darkgrey.dark};
  `}
`;

export const SectionTitle = styled.div`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 20px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${semanticColors.background.primary};
  border: 1px solid ${colors.grey[300]};
  border-radius: 12px;
  padding: 12px 16px;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  span {
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.medium};
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const GenreButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const GenreButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? semanticColors.background.card : semanticColors.background.cardDark};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: ${({ active }) => (active ? semanticColors.text.primary : semanticColors.text.ghost)};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
`;

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

export const DatePickerContainer = styled.div`
  color: ${semanticColors.text.primary};
`;

export const DatePickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateText = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
`;

export const MemberLimitContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MemberNumber = styled.span`
  color: ${semanticColors.text.primary};
  font-size: 32px;
  font-weight: ${typography.fontWeight.semibold};
`;

export const MemberText = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.regular};
`;

export const PrivacyToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PrivacyLabel = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
`;

export const ToggleSwitch = styled.div<{ active: boolean }>`
  width: 48px;
  height: 28px;
  background-color: ${({ active }) =>
    active ? semanticColors.button.fill.primary : semanticColors.background.card};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const ToggleSlider = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${semanticColors.text.primary};
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: ${({ active }) => (active ? '24px' : '4px')};
  transition: left 0.3s;
`;
