import { useState, useEffect, useCallback } from 'react';
import MessageInput from '@/components/today-words/MessageInput';
import ReplyList from '@/components/common/Post/ReplyList';
import { getComments, type CommentData } from '@/api/comments/getComments';
import { useReplyActions } from '@/hooks/useReplyActions';
import {
  Overlay,
  BottomSheet,
  Header,
  Title,
  Content,
  LoadingState,
  InputSection,
} from './CommentBottomSheet.styled';

interface CommentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postType: 'RECORD' | 'VOTE';
}

const CommentBottomSheet = ({ isOpen, onClose, postId, postType }: CommentBottomSheetProps) => {
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const { nickname, isReplying, cancelReply, setReplyContent, submitComment } = useReplyActions();

  // 댓글 목록 로드
  const loadComments = useCallback(async () => {
    if (!isOpen) return;

    setIsLoading(true);
    try {
      const response = await getComments(postId, {
        postType,
        size: 20,
      });

      if (response.data) {
        setCommentList(response.data.commentList);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, postId, postType]);

  // 댓글 전송
  const handleSendComment = async () => {
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    try {
      // useReplyActions의 replyContent를 현재 inputValue로 설정
      setReplyContent(inputValue.trim());
      
      // submitComment 사용
      await submitComment({
        postId,
        postType,
        onSuccess: async () => {
          setInputValue('');
          // 댓글 목록 새로고침
          await loadComments();
        }
      });
    } catch (error) {
      console.error('댓글 전송 실패:', error);
    } finally {
      setIsSending(false);
    }
  };

  // 답글 취소
  const handleCancelReply = () => {
    cancelReply();
  };

  // Overlay 클릭 처리
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 바텀시트가 열릴 때 댓글 로드
  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, postId, loadComments]);

  // 바텀시트가 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
      cancelReply();
      setCommentList([]);
    }
  }, [isOpen, cancelReply]);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <BottomSheet isOpen={isOpen}>
        <Header>
          <Title>댓글</Title>
        </Header>
        
        <Content>
          {isLoading ? (
            <LoadingState>댓글을 불러오는 중...</LoadingState>
          ) : (
            <ReplyList 
              commentList={commentList} 
              onReload={loadComments}
            />
          )}
        </Content>

        <InputSection>
          <MessageInput
            placeholder={
              isReplying ? `@${nickname}님에게 답글을 남겨보세요` : '댓글을 남겨보세요'
            }
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendComment}
            isReplying={isReplying}
            onCancelReply={handleCancelReply}
            nickname={nickname}
            disabled={isSending}
          />
        </InputSection>
      </BottomSheet>
    </Overlay>
  );
};

export default CommentBottomSheet;