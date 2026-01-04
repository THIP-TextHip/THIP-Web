import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 56px;
  background-color: ${colors.black.main};
`;

export const AllRoomsButton = styled.div`
  display: flex;
  position: relative;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  width: 83%;
  border-radius: 12px;
  padding: 14px 12px;
  margin-bottom: 12px;
  color: ${colors.white};
  background-color: ${colors.darkgrey.main};
  cursor: pointer;
  > img {
    position: absolute;
    right: 5%;
    top: -2px;
  }
`;
