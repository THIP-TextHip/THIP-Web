import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  /* 뷰포트 중앙 기준으로 왼쪽 방향으로 650px 떨어뜨림 */
  left: 50%;
  transform: translateX(-650px);
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 1250px) {
    display: none;
  }
`;
