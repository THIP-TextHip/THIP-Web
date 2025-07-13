import { useRef, useState } from 'react';
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
  const [isComposing, setIsComposing] = useState(false); // IME 조합 상태

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    // 자동 높이 조절
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  // IME 조합 시작
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // IME 조합 끝
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // IME 조합 중이면 Enter 처리를 하지 않음
      if (isComposing) {
        return;
      }

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
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
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
