import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  padding-top: 56px;
  margin: 0 auto;
  background-color: #121212;
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  padding-bottom: 80px;
`;

export const CommentSkeletonItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  align-items: flex-start;
`;
