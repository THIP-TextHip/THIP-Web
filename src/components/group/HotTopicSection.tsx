import {
  HotTopicSection as StyledHotTopicSection,
  HotTopicSectionHeader,
  HotTopicSectionTitle,
  HotTopicContent,
  HotTopicText,
  VoteOptionsList,
  VoteOption as StyledVoteOption,
  VoteOptionNumber,
  VoteOptionText,
  Pagination,
  PaginationDot,
  EmptyVoteContainer,
  EmptyVoteTitle,
  SlideContainer,
  SlideItem,
} from './HotTopicSection.styled';
import { useState, useRef, useCallback, useEffect } from 'react';

export interface VoteOption {
  id: string;
  text: string;
}

export interface Poll {
  id: string;
  question: string;
  options: VoteOption[];
  pageNumber: number;
}

interface HotTopicSectionProps {
  polls: Poll[];
  hasPolls: boolean;
  onClick?: () => void;
  onPollClick: (pageNumber: number) => void;
}

const HotTopicSection = ({ polls, hasPolls, onPollClick }: HotTopicSectionProps) => {
  const [currentPollIndex, setCurrentPollIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // useRef로 드래그 상태 관리
  const dragStateRef = useRef({
    startX: 0,
    startTranslateX: 0,
    hasMoved: false,
  });

  const containerWidth = 100; // 각 슬라이드의 width %

  // 투표 옵션 클릭 시 해당 페이지로 이동
  const handleVoteClick = (e: React.MouseEvent | React.TouchEvent, poll: Poll) => {
    e.stopPropagation();
    if (!isDragging || !dragStateRef.current.hasMoved) {
      onPollClick(poll.pageNumber);
    }
  };

  // 터치 이벤트 핸들러
  const handleVoteTouchEnd = (e: React.TouchEvent, poll: Poll) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging || !dragStateRef.current.hasMoved) {
      onPollClick(poll.pageNumber);
    }
  };

  const handleVoteTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  // 슬라이드 위치 계산
  const getTargetTranslateX = (index: number) => {
    return -index * containerWidth;
  };

  // 가장 가까운 슬라이드로 스냅
  const snapToClosest = useCallback(() => {
    const currentTranslate = translateX;
    let closestIndex = Math.round(Math.abs(currentTranslate) / containerWidth);

    // 범위 제한
    closestIndex = Math.max(0, Math.min(closestIndex, polls.length - 1));

    const targetTranslate = getTargetTranslateX(closestIndex);
    setTranslateX(targetTranslate);
    setCurrentPollIndex(closestIndex);
  }, [translateX, polls.length]);

  // 드래그 시작 (마우스/터치 공통)
  const handleDragStart = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      dragStateRef.current.startX = clientX;
      dragStateRef.current.startTranslateX = translateX;
      dragStateRef.current.hasMoved = false;
    },
    [translateX],
  );

  // 드래그 중 (마우스/터치 공통)
  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;

      const deltaX = clientX - dragStateRef.current.startX;

      if (Math.abs(deltaX) > 5) {
        dragStateRef.current.hasMoved = true;
      }

      const newTranslateX =
        dragStateRef.current.startTranslateX + (deltaX / window.innerWidth) * 100;

      // 드래그 범위 제한
      const minTranslate = getTargetTranslateX(polls.length - 1) - 20;
      const maxTranslate = getTargetTranslateX(0) + 20;

      const limitedTranslateX = Math.max(minTranslate, Math.min(maxTranslate, newTranslateX));
      setTranslateX(limitedTranslateX);
    },
    [isDragging, polls.length],
  );

  // 드래그 끝 (마우스/터치 공통)
  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      snapToClosest();
    }
  }, [isDragging, snapToClosest]);

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // 인덱스 변경 시 translateX 업데이트
  useEffect(() => {
    if (!isDragging) {
      setTranslateX(getTargetTranslateX(currentPollIndex));
    }
  }, [currentPollIndex, isDragging]);

  const renderVoteOptions = (poll: Poll) => {
    return poll.options.map((option, index) => (
      <StyledVoteOption
        key={option.id}
        onClick={e => handleVoteClick(e, poll)}
        onTouchStart={handleVoteTouchStart}
        onTouchEnd={e => handleVoteTouchEnd(e, poll)}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        <VoteOptionNumber>{index + 1}.</VoteOptionNumber>
        <VoteOptionText>{option.text}</VoteOptionText>
      </StyledVoteOption>
    ));
  };

  const renderEmptyState = () => (
    <HotTopicContent>
      <EmptyVoteContainer>
        <EmptyVoteTitle>모임방에 생성된 투표가 없어요</EmptyVoteTitle>
      </EmptyVoteContainer>
    </HotTopicContent>
  );

  const renderPollContent = () => {
    if (!hasPolls || polls.length === 0) {
      return renderEmptyState();
    }

    return (
      <HotTopicContent>
        <SlideContainer
          ref={slideRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {polls.map(poll => (
            <SlideItem key={poll.id}>
              <HotTopicText>{poll.question}</HotTopicText>
              <VoteOptionsList>{renderVoteOptions(poll)}</VoteOptionsList>
            </SlideItem>
          ))}
        </SlideContainer>

        {polls.length > 1 && (
          <Pagination>
            {polls.map((_, index) => (
              <PaginationDot
                key={index}
                active={index === currentPollIndex}
                onClick={() => setCurrentPollIndex(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Pagination>
        )}
      </HotTopicContent>
    );
  };

  return (
    <StyledHotTopicSection>
      <HotTopicSectionHeader>
        <HotTopicSectionTitle>모임방의 뜨거운 감자</HotTopicSectionTitle>
      </HotTopicSectionHeader>
      {renderPollContent()}
    </StyledHotTopicSection>
  );
};

export default HotTopicSection;
