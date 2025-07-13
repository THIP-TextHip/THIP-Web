import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import leftarrow from '../../assets/common/leftArrow.svg';
import sendIcon from '../../assets/common/send.svg';
import moreIcon from '../../assets/common/more.svg';
import {
  Container,
  ContentArea,
  EmptyStateContainer,
  EmptyMessage,
  EmptySubMessage,
  MessageList,
  MessageItem,
  UserInfo,
  UserAvatar,
  UserName,
  TimeStamp,
  MessageContent,
  DateDivider,
  MoreButton,
  InputContainer,
  MessageInput,
  SendButton,
} from './TodayWords.styled';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  timeAgo: string;
}

// 더미 데이터
const dummyMessages: Message[] = [
  {
    id: '1',
    user: 'user.01',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '11시간 전',
  },
  {
    id: '2',
    user: 'user.01',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '11시간 전',
  },
  {
    id: '3',
    user: 'user.01',
    content: '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '12시간 전',
  },
  {
    id: '4',
    user: 'user.01',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '11시간 전',
  },
];

const TodayWords = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 개발용: 빈 상태와 글 있는 상태 토글
  const [showMessages, setShowMessages] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'user.01',
      content: inputValue.trim(),
      timestamp: new Date()
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '.')
        .replace('.', ''),
      timeAgo: '방금 전',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 자동으로 스크롤을 아래로 이동
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // 자동 높이 조절
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const displayMessages = showMessages ? dummyMessages : messages;

  // 날짜별로 메시지 그룹화
  const groupedMessages = displayMessages.reduce(
    (groups, message) => {
      const date = message.timestamp;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {} as Record<string, Message[]>,
  );

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="오늘의 한마디"
        onLeftClick={handleBackClick}
      />
      <Container>
        <ContentArea>
          {displayMessages.length === 0 ? (
            <EmptyStateContainer>
              <EmptyMessage>아직 대화가 없어요</EmptyMessage>
              <EmptySubMessage>첫번째 한마디를 남겨보세요!</EmptySubMessage>
            </EmptyStateContainer>
          ) : (
            <MessageList>
              {/* 상단 경계선 텍스트 */}
              <div
                style={{
                  color: '#888',
                  fontSize: '14px',
                  textAlign: 'center',
                  padding: '20px 0',
                  borderBottom: '1px dashed #3D3D3D',
                  marginBottom: '20px',
                }}
              >
                ⋯ ⋯ ⋯ ⋯ ⋯ 포함 글자 입력입니다. ⋯ ⋯ ⋯ ⋯ ⋯
              </div>

              {Object.entries(groupedMessages).map(([date, messagesInDate], groupIndex) => (
                <div key={date}>
                  {messagesInDate.map((message, index) => (
                    <MessageItem key={message.id}>
                      <UserInfo>
                        <UserAvatar />
                        <div>
                          <UserName>{message.user}</UserName>
                          <TimeStamp>{message.timeAgo}</TimeStamp>
                        </div>
                        <MoreButton>
                          <img src={moreIcon} alt="더보기" />
                        </MoreButton>
                      </UserInfo>
                      <MessageContent>{message.content}</MessageContent>
                    </MessageItem>
                  ))}

                  {/* 마지막 그룹이 아닐 때 날짜 구분선 표시 */}
                  {groupIndex < Object.keys(groupedMessages).length - 1 && (
                    <DateDivider>{date}</DateDivider>
                  )}
                </div>
              ))}
            </MessageList>
          )}
        </ContentArea>

        <InputContainer>
          <MessageInput
            ref={inputRef}
            placeholder="메이트들과 간단한 인사를 나눠보세요!"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            active={inputValue.trim() !== ''}
          >
            <img src={sendIcon} alt="전송" />
          </SendButton>
        </InputContainer>

        {/* 개발용 토글 버튼 */}
        <button
          onClick={() => setShowMessages(!showMessages)}
          style={{
            position: 'fixed',
            top: '200px',
            right: '20px',
            background: '#6868FF',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 1000,
          }}
        >
          {showMessages ? '빈 상태' : '글 있음'}
        </button>
      </Container>
    </>
  );
};

export default TodayWords;
