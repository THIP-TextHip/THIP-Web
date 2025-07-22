import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../styles/global/global';

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PhotoGrid = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const AddPhotoButton = styled.button`
  width: 80px;
  height: 80px;
  border: 2px dashed ${colors.grey[300]};
  background-color: transparent;
  border-radius: 8px;
  color: ${semanticColors.text.secondary};
  font-size: 32px;
  font-weight: ${typography.fontWeight.regular};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${semanticColors.text.primary};
    color: ${semanticColors.text.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PhotoItem = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${semanticColors.button.fill.primary};
  color: ${semanticColors.text.primary};
  border: none;
  font-size: 14px;
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background-color: ${semanticColors.button.fill.background};
  }
`;

export const PhotoCount = styled.div`
  align-self: flex-end;
  color: ${semanticColors.text.tertiary};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;
