import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import tabDeleteIcon from '../../assets/searchBar/tabDelete.svg';
import { IconButton } from '../common/IconButton';

interface RecentSearchTabsProps {
  recentSearches: string[];
  handleDelete: (term: string) => void;
}

const RecentSearchTabs = ({ recentSearches, handleDelete }: RecentSearchTabsProps) => {
  return (
    <Container>
      <Title>최근 검색어</Title>
      <TabContainer>
        {recentSearches.map(recentSearch => (
          <Tab key={recentSearch}>
            <Text>{recentSearch}</Text>
            <IconButton src={tabDeleteIcon} onClick={() => handleDelete(recentSearch)} />
          </Tab>
        ))}
      </TabContainer>
    </Container>
  );
};

export default RecentSearchTabs;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 20px;
`;

const Title = styled.h2`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
`;

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Tab = styled.span`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${colors.grey[300]};
  border-radius: 20px;
  padding: 8px 12px;
`;

const Text = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
  line-height: 24px;
`;
