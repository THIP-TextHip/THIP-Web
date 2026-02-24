import { useCallback } from 'react';
import type { RefObject } from 'react';
import Reply from './Reply';
import SubReply from './SubReply';
import { getComments, type CommentData } from '@/api/comments/getComments';
import { useInifinieScroll } from '@/hooks/useInifinieScroll';
import LoadingSpinner from '../LoadingSpinner';
import { Container, EmptyState } from './ReplyList.styled';

interface ReplyListProps {
  commentList?: CommentData[];
  onReload?: () => void;
  postId?: number;
  postType?: 'FEED' | 'RECORD' | 'VOTE';
  reloadKey?: string;
  rootRef?: RefObject<HTMLElement | null>;
}

const ReplyList = ({
  commentList = [],
  onReload,
  postId,
  postType,
  reloadKey = '',
  rootRef,
}: ReplyListProps) => {
  const isInfiniteMode = Boolean(postId && postType);
  const commentFeed = useInifinieScroll<CommentData>({
    enabled: isInfiniteMode,
    reloadKey: `${postId ?? ''}-${postType ?? ''}-${reloadKey}`,
    fetchPage: async cursor => {
      if (!postId || !postType) {
        return { items: [], nextCursor: null, isLast: true };
      }

      const response = await getComments(postId, {
        postType,
        size: 20,
        cursor,
      });

      return {
        items: response.data.commentList,
        nextCursor: response.data.nextCursor || null,
        isLast: response.data.isLast,
      };
    },
    rootRef,
    rootMargin: '120px 0px',
    threshold: 0.1,
  });

  const list = isInfiniteMode ? commentFeed.items : commentList;
  const hasComments = list.length > 0;

  const handleReload = useCallback(() => {
    if (isInfiniteMode) {
      void commentFeed.reload();
      return;
    }
    onReload?.();
  }, [commentFeed, isInfiniteMode, onReload]);

  return (
    <Container>
      {isInfiniteMode && commentFeed.isLoading && list.length === 0 && (
        <LoadingSpinner size="small" fullHeight={false} />
      )}
      {hasComments ? (
        list.map((comment, commentIndex) => (
          <div className="comment-group" key={comment.commentId || `comment-${commentIndex}`}>
            <Reply {...comment} onDelete={handleReload} />
            {comment.replyList.map((sub, replyIndex) => (
              <SubReply
                key={sub.commentId || `reply-${comment.commentId || commentIndex}-${replyIndex}`}
                {...sub}
                onDelete={handleReload}
              />
            ))}
          </div>
        ))
      ) : (
        <EmptyState>
          <div className="title">아직 댓글이 없어요</div>
          <div className="sub-title">첫번째 댓글을 남겨보세요</div>
        </EmptyState>
      )}

      {isInfiniteMode && !commentFeed.isLast && <div ref={commentFeed.sentinelRef} style={{ height: 20 }} />}
      {isInfiniteMode && commentFeed.isLoadingMore && <LoadingSpinner size="small" fullHeight={false} />}
    </Container>
  );
};

export default ReplyList;
