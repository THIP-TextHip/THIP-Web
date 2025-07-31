import {
  Section,
  PollContentContainer,
  PollInput,
  PollOptionsContainer,
  OptionInputContainer,
  OptionInput,
  CloseButton,
  AddOptionButton,
  StatusMessage,
} from './PollCreationSection.styled';
import closeIcon from '../../assets/common/delete.svg';

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

  // 모든 옵션이 채워져 있는지 확인
  const allOptionsCompleted = pollOptions.every(option => option.trim() !== '');

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

  const handleRemoveOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      onPollOptionsChange(newOptions);
    }
  };

  const handleAddOption = () => {
    if (pollOptions.length < maxOptions) {
      onPollOptionsChange([...pollOptions, '']);
    }
  };

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
              placeholder={`항목을 20자 이내로 입력`}
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
              maxLength={20}
            />
            {pollOptions.length > 2 && (
              <CloseButton onClick={() => handleRemoveOption(index)}>
                <img src={closeIcon} alt="삭제" />
              </CloseButton>
            )}
          </OptionInputContainer>
        ))}

        {pollOptions.length < maxOptions && (
          <AddOptionButton onClick={handleAddOption}>항목 추가</AddOptionButton>
        )}
      </PollOptionsContainer>

      {allOptionsCompleted && pollContent.trim() !== '' && (
        <StatusMessage completed={true}>투표 내용을 20자 이내로 입력완료</StatusMessage>
      )}
    </Section>
  );
};

export default PollCreationSection;
