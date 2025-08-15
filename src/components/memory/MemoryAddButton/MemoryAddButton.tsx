import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import plusIcon from '../../../assets/memory/plus.svg';
import penIcon from '../../../assets/memory/pen.svg';
import voteIcon from '../../../assets/memory/vote.svg';
import { AddButton, DropdownContainer, DropdownItem } from './MemoryAddButton.styled';

const MemoryAddButton = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
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

    // roomId가 있는 경우 해당 방의 기록 작성 페이지로 이동
    if (roomId) {
      navigate(`/rooms/${roomId}/record/write`);
    } else {
      // roomId가 없는 경우 기본 기록 작성 페이지로 이동 (또는 에러 처리)
      navigate('/memory/record/write/1'); // 임시로 roomId 1 사용
      console.warn('roomId가 없어서 임시 roomId 1을 사용합니다.');
    }

    console.log('기록 작성하기 - roomId:', roomId);
  };

  const handlePollCreate = () => {
    setIsOpen(false);

    // roomId가 있는 경우 해당 방의 투표 생성 페이지로 이동
    if (roomId) {
      navigate(`/rooms/${roomId}/poll/write`);
    } else {
      // roomId가 없는 경우 기본 투표 생성 페이지로 이동 (또는 에러 처리)
      navigate('/memory/poll/write/1'); // 임시로 roomId 1 사용
      console.warn('roomId가 없어서 임시 roomId 1을 사용합니다.');
    }

    console.log('투표 생성하기 - roomId:', roomId);
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
        </DropdownContainer>
      )}
    </div>
  );
};

export default MemoryAddButton;
