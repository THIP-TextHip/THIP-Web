import { useState } from 'react';
import styled from '@emotion/styled';
import BookInfoCard from './BookInfoCard';
import ImageViewer from '../common/Modal/ImageViewer';
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
    white-space: pre-wrap; // 개행문자 유지
    word-wrap: break-word; // 긴 텍스트 줄바꿈
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
      object-fit: cover; //비율 유지하며 이미지 채우기
      cursor: pointer;
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
    }
  }

  .borderBottom {
    width: 100%;
    height: 1px;
    background: var(--color-view-card-background-darkgrey-2, #282828);
  }
`;

interface FeedDetailPostBodyProps extends PostBodyProps {
  tags?: string[]; // API에 없지만 컴포넌트에서 사용
}

const FeedDetailPostBody = ({
  bookTitle,
  isbn,
  bookAuthor,
  contentBody,
  contentUrls = [],
  tags = [],
}: FeedDetailPostBodyProps) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const hasImage = contentUrls.length > 0;
  const hasTag = tags.length > 0;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  return (
    <Container>
      <BookInfoCard bookTitle={bookTitle} bookAuthor={bookAuthor} isbn={isbn} />
      <PostContent hasImage={hasImage}>
        <div className="content">{contentBody}</div>
        {hasImage && (
          <div className="imgContainer">
            {contentUrls.map((src: string, i: number) => (
              <img key={i} src={src} alt={`이미지 ${i + 1}`} onClick={() => handleImageClick(i)} />
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
      {isImageViewerOpen && (
        <ImageViewer
          images={contentUrls}
          initialIndex={selectedImageIndex}
          isOpen={isImageViewerOpen}
          onClose={handleCloseImageViewer}
        />
      )}
    </Container>
  );
};

export default FeedDetailPostBody;
