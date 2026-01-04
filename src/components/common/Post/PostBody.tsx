import { useRef, useEffect, useState } from 'react';
import BookInfoCard from '../../feed/BookInfoCard';
import type { PostBodyProps } from '@/types/post';
import lookmore from '../../../assets/feed/lookmore.svg';
import { Container, PostContent, ImageContainer } from './PostBody.styled';

const PostBody = ({
  bookTitle,
  isbn,
  bookAuthor,
  contentBody,
  feedId,
  contentUrls = [],
}: PostBodyProps) => {
  const hasImage = contentUrls.length > 0;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handlePostClick = (feedId: number) => {
    // 새 탭에서 피드 상세 페이지 열기
    window.open(`/feed/${feedId}`, '_blank');
  };

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setIsTruncated(isOverflowing);
    }
  }, [contentBody]);

  return (
    <Container onClick={() => handlePostClick(feedId)}>
      <div onClick={e => e.stopPropagation()}>
        <BookInfoCard bookTitle={bookTitle} bookAuthor={bookAuthor} isbn={isbn} />
      </div>
      <PostContent hasImage={hasImage}>
        <div className="content" ref={contentRef}>
          {contentBody}
        </div>
        {isTruncated && <img src={lookmore} alt="더보기" className="lookmore-icon" />}
      </PostContent>
      <ImageContainer>
        {hasImage && (
          <>
            {contentUrls.map((src: string, i: number) => (
              <img key={i} src={src} />
            ))}
          </>
        )}
      </ImageContainer>
    </Container>
  );
};

export default PostBody;
