import styled from '@emotion/styled';

export const SkeletonContainer = styled.div<{ paddingTop?: number }>`
  /* padding-top: ${({ paddingTop }) => (paddingTop !== undefined ? `${paddingTop}px` : '56px')}; */
  background-color: var(--color-black-main);
  min-height: 100vh;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 12px;
`;

export const PostFooter = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
`;
