import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { PollOption } from '../../../types/memory';
import { postVote } from '@/api/record/postVote';
import { usePopupActions } from '@/hooks/usePopupActions';
import { usePreventDoubleClick } from '@/hooks/usePreventDoubleClick';
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
  postId: number;
  shouldBlur?: boolean;
  onVoteUpdate?: (updatedOptions: PollOption[]) => void;
}

const PollRecord = ({
  content,
  pollOptions,
  postId,
  shouldBlur = false,
  onVoteUpdate,
}: PollRecordProps) => {
  const [animate, setAnimate] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(pollOptions);
  const optionsRef = useRef<PollOption[]>(pollOptions);
  const { isLoading: isVoting, run: runVote } = usePreventDoubleClick();
  const pollRef = useRef<HTMLDivElement>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const { openSnackbar } = usePopupActions();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animate) {
            setTimeout(() => {
              setAnimate(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    const currentPollRef = pollRef.current;
    if (currentPollRef) {
      observer.observe(currentPollRef);
    }

    return () => {
      if (currentPollRef) {
        observer.unobserve(currentPollRef);
      }
    };
  }, [animate]);

  useEffect(() => {
    setCurrentOptions(pollOptions);
    optionsRef.current = pollOptions;
  }, [pollOptions]);

  const handleOptionClick = (e: React.MouseEvent, option: PollOption) => {
    e.stopPropagation();
    if (isVoting || !roomId || shouldBlur) return;

    runVote(async () => {
      const previousOptions = optionsRef.current;
      const latest = optionsRef.current.find(item => item.voteItemId === option.voteItemId);
      if (!latest) return;

      const nextVoted = !latest.isVoted;
      const optimisticOptions = optionsRef.current.map(item => {
        if (item.voteItemId !== option.voteItemId) return item;
        return {
          ...item,
          isVoted: nextVoted,
          count: item.count + (nextVoted ? 1 : -1),
        };
      });

      const maxCount = Math.max(...optimisticOptions.map(item => item.count));
      const normalizedOptions = optimisticOptions.map(item => ({
        ...item,
        isHighest: item.count === maxCount,
      }));

      optionsRef.current = normalizedOptions;
      setCurrentOptions(normalizedOptions);

      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        const response = await postVote(parseInt(roomId, 10), postId, {
          voteItemId: option.voteItemId,
          type: nextVoted,
        });
        const target = optionsRef.current.find(item => item.voteItemId === option.voteItemId);
        if (!target || target.isVoted !== nextVoted) return;

        if (!response.isSuccess) {
          optionsRef.current = previousOptions;
          setCurrentOptions(previousOptions);
          openSnackbar({
            message: response.message || '투표 처리 중 오류가 발생했습니다.',
            variant: 'top',
            onClose: () => {},
          });
          return;
        }

        const serverMaxCount = Math.max(...response.data.voteItems.map((item: PollOption) => item.count));
        const updatedOptions = response.data.voteItems.map((item: PollOption) => ({
          ...item,
          isHighest: item.count === serverMaxCount,
        }));
        optionsRef.current = updatedOptions;
        setCurrentOptions(updatedOptions);
        onVoteUpdate?.(updatedOptions);

        openSnackbar({
          message: nextVoted ? '투표했습니다' : '투표를 취소했습니다',
          variant: 'top',
          onClose: () => {},
        });
      } catch {
        const target = optionsRef.current.find(item => item.voteItemId === option.voteItemId);
        if (target && target.isVoted === nextVoted) {
          optionsRef.current = previousOptions;
          setCurrentOptions(previousOptions);
        }
        openSnackbar({
          message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
          variant: 'top',
          onClose: () => {},
        });
      }
    });
  };

  const hasVotes = currentOptions.some(option => option.count > 0);

  const totalVotes = currentOptions.reduce((sum, option) => sum + option.count, 0);

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0;
    return (count / totalVotes) * 100;
  };

  return (
    <PollSection ref={pollRef}>
      <PollQuestion>{content}</PollQuestion>
      <PollOptions>
        {currentOptions.map((option, index) => (
          <PollOptionStyled
            key={option.id}
            isHighest={hasVotes && option.isHighest}
            onClick={shouldBlur ? undefined : e => handleOptionClick(e, option)}
            style={{
              cursor: shouldBlur ? 'default' : isVoting ? 'not-allowed' : 'pointer',
              opacity: shouldBlur ? 1 : isVoting ? 0.7 : 1,
              pointerEvents: shouldBlur ? 'none' : 'auto',
            }}
          >
            <PollBar>
              <PollBarFill
                percentage={hasVotes ? getPercentage(option.count) : 0}
                isHighest={hasVotes && option.isHighest}
                animate={hasVotes && animate}
                delay={index * 200}
              />
            </PollBar>
            <PollContent>
              <PollNumber isHighest={hasVotes && option.isHighest}>{index + 1}</PollNumber>
              <PollText isHighest={hasVotes && option.isHighest}>{option.text}</PollText>
              {hasVotes && (
                <PollPercentage isHighest={hasVotes && option.isHighest}>
                  {option.count}표
                </PollPercentage>
              )}
            </PollContent>
          </PollOptionStyled>
        ))}
      </PollOptions>
    </PollSection>
  );
};

export default PollRecord;
