import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  min-width: 360px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  padding: 96px 20px 0 20px;
  gap: 12px;
  box-sizing: border-box;

  .title {
    margin-top: 40px;
    color: #fefefe;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
  }

  .subtitle {
    color: #dadada;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  .notice {
    color: #a7ffb4;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
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
      align-items: center;
      justify-content: center;

      .profile {
        display: flex;
        width: 54px;
        height: 54px;
        justify-content: center;
        align-items: center;
        border-radius: 54px;
        border: 0.5px solid #adadad;
        overflow: hidden;

        img {
          width: 54px;
          height: 54px;
          flex-shrink: 0;
        }
      }

      .username {
        color: #fefefe;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0.018px;
        padding: 8px 0 4px 0;
      }

      .subname {
        color: #ff8bac;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .startBtn {
    color: #fefefe;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    display: flex;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 44px;
    gap: 8px;
    border-radius: 12px;
    background: #6868ff;
    cursor: pointer;
  }

  .genreGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
    gap: 16px;

    .genreCard {
      display: flex;
      position: relative;
      overflow: hidden;
      height: 100px;
      min-width: 130px;
      max-width: 180px;
      padding: 29px 20px;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      border-radius: 12px;
      border: 1px solid #3d3d3d;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s;
      justify-content: center;

      .textbox {
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      img.bg {
        position: absolute;
        width: 80px;
        height: 70px;
        bottom: 0px;
        left: 5px;
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
        border: 1px solid #fefefe;
        /* background: linear-gradient(0deg, rgba(18, 18, 18, 0.3) 0%, rgba(18, 18, 18, 0.3) 100%);
        background-color: lightgray; */
        .genreTitle {
          color: #fefefe;
        }
        img.bg {
          opacity: 0.8;
        }
      }
    }
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
  min-width: 320px;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
`;

export const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #fefefe;
  font-size: 16px;
  flex: 1;
  caret-color: #a7ffb4;
  &::placeholder {
    color: #888;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
  }
`;

export const CharCount = styled.div`
  color: #fefefe;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  width: 26px;
  height: 24px;
  line-height: 24px;
`;
