import {
  HotTopicSection as StyledHotTopicSection,
  HotTopicSectionHeader,
  HotTopicSectionTitle,
  HotTopicContent,
  HotTopicText,
  VoteOptionsList,
  VoteOption,
  VoteOptionNumber,
  VoteOptionText,
  Pagination,
  PaginationDot,
  EmptyVoteContainer,
  EmptyVoteTitle,
  SlideContainer,
} from './HotTopicSection.styled';
import { useState, useRef } from 'react';

export interface VoteOption {
  id: string;
  text: string;
}

export interface Poll {
  id: string;
  question: string;
  options: VoteOption[];
  pageNumber: number; // 해당 투표가 위치한 페이지
}

interface HotTopicSectionProps {
  polls: Poll[];
  hasPolls: boolean;
  onClick: () => void;
  onPollClick: (pageNumber: number) => void; // 투표 클릭 시 해당 페이지로 이동
}

const HotTopicSection = ({ polls, hasPolls, onClick, onPollClick }: HotTopicSectionProps) => {
  const [currentPollIndex, setCurrentPollIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  // 투표 옵션 클릭 시 해당 페이지로 이동
  const handleVoteClick = (poll: Poll) => {
    onPollClick(poll.pageNumber);
  };

  // 슬라이드 터치/드래그 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    slideRef.current?.setAttribute('data-start-x', touch.clientX.toString());
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(slideRef.current?.getAttribute('data-start-x') || '0');
    const diffX = startX - touch.clientX;

    if (Math.abs(diffX) > 50) {
      // 최소 50px 이상 드래그해야 슬라이드
      if (diffX > 0 && currentPollIndex < polls.length - 1) {
        // 오른쪽으로 슬라이드 (다음 투표)
        setCurrentPollIndex(currentPollIndex + 1);
      } else if (diffX < 0 && currentPollIndex > 0) {
        // 왼쪽으로 슬라이드 (이전 투표)
        setCurrentPollIndex(currentPollIndex - 1);
      }
    }
  };

  const renderVoteOptions = (poll: Poll) => {
    return poll.options.map((option, index) => (
      <VoteOption
        key={option.id}
        onClick={() => handleVoteClick(poll)}
        style={{ cursor: 'pointer' }}
      >
        <VoteOptionNumber>{index + 1}.</VoteOptionNumber>
        <VoteOptionText>{option.text}</VoteOptionText>
      </VoteOption>
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
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(-${currentPollIndex * 100}%)`,
            width: `${polls.length * 100}%`,
          }}
        >
          {polls.map(poll => (
            <div
              key={poll.id}
              style={{
                width: `${100 / polls.length}%`,
                display: 'inline-block',
                verticalAlign: 'top',
              }}
            >
              <HotTopicText>{poll.question}</HotTopicText>
              <VoteOptionsList>{renderVoteOptions(poll)}</VoteOptionsList>
            </div>
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
      <HotTopicSectionHeader onClick={onClick}>
        <HotTopicSectionTitle>모임방의 뜨거운 감자</HotTopicSectionTitle>
      </HotTopicSectionHeader>
      {renderPollContent()}
    </StyledHotTopicSection>
  );
};

export default HotTopicSection;
