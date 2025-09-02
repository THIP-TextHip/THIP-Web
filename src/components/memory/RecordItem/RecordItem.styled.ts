import styled from '@emotion/styled';
import { colors, typography, semanticColors } from '../../../styles/global/global';

export const Container = styled.div<{ shouldBlur?: boolean }>`
  background-color: none;
  filter: ${({ shouldBlur }) => (shouldBlur ? 'blur(2px)' : 'none')};
  transition: filter 0.3s ease;
  pointer-events: ${({ shouldBlur }) => (shouldBlur ? 'none' : 'auto')};
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const UserAvatar = styled.div<{ src?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${colors.grey[400]};
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;
  margin-right: 8px;
  border: 0.5px solid ${colors.grey[300]};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex: 1;
`;

export const UserName = styled.span`
  color: ${semanticColors.text.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const PageInfo = styled.span`
  color: ${semanticColors.text.point.subpurple};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;

export const TimeStamp = styled.span`
  color: ${semanticColors.text.tertiary};
  font-size: 11px;
  font-weight: ${typography.fontWeight.regular};
`;

export const ContentSection = styled.div`
  margin-bottom: 8px;
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 0;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    color: ${semanticColors.text.primary};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.medium};
  }
`;
