import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const ParticipatedWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
  overflow: hidden;
`;

export const ClickableMeta = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
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

export const MetaInfo = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 20px;
  width: 100%;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.fontSize['xs']};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
  gap: 12px;
  flex: 1;
  span {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;
