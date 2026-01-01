import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const BookContainer = styled.div`
  display: flex;
  height: 44px;
  padding: 8px 4px 8px 12px;
  /* min-width: 280px;
  max-width: 500px; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: ${colors.darkgrey.main};
  cursor: pointer;

  .left {
    overflow: hidden;
    width: 220px;
    white-space: nowrap;
    color: ${colors.white};
    text-overflow: ellipsis;
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 24px;
  }

  .right {
    display: flex;
    flex-direction: row;
    gap: 4px;
    overflow: hidden;
    color: ${colors.grey[100]};
    text-align: right;
    text-overflow: ellipsis;
    font-size: ${typography.fontSize.xs};
    font-style: normal;
    font-weight: ${typography.fontWeight.regular};
    line-height: 24px;

    .name {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
