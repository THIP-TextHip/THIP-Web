import tabDeleteIcon from '../../assets/searchBar/tabDelete.svg';
import { IconButton } from '../common/IconButton';
import { Container, Title, TabContainer, Tab, Text } from './RecentSearchTabs.styled';

interface RecentSearchTabsProps {
  recentSearches: string[];
  handleDelete: (term: string) => void;
  handleRecentSearchClick: (term: string) => void;
  isLoading?: boolean;
}

const RecentSearchTabs = ({
  recentSearches,
  handleDelete,
  handleRecentSearchClick,
  isLoading = false,
}: RecentSearchTabsProps) => {
  return (
    <Container>
      <Title>최근 검색어</Title>
      <TabContainer>
        {isLoading ? (
          <Text>최근 검색어를 불러오고 있습니다.</Text>
        ) : recentSearches.length === 0 ? (
          <Text>최근 검색어가 아직 없어요.</Text>
        ) : (
          recentSearches.map(recentSearch => (
            <Tab key={recentSearch}>
              <Text onClick={() => handleRecentSearchClick(recentSearch)}>{recentSearch}</Text>
              <IconButton src={tabDeleteIcon} onClick={() => handleDelete(recentSearch)} />
            </Tab>
          ))
        )}
      </TabContainer>
    </Container>
  );
};

export default RecentSearchTabs;
