import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import EmptyState from '../../components/today-words/EmptyState';
import MessageList from '../../components/today-words/MessageList/MessageList';
import type { MessageListRef } from '../../components/today-words/MessageList/MessageList';
import MessageInput from '../../components/today-words/MessageInput';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import leftarrow from '../../assets/common/leftArrow.svg';
import { Container, ContentArea } from './TodayWords.styled';
import type { Message, TodayCommentItem } from '../../types/today';
import { dummyMessages } from '../../constants/today-constants';
import { createDailyGreeting } from '../../api/rooms/createDailyGreeting';
import { getDailyGreeting } from '../../api/rooms/getDailyGreeting';
import { usePopupActions } from '../../hooks/usePopupActions';

const TodayWords = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const messageListRef = useRef<MessageListRef>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const { openSnackbar } = usePopupActions();

  // 개발용: 빈 상태와 글 있는 상태 토글
  const [showMessages, setShowMessages] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  // API 데이터를 Message 타입으로 변환하는 함수
  const convertToMessage = (item: TodayCommentItem): Message => {
    const createdAt = new Date(item.postDate);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
    
    let timeAgo: string;
    if (diffInMinutes < 1) {
      timeAgo = '방금 전';
    } else if (diffInMinutes < 60) {
      timeAgo = `${diffInMinutes}분 전`;
    } else if (diffInMinutes < 1440) {
      timeAgo = `${Math.floor(diffInMinutes / 60)}시간 전`;
    } else {
      timeAgo = `${Math.floor(diffInMinutes / 1440)}일 전`;
    }

    return {
      id: item.attendanceCheckId.toString(),
      user: item.creatorNickname,
      content: item.todayComment,
      timestamp: item.date,
      timeAgo,
      createdAt,
      profileImageUrl: item.creatorProfileImageUrl,
      isWriter: item.isWriter,
    };
  };

  // 오늘의 한마디 목록 조회
  const loadMessages = useCallback(async (cursor?: string, isRefresh = false) => {
    if (!roomId) return;

    try {
      if (isRefresh) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const response = await getDailyGreeting({
        roomId: parseInt(roomId),
        cursor: cursor || undefined,
      });

      if (response.isSuccess) {
        const newMessages = response.data.todayCommentList.map(convertToMessage);
        
        if (isRefresh) {
          setMessages(newMessages);
        } else {
          setMessages(prev => [...prev, ...newMessages]);
        }
        
        setNextCursor(response.data.nextCursor);
        setIsLast(response.data.isLast);
        setHasInitiallyLoaded(true);
      } else {
        openSnackbar({
          message: response.message || '오늘의 한마디 목록을 불러오는데 실패했습니다.',
          variant: 'top',
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error('오늘의 한마디 목록 조회 오류:', error);
      
      let errorMessage = '오늘의 한마디 목록을 불러오는 중 오류가 발생했습니다.';
      
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
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [roomId, openSnackbar]);

  // 더 많은 메시지 로드
  const loadMoreMessages = useCallback(() => {
    if (!isLoadingMore && !isLast && nextCursor) {
      loadMessages(nextCursor);
    }
  }, [loadMessages, isLoadingMore, isLast, nextCursor]);

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    if (!showMessages) {
      loadMessages(undefined, true);
    }
  }, [loadMessages, showMessages]);

  // 무한 스크롤 처리
  useEffect(() => {
    const handleScroll = () => {
      if (showMessages) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      // 스크롤이 하단 근처에 도달했을 때 더 많은 데이터 로드
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoadingMore && !isLast && hasInitiallyLoaded) {
        loadMoreMessages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreMessages, isLoadingMore, isLast, hasInitiallyLoaded, showMessages]);

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
        // 입력 필드 초기화
        setInputValue('');

        // 성공 메시지 표시
        openSnackbar({
          message: '오늘의 한마디가 작성되었습니다.',
          variant: 'top',
          onClose: () => {},
        });

        // 최신 목록 다시 불러오기
        await loadMessages(undefined, true);

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
  
  // 새로 고침 함수
  const handleRefresh = useCallback(() => {
    if (!showMessages) {
      setMessages([]);
      setNextCursor(null);
      setIsLast(false);
      setHasInitiallyLoaded(false);
      loadMessages(undefined, true);
    }
  }, [loadMessages, showMessages]);

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="오늘의 한마디"
        onLeftClick={handleBackClick}
      />
      <Container>
        <ContentArea>
          {isLoading && !hasInitiallyLoaded ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <LoadingSpinner />
            </div>
          ) : displayMessages.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <MessageList
                ref={messageListRef}
                messages={displayMessages}
                onMessageDelete={handleMessageDelete}
                isRealTimeMode={!showMessages}
              />
              {isLoadingMore && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <LoadingSpinner />
                </div>
              )}
            </>
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
            // 더미 모드에서 실제 모드로 전환할 때 새로고침
            if (showMessages) {
              handleRefresh();
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
          {showMessages ? '실제 데이터' : '더미 데이터'}
        </button>
        
        {/* 새로고침 버튼 (실제 모드에서만) */}
        {!showMessages && (
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            style={{
              position: 'fixed',
              top: '250px',
              right: '20px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '12px',
              zIndex: 1000,
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            새로고침
          </button>
        )}
      </Container>
    </>
  );
};

export default TodayWords;
