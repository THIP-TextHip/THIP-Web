import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* min-width: 320px;
  max-width: 540px; */
  height: 166px;
  padding: 0 20px;
  padding-top: 32px;
  margin: 0 auto;
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    img {
      width: 54px;
      height: 54px;
      border-radius: 54px;
      border: 0.5px solid var(--color-white);
    }

    .user {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .username {
        color: var(--color-text-primary_white, #fefefe);
        font-size: var(--string-size-large01, 18px);
        font-weight: var(--string-weight-semibold, 600);
        line-height: var(--string-lineheight-height24, 24px); /* 133.333% */
        letter-spacing: 0.018px;
      }

      .usertitle {
        font-size: var(--string-size-medium01, 14px);
        font-weight: var(--string-weight-regular, 400);
        line-height: var(--string-lineheight-feedcontent_height20, 20px); /* 142.857% */
      }
    }
  }

  .followbutton {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #888;

    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-medium, 500);
    line-height: normal;
    cursor: pointer;
  }
`;
