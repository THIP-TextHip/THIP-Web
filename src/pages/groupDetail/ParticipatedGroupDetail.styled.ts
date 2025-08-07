import styled from '@emotion/styled';
import { colors } from '@/styles/global/global';

export const ParticipatedWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 767px;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;

export const ClickableMeta = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const MetaChevron = styled.img`
  width: 24px;
  height: 24px;
`;

export const MetaTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
