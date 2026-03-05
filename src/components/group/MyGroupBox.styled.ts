import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  background-color: ${colors.black.main};
  position: relative;
  width: 100%;
  overflow-x: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

export const Title = styled.h2`
  flex: 1;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
  margin: 0;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  > img {
    width: 24px;
    height: 24px;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;

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
    left: 4%;
  }

  &.next {
    right: 4%;
  }

  img {
    filter: invert(1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Carousel = styled.div`
  display: flex;
  padding: 0;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-snap-type: x mandatory;

  justify-content: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

export const LoadingText = styled.p`
  color: ${colors.grey[300]};
  font-size: ${typography.fontSize.base};
  margin: 0;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

export const ErrorText = styled.p`
  color: ${colors.red};
  font-size: ${typography.fontSize.base};
  margin: 0;
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px 12px;
`;

export const EmptyCard = styled.div`
  position: relative;
  width: 90%;
  max-width: 640px;
  min-height: 180px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        120% 80% at 50% -40%,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0) 60%
      ),
      radial-gradient(80% 60% at 50% 120%, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 55%);
    pointer-events: none;
  }
`;

export const EmptyTexts = styled.div`
  position: relative;
  z-index: 1;
  padding: 32px 24px 96px;
  text-align: center;
`;

export const EmptyTitle = styled.h3`
  margin: 0 0 10px;
  color: ${colors.black.main};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: -0.2px;
`;

export const EmptySubtitle = styled.p`
  margin: 0;
  color: ${colors.grey[300]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

export const ArtworkWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 12%);
  width: clamp(90px, 42%, 90px);
  pointer-events: none;
  z-index: 0;
`;

export const Artwork = styled.img`
  display: block;
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
  user-select: none;
  opacity: 0.98;
`;
