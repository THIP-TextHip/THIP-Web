import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePopupActions } from '@/hooks/usePopupActions';
import plusIcon from '../../../assets/memory/plus.svg';
import penIcon from '../../../assets/memory/pen.svg';
import voteIcon from '../../../assets/memory/vote.svg';
import aiIcon from '../../../assets/memory/ai.svg';
import { AddButton, DropdownContainer, DropdownItem } from './MemoryAddButton.styled';

const MemoryAddButton = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>(); // useParams 추가
  const { openConfirm } = usePopupActions();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
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

    // URL에서 roomId를 가져오거나 기본값 1 사용
    const currentRoomId = roomId || '1';

    navigate(`/memory/record/write/${currentRoomId}`);
    console.log('기록 작성하기 - roomId:', currentRoomId);
  };

  const handlePollCreate = () => {
    setIsOpen(false);

    // URL에서 roomId를 가져오거나 기본값 1 사용
    const currentRoomId = roomId || '1';

    navigate(`/memory/poll/write/${currentRoomId}`);
    console.log('투표 생성하기 - roomId:', currentRoomId);
  };

  const handleAIWrite = () => {
    setIsOpen(false);
    openConfirm({
      title: 'AI 독서감상문 생성 (Beta)',
      disc: '기록장에서 작성한 기록을 기반으로<br/>독서감상문을 생성하시겠어요?<br/>(서비스 내 잔여 이용횟수 : n/5)',
      onConfirm: () => {
        console.log('AI 독서 감상문 생성 시작');
        // TODO: AI 생성 API 호출
      },
    });
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
