import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePopupActions } from '@/hooks/usePopupActions';
import { getAiUsage } from '@/api/record';
import plusIcon from '../../../assets/memory/plus.svg';
import penIcon from '../../../assets/memory/pen.svg';
import voteIcon from '../../../assets/memory/vote.svg';
import aiIcon from '../../../assets/memory/ai.svg';
import { AddButton, DropdownContainer, DropdownItem } from './MemoryAddButton.styled';

const MemoryAddButton = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { openConfirm, closePopup, openSnackbar } = usePopupActions();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRecordWrite = () => {
    setIsOpen(false);

    const currentRoomId = roomId || '1';

    navigate(`/memory/record/write/${currentRoomId}`);
  };

  const handlePollCreate = () => {
    setIsOpen(false);

    const currentRoomId = roomId || '1';

    navigate(`/memory/poll/write/${currentRoomId}`);
  };

  const handleAIWrite = async () => {
    setIsOpen(false);
    const currentRoomId = roomId || '1';

    try {
      const result = await getAiUsage(Number(currentRoomId));

      if (result.isSuccess) {
        const { recordCount, recordReviewCount } = result.data;

        if (recordCount < 2) {
          openSnackbar({
            message: `독후감 생성을 위해서는 최소 2개의 기록이 필요합니다. 현재 기록 개수: ${recordCount}`,
            variant: 'top',
            isError: true,
            onClose: () => {},
          });
          return;
        }

        if (recordReviewCount >= 5) {
          openSnackbar({
            message: '사용자의 독후감 작성 수가 5회를 초과했습니다.',
            variant: 'top',
            isError: true,
            onClose: () => {},
          });
          return;
        }

        openConfirm({
          title: 'AI 독서감상문 생성 (Beta)',
          disc: `기록장에서 작성한 기록을 기반으로<br/>독서감상문을 생성하시겠어요?<br/>(서비스 내 잔여 이용횟수 : ${recordReviewCount}/5)`,
          confirmText: '확인',
          cancelText: '취소',
          onConfirm: () => {
            closePopup();
            navigate(`/aiwrite/${currentRoomId}`);
          },
        });
      } else {
        openSnackbar({
          message: result.message,
          variant: 'top',
          isError: true,
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('AI 이용 횟수 조회 실패:', error);
      openSnackbar({
        message: 'AI 이용 횟수 조회에 실패했습니다',
        variant: 'top',
        isError: true,
        onClose: () => {},
      });
    }
  };

  return (
    <div ref={dropdownRef}>
      <AddButton isOpen={isOpen} onClick={handleButtonClick}>
        <img src={plusIcon} alt="기록 추가" />
      </AddButton>

      {isOpen && (
        <DropdownContainer>
          <DropdownItem onClick={handleRecordWrite}>
            <img src={penIcon} alt="기록 작성" />
            <span>기록 작성</span>
          </DropdownItem>
          <DropdownItem onClick={handlePollCreate}>
            <img src={voteIcon} alt="투표 생성" />
            <span>투표 생성</span>
          </DropdownItem>
          <DropdownItem onClick={handleAIWrite}>
            <img src={aiIcon} alt="AI 독서 감상문 생성" />
            <span>AI 독서 감상문 생성</span>
          </DropdownItem>
        </DropdownContainer>
      )}
    </div>
  );
};

export default MemoryAddButton;
