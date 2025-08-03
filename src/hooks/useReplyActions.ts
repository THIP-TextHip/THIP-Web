import { useReplyStore } from '@/stores/useReplyStore';
import axios from 'axios';

interface SubmitCommentProps {
  postId: number;
  postType: 'feed' | 'record' | 'vote';
  onSuccess?: () => void;
}
export const useReplyActions = () => {
  const {
    isReplying,
    targetUserName,
    parentId,
    replyContent,
    startReply,
    cancelReply,
    setReplyContent,
    clearReplyContent,
  } = useReplyStore();

  const submitComment = async ({ postId, postType, onSuccess }: SubmitCommentProps) => {
    const content = replyContent.trim();
    if (!content) return;

    const requestBody = {
      content,
      isReplyRequest: isReplying, // 답글 여부
      parentId: isReplying ? parentId : null, // 답글이라면 부모 댓글 ID 포함
      postType,
    };

    try {
      console.log('댓글or답글 작성 API 요청');
      await axios.post(`/comments/${postId}`, requestBody);
      if (onSuccess) onSuccess();
      clearReplyContent();
      cancelReply();
    } catch (error) {
      console.error('댓글/답글 작성 실패', error);
    }
  };

  return {
    isReplying,
    targetUserName,
    replyContent,
    startReply,
    cancelReply,
    setReplyContent,
    submitComment,
  };
};
