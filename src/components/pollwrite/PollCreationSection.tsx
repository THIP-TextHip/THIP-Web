import { useState, useRef } from 'react';
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
  pollContent: string;
  onPollContentChange: (value: string) => void;
  pollOptions: string[];
  onPollOptionsChange: (options: string[]) => void;
}

const PollCreationSection = ({
  pollContent,
  onPollContentChange,
  pollOptions,
  onPollOptionsChange,
}: PollCreationSectionProps) => {
  const maxContentLength = 20;
  const maxOptions = 5;
  const [focusStates, setFocusStates] = useState<boolean[]>(pollOptions.map(() => false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxContentLength) {
      onPollContentChange(value);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    onPollOptionsChange(newOptions);
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
    const newOptions = [...pollOptions];
    newOptions[index] = '';
    onPollOptionsChange(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      const newFocusStates = focusStates.filter((_, i) => i !== index);
      onPollOptionsChange(newOptions);
      setFocusStates(newFocusStates);

      // refs 배열도 업데이트
      inputRefs.current = inputRefs.current.filter((_, i) => i !== index);
    }
  };

  const handleAddOption = () => {
    if (pollOptions.length < maxOptions) {
      onPollOptionsChange([...pollOptions, '']);
      setFocusStates([...focusStates, false]);
    }
  };

  // pollOptions 길이가 변경될 때 focusStates 동기화
  if (focusStates.length !== pollOptions.length) {
    const newFocusStates = pollOptions.map((_, index) => focusStates[index] || false);
    setFocusStates(newFocusStates);
  }

  return (
    <Section>
      <PollContentContainer>
        <PollInput
          placeholder="투표 내용을 20자 이내로 입력하세요."
          value={pollContent}
          onChange={handleContentChange}
          maxLength={maxContentLength}
        />
      </PollContentContainer>

      <PollOptionsContainer>
        {pollOptions.map((option, index) => (
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
            />
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
          </OptionInputContainer>
        ))}

        {pollOptions.length < maxOptions && (
          <AddOptionButton onClick={handleAddOption}>항목 추가</AddOptionButton>
        )}
      </PollOptionsContainer>
    </Section>
  );
};

export default PollCreationSection;
