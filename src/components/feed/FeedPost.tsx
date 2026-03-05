import PostBody from '../common/Post/PostBody';
import PostFooter from '../common/Post/PostFooter';
import PostHeader from '../common/Post/PostHeader';
import type { FeedPostProps } from '../../types/post';
import { Container, BorderBottom } from './FeedPost.styled';

const FeedPost = ({ showHeader, isLast, isMyFeed, onSaveToggle, ...postData }: FeedPostProps) => {
  return (
    <>
      <Container>
        {showHeader && <PostHeader {...postData} />}
        <PostBody {...postData} />
        <PostFooter isMyFeed={!!isMyFeed} onSaveToggle={onSaveToggle} {...postData} />
      </Container>
      {!isLast && <BorderBottom />}
    </>
  );
};

export default FeedPost;
