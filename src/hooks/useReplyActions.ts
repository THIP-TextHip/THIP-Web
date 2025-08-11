import { useReplyStore } from '@/stores/useReplyStore';
import { postReply } from '@/api/comments/postReply';

interface SubmitCommentProps {
  postId: number;
  postType: 'FEED' | 'RECORD' | 'VOTE';
  onSuccess?: () => void;
}

export const useReplyActions = () => {
  const {
    isReplying,
    nickname,
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
      postType: postType.toUpperCase() as 'FEED' | 'RECORD' | 'VOTE',
    };

    try {
      console.log('댓글or답글 작성 API 요청');
      const response = await postReply(postId, requestBody);
      console.log('댓글 작성 성공:', response);
      if (onSuccess) onSuccess();
      clearReplyContent();
      cancelReply();
    } catch (error) {
      console.error('댓글/답글 작성 실패', error);
    }
  };

  return {
    isReplying,
    nickname,
    replyContent,
    startReply,
    cancelReply,
    setReplyContent,
    submitComment,
  };
};
