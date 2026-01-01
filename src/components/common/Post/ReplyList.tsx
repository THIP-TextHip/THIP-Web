import Reply from './Reply';
import SubReply from './SubReply';
import type { CommentData } from '@/api/comments/getComments';
import { Container, EmptyState } from './ReplyList.styled';

interface ReplyListProps {
  commentList: CommentData[];
  onReload: () => void;
}

const ReplyList = ({ commentList, onReload }: ReplyListProps) => {
  const hasComments = commentList.length > 0;

  return (
    <Container>
      {hasComments ? (
        commentList.map((comment, commentIndex) => (
          <div className="comment-group" key={comment.commentId || `comment-${commentIndex}`}>
            <Reply {...comment} onDelete={onReload} />
            {comment.replyList.map((sub, replyIndex) => (
              <SubReply
                key={sub.commentId || `reply-${comment.commentId || commentIndex}-${replyIndex}`}
                {...sub}
                onDelete={onReload}
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
    </Container>
  );
};

export default ReplyList;
