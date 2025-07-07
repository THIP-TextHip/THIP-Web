import styled from '@emotion/styled';
import rightArrow from '../../assets/common/rightArrow.svg';
import { useNavigate } from 'react-router-dom';

const Container = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  .book {
    display: flex;
    height: 44px;
    padding: 8px 4px 8px 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--number-radius-button, 12px);
    background: var(--color-button-color_fill-button_fill_tertiary01_darkgrey, #3d3d3d);

    .left {
      overflow: hidden;
      max-width: 340px;
      white-space: nowrap;
      color: var(--color-white);
      text-overflow: ellipsis;
      font-size: var(--string-size-medium02, 16px);
      font-weight: var(--string-weight-semibold, 600);
      line-height: var(--string-lineheight-height24, 24px);
    }

    .right {
      display: flex;
      flex-direction: row;
      gap: 4px;
      overflow: hidden;
      color: var(--color-text-secondary_grey00, #dadada);
      text-align: right;
      text-overflow: ellipsis;
      font-size: var(--string-size-small03, 12px);
      font-style: normal;
      font-weight: var(--string-weight-regular, 400);
      line-height: var(--string-lineheight-height24, 24px);

      .name {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--color-text-secondary_grey00, #dadada);
        font-size: var(--string-size-small03, 12px);
        font-weight: var(--string-weight-regular, 400);
        line-height: var(--string-lineheight-height24, 24px);
      }
    }
  }

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

  .tagContainer {
    display: flex;
    flex-direction: row;
    gap: 8px;
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

interface PostBodyProps {
  bookTitle: string;
  bookAuthor: string;
  postContent: string;
  postId: string;
  images?: string[];
  tags?: string[];
}

const PostBody = ({
  bookTitle,
  bookAuthor,
  postContent,
  postId,
  images = [],
  tags = [],
}: PostBodyProps) => {
  const navigate = useNavigate();
  const hasImage = images.length > 0;
  const hasTag = tags.length > 0;

  const handlePostContent = () => {
    navigate(`/feed/${postId}`);
    // API 연동시 경로 수정 필요
  };

  return (
    <Container hasImage={hasImage}>
      <div className="book">
        <div className="left">{bookTitle}</div>
        <div className="right">
          <div className="name">{bookAuthor}</div>
          <div className="author">저</div>
          <img src={rightArrow} />
        </div>
      </div>
      <div className="content" onClick={handlePostContent}>
        {postContent}
      </div>
      {hasImage && (
        <div className="imgContainer">
          {images.map((src, i) => (
            <img key={i} src={src} />
          ))}
        </div>
      )}
      {hasTag && (
        <>
          <div className="tagContainer">
            {tags?.map((tagName, t) => (
              <div key={t} className="hashTag">
                {tagName}
              </div>
            ))}
          </div>
          <div className="borderBottom"></div>
        </>
      )}
    </Container>
  );
};

export default PostBody;
