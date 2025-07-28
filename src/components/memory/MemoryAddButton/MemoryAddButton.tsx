import { useState, useRef, useEffect } from 'react';
import plusIcon from '../../../assets/memory/plus.svg';
import penIcon from '../../../assets/memory/pen.svg';
import voteIcon from '../../../assets/memory/vote.svg';
import { AddButton, DropdownContainer, DropdownItem } from './MemoryAddButton.styled';

interface MemoryAddButtonProps {
  onAddRecord: () => void;
}

const MemoryAddButton = ({ onAddRecord }: MemoryAddButtonProps) => {
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
    onAddRecord();
    console.log('기록 작성하기');
  };

  const handlePollCreate = () => {
    setIsOpen(false);
    console.log('투표 생성하기');
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
