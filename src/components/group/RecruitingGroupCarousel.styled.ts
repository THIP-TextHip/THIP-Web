import styled from '@emotion/styled';

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  &:hover .nav-button {
    opacity: 1;
    visibility: visible;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  visibility: hidden;
  transition: all 0.1s ease;

  &.prev {
    left: 3%;
  }

  &.next {
    right: 3%;
  }

  img {
    filter: invert(1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 20px;
  width: 100%;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

export const Item = styled.div`
  flex: 0 0 90%;
  max-width: 640px;
  min-width: 280px;
  scroll-snap-align: center;
  transition: transform 0.3s ease-out;
  will-change: transform;
  transform: translateZ(0);

  @media (max-width: 480px) {
    flex: 0 0 85%;
    min-width: 260px;
  }
`;
