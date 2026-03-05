import { useState } from 'react';
import BookInfoCard from './BookInfoCard';
import ImageViewer from '../common/Modal/ImageViewer';
import type { PostBodyProps } from '@/types/post';
import { Container, PostContent, TagContainer } from './FeedDetailPostBody.styled';

interface FeedDetailPostBodyProps extends PostBodyProps {
  tags?: string[];
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
