import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import EmptyState from '../../components/today-words/EmptyState';
import MessageList from '../../components/today-words/MessageList/MessageList';
import type { MessageListRef } from '../../components/today-words/MessageList/MessageList';
import MessageInput from '../../components/today-words/MessageInput';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container, ContentArea } from './TodayWords.styled';
import type { Message } from '../../types/today';
import { dummyMessages } from '../../constants/today-constants';

const TodayWords = () => {
  const navigate = useNavigate();
  const messageListRef = useRef<MessageListRef>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  // 개발용: 빈 상태와 글 있는 상태 토글
  const [showMessages, setShowMessages] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // 빈 상태에서 메시지를 보낼 때 실제 messages 상태를 업데이트
    if (!showMessages) {
      // 새 메시지 생성
      const now = new Date();
      const newMessage: Message = {
        id: Date.now().toString(),
        user: 'user.01',
        content: inputValue.trim(),
        timestamp: now
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\. /g, '.')
          .replace(/\.$/, ''),
        timeAgo: '방금 전',
        createdAt: now,
      };

      // 실제 messages 상태에 추가
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } else {
      // MessageList의 addMessage 함수 호출 (더미 데이터 상태일 때)
      if (messageListRef.current) {
        messageListRef.current.addMessage(inputValue.trim());
      }
    }

    setInputValue('');

    // 자동으로 스크롤을 아래로 이동
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  // MessageList에서 메시지가 삭제되었을 때 호출될 콜백
  const handleMessageDelete = (messageId: string) => {
    if (!showMessages) {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
    }
  };

  // 실제 메시지가 있으면 실제 메시지를, 더미 모드면 더미 메시지를 표시
  const displayMessages = showMessages ? dummyMessages : messages;

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
            <EmptyState />
          ) : (
            <MessageList
              ref={messageListRef}
              messages={displayMessages}
              onMessageDelete={handleMessageDelete}
              isRealTimeMode={!showMessages}
            />
          )}
        </ContentArea>

        <MessageInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          placeholder="메이트들과 간단한 인사를 나눠보세요!"
        />

        {/* 개발용 토글 버튼 */}
        <button
          onClick={() => {
            setShowMessages(!showMessages);
            // 더미 모드에서 실제 모드로 전환할 때 메시지 초기화
            if (showMessages) {
              setMessages([]);
            }
          }}
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
