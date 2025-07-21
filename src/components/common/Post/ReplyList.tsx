import styled from '@emotion/styled';
import { typography, colors } from '@/styles/global/global';
import Reply from './Reply';
import SubReply from './SubReply';
import type { ReplyListProps } from '@/types/post';

const ReplyList = ({ commentList }: ReplyListProps) => {
  const hasComments = commentList.length > 0;

  return (
    <Container>
      {hasComments ? (
        commentList.map(comment => (
          <div className="comment-group" key={comment.commentId}>
            <Reply {...comment} />
            {comment.replyCommentList.map(sub => (
              <SubReply key={sub.replyCommentId} {...sub} />
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 360px;
  max-width: 540px;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 56px;
  gap: 24px;
  flex: 1;

  .comment-group {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 360px;
  max-width: 540px;
  padding: 40px 20px;
  margin: 0 auto;
  margin-bottom: 56px;
  gap: 8px;
  flex: 1;

  .title {
    color: ${colors.white};
    text-align: center;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.semibold};
    line-height: 24px;
  }

  .sub-title {
    color: ${colors.grey[100]};
    text-align: center;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: normal;
  }
`;

export default ReplyList;
