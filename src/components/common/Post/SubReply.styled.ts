import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';

export const DeletedContainer = styled.div`
  display: flex;
  width: 100%;

  .deleted-text {
    color: ${colors.grey[300]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

export const ReplyIcon = styled.div`
  img {
    width: 24px;
    height: 24px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

export const ReplySection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  .left {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .reply {
      color: ${colors.grey[100]};
      font-size: ${typography.fontSize.sm};
      font-weight: ${typography.fontWeight.regular};
      line-height: 20px;

      .reply-nickname {
        color: ${colors.white};
        font-size: ${typography.fontSize.sm};
        font-weight: ${typography.fontWeight.regular};
        line-height: 20px;
      }
    }
    .sub-reply {
      color: ${colors.grey[300]};
      font-size: ${typography.fontSize.xs};
      font-weight: ${typography.fontWeight.semibold};
      line-height: normal;
      cursor: pointer;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .count {
      text-align: center;
      color: ${colors.grey[100]};
      font-size: 10px;
      font-weight: ${typography.fontWeight.medium};
      line-height: normal;
    }
  }
`;
