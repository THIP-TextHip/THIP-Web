import { useState, useRef, useEffect } from 'react';
import TitleHeader from '../TitleHeader';
import rightArrow from '../../../assets/common/right-Chevron.svg';
import leftArrow from '../../../assets/common/leftArrow.svg';
import {
  ModalOverlay,
  ModalContainer,
  ImageContainer,
  Image,
  DotsContainer,
  Dot,
  PrevButton,
  NextButton,
  ButtonIcon,
} from './ImageViewer.styled';

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

export default ImageViewer;
