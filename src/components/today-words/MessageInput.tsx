import { useRef } from 'react';
import sendIcon from '../../assets/common/send.svg';
import {
  InputContainer,
  MessageInputWrapper,
  MessageInput as StyledMessageInput,
  SendButton,
} from './MessageInput.styled';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageInput = ({ value, onChange, onSend }: MessageInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    // 자동 높이 조절
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSendClick = () => {
    onSend();
  };

  return (
    <InputContainer>
      <MessageInputWrapper>
        <StyledMessageInput
          ref={inputRef}
          placeholder="메이트들과 간단한 인사를 나눠보세요!"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <SendButton
          onClick={handleSendClick}
          disabled={value.trim() === ''}
          active={value.trim() !== ''}
        >
          <img src={sendIcon} alt="전송" />
        </SendButton>
      </MessageInputWrapper>
    </InputContainer>
  );
};

export default MessageInput;
