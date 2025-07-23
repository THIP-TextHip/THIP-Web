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

const TagContainer = styled.div`
  .tagList {
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding-bottom: 16px;
    overflow: hidden;

    .hashTag {
      width: auto;
      flex-shrink: 0;
      height: 30px;
      padding: 8px 12px;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      border: 1px solid var(--color-button-color_line-button_line_lightgrey01, #adadad);

      color: var(--color-white);
      font-size: var(--string-size-small03, 12px);
      font-weight: var(--string-weight-regular, 400);
      line-height: normal;
    }
  }

  .borderBottom {
    width: 100%;
    height: 1px;
    background: var(--color-view-card-background-darkgrey-2, #282828);
  }
`;

const PostBody = ({
  bookTitle,
  isbn,
  bookAuthor,
  postContent,
  feedId,
  images = [],
  tags = [],
}: PostBodyProps) => {
  const navigate = useNavigate();
  const hasImage = images.length > 0;
  const hasTag = tags.length > 0;

  const handlePostContent = () => {
    // if (!isClickable) return;
    navigate(`/feed/${feedId}`);
    // API 연동시 경로 수정 필요
  };

  return (
    <Container>
      <BookInfoCard bookTitle={bookTitle} bookAuthor={bookAuthor} isbn={isbn} />
      <PostContent hasImage={hasImage} onClick={handlePostContent}>
        <div className="content">{postContent}</div>
        {hasImage && (
          <div className="imgContainer">
            {images.map((src, i) => (
              <img key={i} src={src} />
            ))}
          </div>
        )}
        {hasTag && (
          <TagContainer>
            <div className="tagList">
              {tags?.map((tagName, t) => (
                <div key={t} className="hashTag">
                  {tagName}
                </div>
              ))}
            </div>
            <div className="borderBottom"></div>
          </TagContainer>
        )}
      </PostContent>
    </Container>
  );
};

export default PostBody;
