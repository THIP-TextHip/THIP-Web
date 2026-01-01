import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 40px 0;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;

    .textContainer {
      display: flex;
      flex-direction: row;

      .followerNum {
        color: var(--color-white);
        font-size: var(--font-size-xs);
        font-weight: var(--string-weight-semibold, 600);
        line-height: normal;
      }

      .disc {
        color: var(--color-grey-100);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        line-height: normal;
        letter-spacing: 0.012px;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    .profileImg {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      border: 0.5px solid var(--color-grey-300);
    }
  }
`;
