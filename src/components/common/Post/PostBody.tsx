import styled from '@emotion/styled';
import { useRef, useEffect, useState } from 'react';
import BookInfoCard from '../../feed/BookInfoCard';
import type { PostBodyProps } from '@/types/post';
import lookmore from '../../../assets/feed/lookmore.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  cursor: pointer;
`;

const PostContent = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative; // lookmore.svg를 위한 relative 설정

  .content {
    height: auto;
    overflow: hidden;
    color: var(--color-text-secondary_grey00, #dadada);
    font-size: var(--string-size-medium01, 14px);
    font-weight: var(--string-weight-regular, 400);
    line-height: var(--string-lineheight-feedcontent_height20, 20px);
    cursor: pointer;
    white-space: pre-wrap; // 개행문자 유지
    /* word-wrap: break-word; // 긴 텍스트 줄바꿈 */

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ hasImage }) => (hasImage ? 4 : 8)};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lookmore-icon {
    position: absolute;
    bottom: 0px;
    right: 0px;
    /* width: 20px;
    height: 20px; */
    pointer-events: none; // 클릭 이벤트 방지
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow: hidden;
  img {
    width: 100px;
    height: 100px;
    flex-shrink: 0; //고정사이즈
    object-fit: cover;
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
  const hasImage = contentUrls.length > 0;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handlePostClick = (feedId: number) => {
    // 새 탭에서 피드 상세 페이지 열기
    window.open(`/feed/${feedId}`, '_blank');
  };

  // 말줄임 여부 감지
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
        {/* 말줄임이 될 때만 표시되는 lookmore 아이콘 */}
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
