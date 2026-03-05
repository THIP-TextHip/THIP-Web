import Skeleton from '../base/Skeleton';
import { Container, Title, TabContainer } from '@/components/search/RecentSearchTabs.styled';

const RecentSearchTabsSkeleton = () => {
  return (
    <Container>
      <Title>최근 검색어</Title>
      <TabContainer>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton.Box key={i} width={80} height={40} borderRadius={20} />
        ))}
      </TabContainer>
    </Container>
  );
};

export default RecentSearchTabsSkeleton;
