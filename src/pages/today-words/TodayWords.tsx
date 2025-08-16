import { useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import EmptyState from '../../components/today-words/EmptyState';
import MessageList from '../../components/today-words/MessageList/MessageList';
import type { MessageListRef } from '../../components/today-words/MessageList/MessageList';
import MessageInput from '../../components/today-words/MessageInput';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container, ContentArea } from './TodayWords.styled';
import type { Message } from '../../types/today';
import { dummyMessages } from '../../constants/today-constants';
import { createDailyGreeting } from '../../api/rooms/createDailyGreeting';
import { usePopupActions } from '../../hooks/usePopupActions';

const TodayWords = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const messageListRef = useRef<MessageListRef>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openSnackbar } = usePopupActions();

  // 개발용: 빈 상태와 글 있는 상태 토글
  const [showMessages, setShowMessages] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '' || isSubmitting) return;

    // roomId가 없으면 에러 처리
    if (!roomId) {
      openSnackbar({
        message: '방 정보를 찾을 수 없습니다.',
        variant: 'top',
        onClose: () => {},
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출 - 오늘의 한마디 작성
      const response = await createDailyGreeting(parseInt(roomId), inputValue.trim());

      if (response.isSuccess) {
        // 성공 시 새 메시지 생성
        const now = new Date();
        const newMessage: Message = {
          id: response.data.attendanceCheckId.toString(),
          user: 'user.01', // TODO: 실제 사용자 정보로 변경
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

        // 입력 필드 초기화
        setInputValue('');

        // 성공 메시지 표시
        openSnackbar({
          message: '오늘의 한마디가 작성되었습니다.',
          variant: 'top',
          onClose: () => {},
        });

        // 자동으로 스크롤을 아래로 이동
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      } else {
        // API 에러 응답 처리
        openSnackbar({
          message: response.message || '오늘의 한마디 작성에 실패했습니다.',
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('오늘의 한마디 작성 오류:', error);

      // 에러 타입에 따른 메시지 처리
      let errorMessage = '오늘의 한마디 작성 중 오류가 발생했습니다.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              code?: number;
            };
          };
        };

        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.code === 400) {
          errorMessage = '오늘의 한마디 작성 가능 횟수를 초과했습니다.';
        } else if (axiosError.response?.data?.code === 403) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (axiosError.response?.data?.code === 404) {
          errorMessage = '존재하지 않는 방입니다.';
        }
      }

      openSnackbar({
        message: errorMessage,
        variant: 'top',
        onClose: () => {},
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [inputValue, roomId, isSubmitting, openSnackbar]);

  // 더미 모드에서 메시지 전송 처리 (개발용)
  const handleDummySendMessage = useCallback(() => {
    if (inputValue.trim() === '') return;

    if (messageListRef.current) {
      messageListRef.current.addMessage(inputValue.trim());
    }
    setInputValue('');

    // 자동으로 스크롤을 아래로 이동
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, [inputValue]);

  // 최종 메시지 전송 핸들러
  const finalHandleSendMessage = showMessages ? handleDummySendMessage : handleSendMessage;

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
          onSend={finalHandleSendMessage}
          placeholder="메이트들과 간단한 인사를 나눠 보세요!"
          disabled={isSubmitting}
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
