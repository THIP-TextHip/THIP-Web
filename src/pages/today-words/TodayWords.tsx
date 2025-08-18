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

  // 하루 5개 제한 관련
  const DAILY_LIMIT = 5;
  
  // 오늘 작성한 내 메시지 개수 계산
  const getTodayMyMessageCount = useCallback(() => {
    const today = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
    
    return messages.filter(message => 
      message.isWriter === true && message.timestamp === today
    ).length;
  }, [messages]);

  const todayMyMessageCount = getTodayMyMessageCount();


  const handleBackClick = () => {
    navigate(-1);
  };

  // API 데이터를 Message 타입으로 변환하는 함수
  const convertToMessage = (item: TodayCommentItem): Message => {
    // 네트워크 응답에서 postDate가 "1일 전" 형태의 문자열로 오는 것으로 보임
    // 따라서 postDate를 그대로 timeAgo로 사용
    const timeAgo = item.postDate || '방금 전';
    
    // createdAt은 현재 시간으로 설정 (정확한 시간이 필요하다면 다른 API 필드 사용)
    const createdAt = new Date();

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
  }, [roomId]);

  // 더 많은 메시지 로드
  const loadMoreMessages = useCallback(() => {
    if (!isLoadingMore && !isLast && nextCursor && roomId) {
      loadMessages(nextCursor);
    }
  }, [isLoadingMore, isLast, nextCursor, roomId]);

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    if (roomId && !hasInitiallyLoaded) {
      loadMessages(undefined, true);
    }
  }, [roomId, hasInitiallyLoaded]);

  // 무한 스크롤 처리
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      // 스크롤이 하단 근처에 도달했을 때 더 많은 데이터 로드
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoadingMore && !isLast && hasInitiallyLoaded) {
        loadMoreMessages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreMessages, isLoadingMore, isLast, hasInitiallyLoaded]);

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

    // 6개 작성 시도 시 토스트로 차단
    if (todayMyMessageCount >= DAILY_LIMIT) {
      openSnackbar({
        message: '오늘의 한마디는 하루에 다섯번까지 작성할 수 있어요',
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

        // 최신 목록 다시 불러오기 위해 상태 초기화
        setMessages([]);
        setNextCursor(null);
        setIsLast(false);
        setHasInitiallyLoaded(false);

        // 5개 도달 시 흰색 토스트, 아니면 일반 성공 메시지
        if (todayMyMessageCount + 1 >= DAILY_LIMIT) {
          openSnackbar({
            message: '오늘의 한마디는 하루에 다섯번까지 작성할 수 있어요',
            variant: 'top',
            onClose: () => {},
          });
        } else {
          openSnackbar({
            message: '오늘의 한마디가 작성되었습니다.',
            variant: 'top',
            onClose: () => {},
          });
        }

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

        if (axiosError.response?.data?.code === 400) {
          errorMessage = '오늘의 한마디는 하루에 다섯번까지 작성할 수 있어요';
        } else if (axiosError.response?.data?.code === 403) {
          errorMessage = '방 접근 권한이 없습니다.';
        } else if (axiosError.response?.data?.code === 404) {
          errorMessage = '존재하지 않는 방입니다.';
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
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
  }, [inputValue, roomId, isSubmitting, openSnackbar, todayMyMessageCount, DAILY_LIMIT]);




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
          ) : messages.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <MessageList
                ref={messageListRef}
                messages={messages}
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
          onSend={handleSendMessage}
          placeholder="메이트들과 간단한 인사를 나눠 보세요!"
          disabled={isSubmitting}
        />
      </Container>
    </>
  );
};

export default TodayWords;
