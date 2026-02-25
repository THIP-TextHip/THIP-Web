import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '@/styles/global/global';

// Shimmer 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

interface SkeletonBaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

// 기본 스켈레톤 스타일
export const SkeletonBase = styled.div<SkeletonBaseProps>`
  display: inline-block;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width || '100%')};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height || '20px')};
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius || '4px'};
  background: linear-gradient(
    90deg,
    ${colors.darkgrey.main} 0%,
    ${colors.grey[400]} 50%,
    ${colors.darkgrey.main} 100%
  );
  background-size: 468px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

// 박스 스켈레톤
export const SkeletonBox = styled(SkeletonBase)``;

// 원형 스켈레톤
export const SkeletonCircle = styled(SkeletonBase)`
  border-radius: 50%;
`;

// 텍스트 라인 스켈레톤
export const SkeletonTextWrapper = styled.div<{ gap?: string | number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (typeof gap === 'number' ? `${gap}px` : gap || '8px')};
  width: 100%;
`;

export const SkeletonTextLine = styled(SkeletonBase)`
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height || '16px')};
  border-radius: 4px;
`;
