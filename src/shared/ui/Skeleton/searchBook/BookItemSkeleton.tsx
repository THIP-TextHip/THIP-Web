import Skeleton from '../base/Skeleton';
import { BookItem, Cover, BookInfo } from '@/components/search/BookSearchResult.styled';

const BookItemSkeleton = () => {
  return (
    <BookItem style={{ cursor: 'default', pointerEvents: 'none' }}>
      <Cover
        as="div"
        style={{
          background: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton.Box width={80} height={107} />
      </Cover>
      <BookInfo>
        <Skeleton.Text lines={2} height={16} gap={4} width="100%" lastLineWidth="60%" />
        <div style={{ marginTop: '8px' }}>
          <Skeleton.Text width={150} height={12} />
        </div>
      </BookInfo>
    </BookItem>
  );
};

export default BookItemSkeleton;
