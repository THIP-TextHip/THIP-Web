import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { PollOption } from '../../../types/memory';
import { postVote } from '@/api/record/postVote';
import { usePopupActions } from '@/hooks/usePopupActions';
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
  postId: number; // 투표 API 호출에 필요한 postId
  shouldBlur?: boolean; // 블라인드 처리 여부
  onVoteUpdate?: (updatedOptions: PollOption[]) => void; // 투표 결과 업데이트 콜백
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
  const [isVoting, setIsVoting] = useState(false);
  const pollRef = useRef<HTMLDivElement>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const { openSnackbar } = usePopupActions();

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

  // pollOptions가 변경되면 currentOptions 업데이트
  useEffect(() => {
    setCurrentOptions(pollOptions);
  }, [pollOptions]);

  // 투표 옵션 클릭 핸들러
  const handleOptionClick = async (e: React.MouseEvent, option: PollOption) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (isVoting || !roomId || shouldBlur) return;

    setIsVoting(true);

    try {
      const voteData = {
        voteItemId: option.voteItemId,
        type: !option.isVoted, // 현재 투표 상태의 반대로 설정
      };

      const response = await postVote(parseInt(roomId), postId, voteData);

      if (response.isSuccess) {
        // API 응답으로 받은 투표 결과를 현재 옵션 형태로 변환
        const updatedOptions = currentOptions.map(opt => {
          const updatedItem = response.data.voteItems.find(
            (item: PollOption) => item.voteItemId === opt.voteItemId,
          );
          if (updatedItem) {
            return {
              ...opt,
              percentage: updatedItem.percentage,
              count: updatedItem.count,
              isVoted: updatedItem.isVoted,
              isHighest:
                updatedItem.count ===
                Math.max(...response.data.voteItems.map((item: PollOption) => item.count)),
            };
          }
          return opt;
        });

        setCurrentOptions(updatedOptions);
        onVoteUpdate?.(updatedOptions);

        // 성공 메시지
        const actionText = voteData.type ? '투표했습니다' : '투표를 취소했습니다';
        openSnackbar({
          message: actionText,
          variant: 'top',
          onClose: () => {},
        });
      } else {
        // 에러 처리
        let errorMessage = '투표 처리 중 오류가 발생했습니다.';

        if (response.code === 120001) {
          errorMessage = '이미 투표한 투표항목입니다.';
        } else if (response.code === 120002) {
          errorMessage = '투표하지 않은 투표항목은 취소할 수 없습니다.';
        } else if (response.code === 140011) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (response.code === 120000) {
          errorMessage = '투표는 존재하지만 투표항목이 비어있습니다.';
        } else if (response.message) {
          errorMessage = response.message; // 서버에서 보낸 메시지 사용
        }

        openSnackbar({
          message: errorMessage,
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('투표 API 호출 실패:', error);
      openSnackbar({
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'top',
        onClose: () => {},
      });
    } finally {
      setIsVoting(false);
    }
  };

  // 아무도 투표하지 않았는지 확인 (모든 옵션이 0표인지 확인)
  const hasVotes = currentOptions.some(option => option.count > 0);

  // 전체 투표수 계산
  const totalVotes = currentOptions.reduce((sum, option) => sum + option.count, 0);

  // 각 옵션의 퍼센트 계산 (애니메이션용)
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
                delay={index * 200} // 각 옵션마다 200ms 지연
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
