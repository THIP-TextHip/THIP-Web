import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div<{ isLast?: boolean }>`
  width: 100%;
  /* max-width: 500px;
  min-width: 320px; */
  margin: 0 auto;
  height: 78px;
  padding: 20px 0;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid var(--color-darkgrey-dark)')};
  background-color: ${colors.black.main};
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 36px;
      border: 0.5px solid ${colors.grey[300]};
    }

    .user {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .username {
        color: ${colors.white};
        font-size: ${typography.fontSize.sm};
        font-weight: ${typography.fontWeight.medium};
        line-height: normal;
      }

      .usertitle {
        font-size: ${typography.fontSize.xs};
        font-weight: ${typography.fontWeight.regular};
      }
    }
  }

  .followbutton {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid ${colors.grey[300]};
    text-align: center;
    color: ${colors.grey[100]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    line-height: normal;
    cursor: pointer;
  }

  .followlistbutton {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
    color: ${colors.white};
    font-size: ${typography.fontSize['2xs']};
    font-weight: ${typography.fontWeight.regular};
    line-height: 20px;
  }
`;
