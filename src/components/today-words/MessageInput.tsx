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
  placeholder: string;
}

const MessageInput = ({ value, onChange, onSend, placeholder }: MessageInputProps) => {
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
      if (value.trim() === '') return; // 공백 메세지 전송 방지
      e.preventDefault();
      onSend();
      // 전송 후 채팅창 높이 초기화
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleSendClick = () => {
    if (value.trim() === '') return; // 공백 메세지 전송 방지
    onSend();
    // 전송 후 채팅창 높이 초기화
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  return (
    <InputContainer>
      <MessageInputWrapper>
        <StyledMessageInput
          ref={inputRef}
          placeholder={placeholder}
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
