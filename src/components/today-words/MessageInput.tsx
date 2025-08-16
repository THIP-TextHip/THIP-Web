import { useRef, useState } from 'react';
import sendIcon from '../../assets/common/send.svg';
import replyIcon from '../../assets/feed/replyIcon.svg';
import closeIcon from '../../assets/common/closeIcon.svg';
import {
  Wrapper,
  InputContainer,
  MessageInputWrapper,
  MessageInput as StyledMessageInput,
  SendButton,
  ReplyContainer,
} from './MessageInput.styled';

interface MessageInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isReplying?: boolean;
  onCancelReply?: () => void;
  nickname?: string;
  disabled?: boolean;
}

const MessageInput = ({
  placeholder,
  value,
  onChange,
  onSend,
  isReplying = false,
  onCancelReply,
  nickname,
  disabled = false,
}: MessageInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    onChange(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend();
    onChange('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Wrapper>
      {/* 답글 작성 중일 때만 표시 */}
      {isReplying && nickname && (
        <ReplyContainer>
          <div className="left">
            <img src={replyIcon} alt="답글 아이콘" />
            <div className="notice">
              <div className="userName">@{nickname}</div>
              <div className="disc">님에게 답글작성</div>
            </div>
          </div>
          <img
            src={closeIcon}
            alt="답글 취소"
            onClick={onCancelReply}
            style={{ cursor: 'pointer' }}
          />
        </ReplyContainer>
      )}

      <InputContainer>
        <MessageInputWrapper>
          <StyledMessageInput
            ref={inputRef}
            placeholder={disabled ? '전송 중...' : placeholder} // disabled일 때 placeholder 변경
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => !disabled && setIsComposing(true)} // disabled일 때는 composing 상태 변경 안함
            onCompositionEnd={() => !disabled && setIsComposing(false)}
            rows={1}
            disabled={disabled}
            style={{
              opacity: disabled ? 0.6 : 1,
              cursor: disabled ? 'not-allowed' : 'text',
            }}
          />
          <SendButton
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            active={!!value.trim() && !disabled}
            style={{
              opacity: disabled ? 0.6 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <img src={sendIcon} alt="전송" />
          </SendButton>
        </MessageInputWrapper>
      </InputContainer>
    </Wrapper>
  );
};

export default MessageInput;
