import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '../TitleHeader';
import rightArrow from '../../../assets/common/right-Chevron.svg';
import { colors } from '../../../styles/global/global';
import leftArrow from '../../../assets/common/leftArrow.svg';

interface ImageViewerProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer = ({ images, initialIndex, isOpen, onClose }: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const dragStartRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // cleanup (모달 닫히면 복구)
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleDragStart = (clientX: number) => {
    dragStartRef.current = clientX;
    isDraggingRef.current = false;
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartRef.current === null || !isDraggingRef.current) return;

    const deltaX = clientX - dragStartRef.current;
    const threshold = 50; // 최소 드래그 거리

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // 오른쪽으로 드래그 -> 이전 이미지
        handlePrevious();
      } else {
        // 왼쪽으로 드래그 -> 다음 이미지
        handleNext();
      }
    }

    dragStartRef.current = null;
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = () => {
    if (dragStartRef.current === null) return;
    isDraggingRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDragEnd(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX);
  };

  const handleTouchMove = () => {
    if (dragStartRef.current === null) return;
    isDraggingRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    handleDragEnd(touch.clientX);
  };

  return (
    <ModalOverlay>
      <TitleHeader leftIcon={<img src={leftArrow} />} onLeftClick={() => onClose()} />
      <ModalContainer>
        {images.length > 1 && (
          <PrevButton onClick={handlePrevious}>
            <ButtonIcon src={rightArrow} alt="이전 이미지" isNext />
          </PrevButton>
        )}
        <ImageContainer
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image src={images[currentIndex]} alt={`이미지 ${currentIndex + 1}`} />
        </ImageContainer>
        {images.length > 1 && (
          <NextButton onClick={handleNext}>
            <ButtonIcon src={rightArrow} alt="다음 이미지" />
          </NextButton>
        )}
      </ModalContainer>
      {images.length > 1 && (
        <DotsContainer>
          {images.map((_, index) => (
            <Dot key={index} isActive={index === currentIndex} />
          ))}
        </DotsContainer>
      )}
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* min-width: 320px;
  max-width: 767px;
  margin: 0 auto; */
  /* background-color: ${colors.black.main}; */
  background-color: rgba(18, 18, 18, 0.1);
  backdrop-filter: blur(2.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 320px;
  max-width: 767px;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const Image = styled.img`
  width: auto; /* 가로는 자동 조절 */
  height: auto; /* 세로는 자동 조절 */
  max-width: 100%; /* 컨테이너의 가로를 넘지 않음 */
  max-height: 600px; /* 세로는 최대 600px로 제한 */
  object-fit: contain; /* 비율 유지하며 컨테이너에 맞춤 */
  pointer-events: none;
`;

const DotsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 1001;
`;

const Dot = styled.div<{ isActive: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? colors.white : colors.grey[300])};
`;

const PrevButton = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
`;

const NextButton = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;

  /* &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  } */
`;

const ButtonIcon = styled.img<{ isNext?: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${props => (props.isNext ? 'rotate(180deg)' : 'none')};
`;

export default ImageViewer;
