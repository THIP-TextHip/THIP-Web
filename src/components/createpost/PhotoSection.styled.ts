import styled from '@emotion/styled';
import { typography, semanticColors, colors } from '../../styles/global/global';

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PhotoGrid = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const AddPhotoButton = styled.button`
  width: 80px;
  height: 80px;
  border: 1px solid ${colors.grey[300]};
  background-color: ${semanticColors.background.cardDark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover:not(:disabled) {
    border-color: ${semanticColors.text.primary};
  }

  &:disabled {
    background-color: ${colors.darkgrey.dark};
    border: 1px solid ${colors.darkgrey.main};
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
  border: 1px solid ${colors.grey[300]};
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.grey[300]};

  img {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const PhotoCount = styled.div`
  align-self: flex-end;
  color: ${semanticColors.text.point.green};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
`;
