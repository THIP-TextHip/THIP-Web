import { useEffect, useRef, useState } from 'react';
import {
  WheelContainer,
  WheelInner,
  WheelSlides,
  WheelShadowTop,
  WheelShadowBottom,
  WheelLabel,
  WheelSlide,
} from './Wheel.styled';

interface DateWheelProps {
  values: number[];
  selectedValue: number;
  onChange: (value: number) => void;
  label?: string;
  width?: number;
}

interface SliderState {
  abs: number;
  slides: Array<{ distance: number }>;
}

const DateWheel = ({ values, selectedValue, onChange, label, width = 50 }: DateWheelProps) => {
  const [sliderState, setSliderState] = useState<SliderState | null>(null);
  const [radius, setRadius] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startIndex = useRef(0);

  const wheelSize = 15;
  const slides = values.length;

  useEffect(() => {
    const index = values.indexOf(selectedValue);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedValue, values]);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = 150;
      setRadius(containerHeight / 2);

      const initialState: SliderState = {
        abs: currentIndex,
        slides: values.map((_, i) => ({
          distance: i - currentIndex,
        })),
      };
      setSliderState(initialState);
    }
  }, [currentIndex, values]);

  const handleInteractionStart = (clientY: number) => {
    isDragging.current = true;
    startY.current = clientY;
    startIndex.current = currentIndex;
  };

  const handleInteractionMove = (clientY: number) => {
    if (!isDragging.current) return;

    const deltaY = clientY - startY.current;
    const sensitivity = 30;
    const deltaIndex = Math.round(-deltaY / sensitivity);
    const newIndex = Math.max(0, Math.min(values.length - 1, startIndex.current + deltaIndex));

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);

      const newState: SliderState = {
        abs: newIndex,
        slides: values.map((_, i) => ({
          distance: i - newIndex,
        })),
      };
      setSliderState(newState);
    }
  };

  const handleInteractionEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    onChange(values[currentIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleInteractionStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleInteractionMove(e.touches[0].clientY);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleInteractionStart(e.clientY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleInteractionMove(moveEvent.clientY);
    };

    const handleMouseUp = () => {
      handleInteractionEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    moveToIndex(delta);
  };

  const moveToIndex = (direction: number) => {
    const newIndex = Math.max(0, Math.min(values.length - 1, currentIndex + direction));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      onChange(values[newIndex]);

      const newState: SliderState = {
        abs: newIndex,
        slides: values.map((_, i) => ({
          distance: i - newIndex,
        })),
      };
      setSliderState(newState);
    }
  };

  const slideValues = () => {
    if (!sliderState || !sliderState.slides) return [];

    const valuesArray = [];

    for (let i = 0; i < slides; i++) {
      const slideData = sliderState.slides[i];
      if (!slideData) continue;

      const distance = slideData.distance || 0;
      const threshold = wheelSize / 2 + 1;
      const rotate = Math.abs(distance) > threshold ? 180 : distance * (360 / wheelSize) * -1;

      const isSelected = i === currentIndex;

      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };

      const value = values[i];
      valuesArray.push({ style, value, isSelected });
    }

    return valuesArray;
  };

  return (
    <WheelContainer
      ref={containerRef}
      className="wheel keen-slider wheel--perspective-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleInteractionEnd}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      style={{ height: '150px' }}
    >
      <WheelShadowTop radius={radius} onClick={() => moveToIndex(-1)} />

      <WheelInner>
        <WheelSlides style={{ width: `${width}px` }}>
          {slideValues().map(({ style, value, isSelected }, idx) => (
            <WheelSlide key={`${value}-${idx}`} style={style} isSelected={isSelected}>
              <span>{value}</span>
            </WheelSlide>
          ))}
        </WheelSlides>

        {label && <WheelLabel radius={radius}>{label}</WheelLabel>}
      </WheelInner>

      <WheelShadowBottom radius={radius} onClick={() => moveToIndex(1)} />
    </WheelContainer>
  );
};

export default DateWheel;
