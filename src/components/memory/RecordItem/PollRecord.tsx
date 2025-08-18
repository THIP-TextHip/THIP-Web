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
  onVoteUpdate?: (updatedOptions: PollOption[]) => void; // 투표 결과 업데이트 콜백
}

const PollRecord = ({ content, pollOptions, postId, onVoteUpdate }: PollRecordProps) => {
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

    if (pollRef.current) {
      observer.observe(pollRef.current);
    }

    return () => {
      if (pollRef.current) {
        observer.unobserve(pollRef.current);
      }
    };
  }, [animate]);

  // pollOptions가 변경되면 currentOptions 업데이트
  useEffect(() => {
    setCurrentOptions(pollOptions);
  }, [pollOptions]);

  // 투표 옵션 클릭 핸들러
  const handleOptionClick = async (option: PollOption) => {
    if (isVoting || !roomId) return;

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
            item => item.voteItemId === opt.voteItemId
          );
          if (updatedItem) {
            return {
              ...opt,
              percentage: updatedItem.percentage,
              isVoted: updatedItem.isVoted,
              isHighest: updatedItem.percentage === Math.max(...response.data.voteItems.map(item => item.percentage))
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
        } else if (response.code === 140011) {
          errorMessage = '방 접근 권한이 없습니다.';
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

  return (
    <PollSection ref={pollRef}>
      <PollQuestion>{content}</PollQuestion>
      <PollOptions>
        {currentOptions.map((option, index) => (
          <PollOptionStyled 
            key={option.id} 
            isHighest={option.isHighest}
            onClick={() => handleOptionClick(option)}
            style={{ 
              cursor: isVoting ? 'not-allowed' : 'pointer',
              opacity: isVoting ? 0.7 : 1
            }}
          >
            <PollBar>
              <PollBarFill
                percentage={option.percentage}
                isHighest={option.isHighest}
                animate={animate}
                delay={index * 200} // 각 옵션마다 200ms 지연
              />
            </PollBar>
            <PollContent>
              <PollNumber isHighest={option.isHighest}>
                {option.id}
              </PollNumber>
              <PollText isHighest={option.isHighest}>
                {option.text}
              </PollText>
              <PollPercentage isHighest={option.isHighest}>
                {option.percentage}%
              </PollPercentage>
            </PollContent>
          </PollOptionStyled>
        ))}
      </PollOptions>
    </PollSection>
  );
};

export default PollRecord;
