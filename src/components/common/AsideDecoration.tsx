import styled from '@emotion/styled';
import asideSvg from '@/assets/common/aside.svg';

const AsideDecoration = () => {
  return (
    <Wrapper aria-hidden="true">
      <img src={asideSvg} alt="QR플로팅 이미지" />
    </Wrapper>
  );
};

export default AsideDecoration;

const Wrapper = styled.div`
  position: fixed;
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
