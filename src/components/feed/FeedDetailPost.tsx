import PostHeader from '@/components/common/Post/PostHeader';
import FeedDetailPostBody from './FeedDetailPostBody';
import PostFooter from '@/components/common/Post/PostFooter';
import type { FeedDetailData } from '@/api/feeds/getFeedDetail';
import { Container, BorderBottom } from './FeedDetailPost.styled';

interface FeedDetailPostProps extends FeedDetailData {
  isMyFeed?: boolean;
}

const FeedDetailPost = ({ isMyFeed, tagList, aliasColor, ...postData }: FeedDetailPostProps) => {
  return (
    <>
      <Container>
        <PostHeader {...postData} aliasColor={aliasColor} />
        <FeedDetailPostBody {...postData} tags={tagList} />
        <PostFooter isDetail={true} isMyFeed={!!isMyFeed} {...postData} />
      </Container>
      <BorderBottom />
    </>
  );
};

export default FeedDetailPost;
