import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: var(--color-black-main);
  min-width: 360px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  padding: 96px 20px 0 20px;
  gap: 12px;

  .errorMessage {
    position: absolute;
    top: 220px;
    left: 24px;

    color: var(--color-text-warning_red, #ff9496);
    font-size: var(--string-size-small03, 12px);
    font-weight: var(--string-weight-regular, 400);
    line-height: normal;
  }

  .title {
    margin-top: 40px;
    color: var(--color-white);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
  }

  .subtitle {
    color: var(--color-grey-100);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
  }

  .notice {
    color: var(--color-neongreen);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 76px;
    padding-top: 40px;

    .userInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .profile {
        display: flex;
        width: 54px;
        height: 54px;
        justify-content: center;
        align-items: center;
        border-radius: 54px;
        border: 0.5px solid var(--color-grey-200);
        overflow: hidden;

        img {
          width: 54px;
          height: 54px;
          flex-shrink: 0;
        }
      }

      .username {
        padding: 8px 0 4px 0;
        color: var(--color-white);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        line-height: 24px;
        letter-spacing: 0.018px;
      }

      .subname {
        color: var(--color-character-pink);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-regular);
        line-height: normal;
      }
    }
  }

  .startBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 44px;
    padding: 10px 12px;
    gap: 8px;
    border-radius: 12px;
    background: var(--color-purple-main);
    color: var(--color-white);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    line-height: 24px;
    cursor: pointer;
  }

  .genreGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
    gap: 16px;

    .genreCard {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: center;
      align-items: flex-end;
      text-align: center;

      height: 100px;
      min-width: 130px;
      max-width: 180px;
      padding: 29px 20px;
      gap: 10px;
      border-radius: 12px;
      border: 1px solid #3d3d3d;
      cursor: pointer;
      transition: border-color 0.2s;

      .textbox {
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 1;
      }

      img.bg {
        position: absolute;
        bottom: -1px;
        left: 5px;
        width: 80px;
        height: 70px;
        opacity: 0.2;
        z-index: 0;
      }

      .genreTitle {
        color: #adadad;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
      }
      .genreSub {
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &.active {
        border: 1px solid var(--color-grey-200);
        .genreTitle {
          color: var(--color-white);
        }
        img.bg {
          opacity: 0.8;
        }
      }
    }
  }
`;

export const InputBox = styled.div<{ hasError?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 320px;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  padding: 12px;
  background-color: var(--color-darkgrey-dark);
  border: 1px solid ${props => (props.hasError ? '#FF9496' : 'none')};
  transition: border-color 0.2s ease;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--color-white);
  font-size: var(--font-size-base);
  caret-color: var(--color-neongreen);
  &::placeholder {
    color: var(--color-grey-300);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
  }
`;

export const CharCount = styled.div`
  width: 26px;
  height: 24px;
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: 24px;
`;
