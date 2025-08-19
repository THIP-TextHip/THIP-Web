import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import MessageInput from '@/components/today-words/MessageInput';
import ReplyList from '@/components/common/Post/ReplyList';
import { getComments, type CommentData } from '@/api/comments/getComments';
import { useReplyActions } from '@/hooks/useReplyActions';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postType: 'RECORD' | 'VOTE';
}

const CommentModal = ({ isOpen, onClose, postId, postType }: CommentModalProps) => {
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

  // 모달이 열릴 때 댓글 로드
  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, postId, loadComments]);

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
      cancelReply();
      setCommentList([]);
    }
  }, [isOpen, cancelReply]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Header>
          <Title>댓글</Title>
        </Header>

        <Content>
          {isLoading ? (
            <LoadingState>댓글을 불러오는 중...</LoadingState>
          ) : (
            <ReplyList commentList={commentList} onReload={loadComments} />
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
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 540px;
  min-width: 360px;
  margin: 0 auto;
  background: ${colors.grey[400]};
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  min-height: 50vh;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${colors.grey[200]};
  flex-shrink: 0;
`;

const Title = styled.h2`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  margin: 0;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

const InputSection = styled.div`
  padding: 20px;
  border-top: 1px solid ${colors.grey[400]};
  flex-shrink: 0;
`;

export default CommentModal;
