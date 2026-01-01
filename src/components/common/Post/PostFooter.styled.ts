import styled from '@emotion/styled';

export const Container = styled.div<{ isDetail: boolean }>`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  img {
    cursor: pointer;
  }

  .left {
    display: flex;
    flex-direction: row;
    gap: 12px;
    .count {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var(--color-white);
      font-size: var(--string-size-small03, 12px);
      font-weight: var(--string-weight-medium, 500);
      line-height: normal;
      letter-spacing: 0.012px;
      gap: 2px;

      &.comment img {
        cursor: ${({ isDetail }) => (isDetail ? 'default' : 'pointer')};
      }
    }
  }
`;
