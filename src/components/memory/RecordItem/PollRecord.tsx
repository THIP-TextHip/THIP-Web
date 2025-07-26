import { useState, useEffect, useRef } from 'react';
import type { PollOption } from '../../../pages/memory/Memory';
import {
  PollSection,
  PollQuestion,
  PollOptions,
  PollOption as PollOptionStyled,
  PollContent,
  PollNumber,
  PollText,
  PollPercentage,
  PollBar,
  PollBarFill,
} from './PollRecord.styled';

interface PollRecordProps {
  content: string;
  pollOptions: PollOption[];
}

const PollRecord = ({ content, pollOptions }: PollRecordProps) => {
  const [animate, setAnimate] = useState(false);
  const pollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animate) {
            // 약간의 지연 후 애니메이션 시작
            setTimeout(() => {
              setAnimate(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.3, // 30% 보일 때 애니메이션 시작
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (pollRef.current) {
      observer.observe(pollRef.current);
    }

    return () => {
      if (pollRef.current) {
        observer.unobserve(pollRef.current);
      }
    };
  }, [animate]);

  return (
    <PollSection ref={pollRef}>
      <PollQuestion>{content}</PollQuestion>
      <PollOptions>
        {pollOptions.map((option, index) => (
          <PollOptionStyled key={option.id} isHighest={option.isHighest}>
            <PollBar>
              <PollBarFill
                percentage={option.percentage}
                isHighest={option.isHighest}
                animate={animate}
                delay={index * 200} // 각 옵션마다 200ms 지연
              />
            </PollBar>
            <PollContent>
              <PollNumber isHighest={option.isHighest}>{option.id}</PollNumber>
              <PollText isHighest={option.isHighest}>{option.text}</PollText>
              <PollPercentage isHighest={option.isHighest}>{option.percentage}%</PollPercentage>
            </PollContent>
          </PollOptionStyled>
        ))}
      </PollOptions>
    </PollSection>
  );
};

export default PollRecord;
