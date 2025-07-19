import styled from '@emotion/styled';
import Reply from './Reply';
import SubReply from './SubReply';
import type { ReplyListProps } from '@/types/post';

const ReplyList = ({ commentList }: ReplyListProps) => {
  return (
    <Container>
      {commentList.map(comment => (
        <div className="comment-group" key={comment.commentId}>
          <Reply {...comment} />
          {comment.replyCommentList.map(sub => (
            <SubReply key={sub.replyCommentId} {...sub} />
          ))}
        </div>
      ))}
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
  gap: 24px;

  .comment-group {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export default ReplyList;
