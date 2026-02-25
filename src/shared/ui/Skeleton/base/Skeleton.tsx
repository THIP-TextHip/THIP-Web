import {
  SkeletonBase,
  SkeletonBox,
  SkeletonCircle,
  SkeletonTextWrapper,
  SkeletonTextLine,
} from './Skeleton.styled';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
  gap?: string | number;
  lastLineWidth?: string | number;
}

/**
 * 기본 스켈레톤 컴포넌트
 * @param width - 너비 (px 또는 문자열 단위)
 * @param height - 높이 (px 또는 문자열 단위)
 * @param borderRadius - 테두리 반경 (px 또는 문자열 단위)
 */
const Skeleton = ({ width, height, borderRadius, className }: SkeletonProps) => {
  return (
    <SkeletonBase width={width} height={height} borderRadius={borderRadius} className={className} />
  );
};

/**
 * 박스 형태 스켈레톤
 * @param width - 너비
 * @param height - 높이
 * @param borderRadius - 테두리 반경
 */
Skeleton.Box = ({ width, height, borderRadius, className }: SkeletonProps) => {
  return (
    <SkeletonBox width={width} height={height} borderRadius={borderRadius} className={className} />
  );
};

/**
 * 원형 스켈레톤 (프로필 이미지 등)
 * @param size - 원의 크기 (width, height 동일)
 */
Skeleton.Circle = ({ width = 40, className }: Omit<SkeletonProps, 'height' | 'borderRadius'>) => {
  return <SkeletonCircle width={width} height={width} className={className} />;
};

/**
 * 텍스트 라인 스켈레톤
 * @param lines - 텍스트 라인 개수
 * @param gap - 라인 사이 간격
 * @param width - 너비
 * @param height - 각 라인의 높이
 * @param lastLineWidth - 마지막 라인의 너비 (기본값: 70%)
 */
Skeleton.Text = ({
  lines = 1,
  gap = 8,
  width = '100%',
  height = 16,
  lastLineWidth = '70%',
  className,
}: SkeletonTextProps) => {
  if (lines <= 0) {
    return null;
  }

  if (lines === 1) {
    return <SkeletonTextLine width={width} height={height} className={className} />;
  }

  return (
    <SkeletonTextWrapper gap={gap} className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonTextLine
          key={index}
          width={index === lines - 1 ? lastLineWidth : width}
          height={height}
        />
      ))}
    </SkeletonTextWrapper>
  );
};

export default Skeleton;
