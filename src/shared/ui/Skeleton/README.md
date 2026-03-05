# Skeleton UI 컴포넌트

로딩 상태를 나타내는 스켈레톤 UI 컴포넌트입니다. Shimmer 애니메이션을 포함하며, 다양한 형태로 조합하여 사용할 수 있습니다.

## 기본 사용법

```tsx
import Skeleton from '@/shared/ui/Skeleton';

// 기본 스켈레톤
<Skeleton width="100%" height={20} />

// 박스 형태
<Skeleton.Box width={200} height={100} borderRadius={8} />

// 원형 (프로필 이미지 등)
<Skeleton.Circle width={40} />

// 텍스트 라인
<Skeleton.Text lines={3} height={16} gap={8} />
```

## API

### Skeleton (기본)

| Props | Type | Default | Description |
|-------|------|---------|-------------|
| width | string \| number | '100%' | 너비 (px 또는 문자열) |
| height | string \| number | 20 | 높이 (px 또는 문자열) |
| borderRadius | string \| number | 4 | 테두리 반경 (px 또는 문자열) |
| className | string | - | 추가 스타일을 위한 클래스명 |

### Skeleton.Box

기본 Skeleton과 동일한 props 사용

### Skeleton.Circle

| Props | Type | Default | Description |
|-------|------|---------|-------------|
| width | string \| number | 40 | 원의 크기 (width, height 동일) |
| className | string | - | 추가 스타일을 위한 클래스명 |

### Skeleton.Text

| Props | Type | Default | Description |
|-------|------|---------|-------------|
| lines | number | 1 | 텍스트 라인 개수 |
| gap | string \| number | 8 | 라인 사이 간격 (px 또는 문자열) |
| width | string \| number | '100%' | 너비 |
| height | string \| number | 16 | 각 라인의 높이 |
| lastLineWidth | string \| number | '70%' | 마지막 라인의 너비 |
| className | string | - | 추가 스타일을 위한 클래스명 |

## 사용 예시

### 1. 피드 포스트 스켈레톤

```tsx
import Skeleton from '@/shared/ui/Skeleton';

const FeedPostSkeleton = () => {
  return (
    <div className="post-container">
      {/* 헤더: 프로필 이미지 + 사용자 이름 */}
      <div className="header">
        <Skeleton.Circle width={40} />
        <Skeleton.Text width="120px" height={16} />
      </div>

      {/* 본문 */}
      <Skeleton.Text lines={3} height={16} gap={8} />

      {/* 이미지 */}
      <Skeleton.Box width="100%" height="200px" borderRadius={8} />

      {/* 푸터 */}
      <div className="footer">
        <Skeleton.Box width={60} height={20} />
        <Skeleton.Box width={60} height={20} />
      </div>
    </div>
  );
};
```

### 2. 리스트 아이템 스켈레톤

```tsx
const ListItemSkeleton = () => {
  return (
    <div className="list-item">
      <Skeleton.Circle width={56} />
      <div className="content">
        <Skeleton.Text width="80%" height={18} />
        <Skeleton.Text width="60%" height={14} />
      </div>
    </div>
  );
};
```

### 3. 카드 스켈레톤

```tsx
const CardSkeleton = () => {
  return (
    <div className="card">
      <Skeleton.Box width="100%" height="150px" borderRadius={8} />
      <Skeleton.Text lines={2} height={16} gap={8} />
      <Skeleton.Box width="100px" height={32} borderRadius={16} />
    </div>
  );
};
```

### 4. 여러 개의 스켈레톤 표시

```tsx
const FeedListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <FeedPostSkeleton key={index} />
      ))}
    </>
  );
};
```

## 스타일 커스터마이징

styled-components를 사용하여 추가 스타일을 적용할 수 있습니다.

```tsx
import styled from '@emotion/styled';
import Skeleton from '@/shared/ui/Skeleton';

const CustomSkeleton = styled(Skeleton.Box)`
  margin: 20px 0;
  opacity: 0.6;
`;

// 사용
<CustomSkeleton width="100%" height={100} />
```

## 애니메이션

스켈레톤 컴포넌트는 자동으로 shimmer 애니메이션을 포함합니다.
- 애니메이션 지속 시간: 1.5초
- 부드러운 그라데이션 효과
- 다크 테마에 최적화된 색상

## 주의사항

- width, height에 숫자를 전달하면 자동으로 'px' 단위가 적용됩니다.
- 문자열 단위('%', 'rem', 'em' 등)를 사용하려면 문자열로 전달하세요.
- 예: `width={100}` → '100px', `width="100%"` → '100%'
