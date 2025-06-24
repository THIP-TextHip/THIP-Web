import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  min-width: 360px;
  max-width: 768px;
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
