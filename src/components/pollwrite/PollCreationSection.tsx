import { useState, useRef, useEffect } from 'react';
import {
  Section,
  PollContentContainer,
  PollInput,
  PollOptionsContainer,
  OptionInputContainer,
  OptionInput,
  DeleteButton,
  AddOptionButton,
} from './PollCreationSection.styled';
import closeIcon from '../../assets/common/delete.svg';
import trashIcon from '../../assets/common/trash.svg';

interface PollCreationSectionProps {
  content: string;
  onContentChange: (value: string) => void;
  options: string[];
  onOptionsChange: (options: string[]) => void;
  isEditMode?: boolean; // 수정 모드 여부
  autoFocus?: boolean; // 자동 포커스 및 커서 위치 설정 여부
}

const PollCreationSection = ({
  content,
  onContentChange,
  options,
  onOptionsChange,
  isEditMode = false,
  autoFocus = false,
}: PollCreationSectionProps) => {
  const maxContentLength = 20;
  const maxOptions = 5;
  const [focusStates, setFocusStates] = useState<boolean[]>(options.map(() => false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const contentInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxContentLength) {
      onContentChange(value);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
  };

  const handleOptionFocus = (index: number) => {
    const newFocusStates = [...focusStates];
    newFocusStates[index] = true;
    setFocusStates(newFocusStates);
  };

  const handleOptionBlur = (index: number) => {
    const newFocusStates = [...focusStates];
    newFocusStates[index] = false;
    setFocusStates(newFocusStates);
  };

  const handleClearOption = (index: number) => {
    const newOptions = [...options];
    newOptions[index] = '';
    onOptionsChange(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      const newFocusStates = focusStates.filter((_, i) => i !== index);
      onOptionsChange(newOptions);
      setFocusStates(newFocusStates);

      // refs 배열도 업데이트
      inputRefs.current = inputRefs.current.filter((_, i) => i !== index);
    }
  };

  const handleAddOption = () => {
    if (options.length < maxOptions) {
      onOptionsChange([...options, '']);
      setFocusStates([...focusStates, false]);
    }
  };

  useEffect(() => {
    if (focusStates.length !== options.length) {
      const newFocusStates = options.map((_, index) => focusStates[index] || false);
      setFocusStates(newFocusStates);
    }
  }, [options.length, focusStates.length]);

  // autoFocus 처리
  useEffect(() => {
    if (autoFocus && contentInputRef.current) {
      const input = contentInputRef.current;
      input.focus();
      // 커서를 텍스트 끝으로 이동
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, [autoFocus]);

  return (
    <Section>
      <PollContentContainer>
        <PollInput
          ref={contentInputRef}
          placeholder="투표 내용을 20자 이내로 입력하세요."
          value={content}
          onChange={handleContentChange}
          maxLength={maxContentLength}
        />
      </PollContentContainer>

      <PollOptionsContainer>
        {options.map((option, index) => (
          <OptionInputContainer key={index}>
            <OptionInput
              ref={el => {
                inputRefs.current[index] = el;
              }}
              placeholder={`항목을 20자 이내로 입력`}
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
              onFocus={() => handleOptionFocus(index)}
              onBlur={() => handleOptionBlur(index)}
              maxLength={20}
              disabled={isEditMode}
              readOnly={isEditMode}
            />
            {/* 수정 모드가 아니어야만 삭제 버튼 표시 */}
            {!isEditMode && (
              <>
                {/* 텍스트가 있을 때는 X 아이콘으로 텍스트 삭제 */}
                {option.trim() !== '' && (
                  <DeleteButton onClick={() => handleClearOption(index)}>
                    <img src={closeIcon} alt="텍스트 삭제" />
                  </DeleteButton>
                )}
                {/* 텍스트가 없고 3번째 항목(index >= 2)부터만 쓰레기통 아이콘으로 항목 삭제 */}
                {option.trim() === '' && index >= 2 && (
                  <DeleteButton onClick={() => handleRemoveOption(index)}>
                    <img src={trashIcon} alt="항목 삭제" />
                  </DeleteButton>
                )}
              </>
            )}
          </OptionInputContainer>
        ))}

        {!isEditMode && options.length < maxOptions && (
          <AddOptionButton onClick={handleAddOption}>항목 추가</AddOptionButton>
        )}
      </PollOptionsContainer>
    </Section>
  );
};

export default PollCreationSection;
