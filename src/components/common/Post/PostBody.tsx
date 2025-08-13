import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import BookInfoCard from '../../feed/BookInfoCard';
import type { PostBodyProps } from '@/types/post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const PostContent = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .content {
    height: auto;
    overflow: hidden;
    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-regular, 400);
    line-height: var(--string-lineheight-feedcontent_height20, 20px);
    cursor: pointer;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ hasImage }) => (hasImage ? 3 : 8)};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .imgContainer {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
      flex-shrink: 0; //고정사이즈
    }
  }
`;

const PostBody = ({
  bookTitle,
  isbn,
  bookAuthor,
  contentBody,
  feedId,
  contentUrls = [],
}: PostBodyProps) => {
  const navigate = useNavigate();
  const hasImage = contentUrls.length > 0;

  const handlePostClick = (feedId: number) => {
    // if (!isClickable) return;
    navigate(`/feed/${feedId}`);
    // API 연동시 경로 수정 필요
  };

  return (
    <Container>
      <BookInfoCard bookTitle={bookTitle} bookAuthor={bookAuthor} isbn={isbn} />
      <PostContent hasImage={hasImage} onClick={() => handlePostClick(feedId)}>
        <div className="content">{contentBody}</div>
        {hasImage && (
          <div className="imgContainer">
            {contentUrls.map((src: string, i: number) => (
              <img key={i} src={src} />
            ))}
          </div>
        )}
      </PostContent>
    </Container>
  );
};

export default PostBody;
