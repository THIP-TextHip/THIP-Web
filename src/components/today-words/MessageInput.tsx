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
  targetUserName?: string;
  onCancelReply?: () => void;
}

const MessageInput = ({
  placeholder,
  value,
  onChange,
  onSend,
  isReplying = false,
  targetUserName,
  onCancelReply,
}: MessageInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!value.trim()) return;
    onSend();
    onChange('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Wrapper>
      {/* 답글 작성 중일 때만 표시 */}
      {isReplying && targetUserName && (
        <ReplyContainer>
          <div className="left">
            <img src={replyIcon} alt="답글 아이콘" />
            <div className="notice">
              <div className="userName">@{targetUserName}</div>
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
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            rows={1}
          />
          <SendButton onClick={handleSend} disabled={!value.trim()} active={!!value.trim()}>
            <img src={sendIcon} alt="전송" />
          </SendButton>
        </MessageInputWrapper>
      </InputContainer>
    </Wrapper>
  );
};

export default MessageInput;
