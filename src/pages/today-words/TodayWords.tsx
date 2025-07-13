import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import EmptyState from './components/EmptyState';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container, ContentArea } from './TodayWords.styled';
import type { Message } from './types';
import { dummyMessages } from './constants';

const TodayWords = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

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
            <MessageList messages={displayMessages} />
          )}
        </ContentArea>

        <MessageInput value={inputValue} onChange={setInputValue} onSend={handleSendMessage} />

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
