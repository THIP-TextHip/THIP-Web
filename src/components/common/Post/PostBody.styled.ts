import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  cursor: pointer;
`;

export const PostContent = styled.div<{ hasImage: boolean }>`
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

export const ImageContainer = styled.div`
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
