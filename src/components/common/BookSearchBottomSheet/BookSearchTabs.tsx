import { TabContainer, Tab } from './BookSearchBottomSheet.styled';

export type TabType = 'saved' | 'group';

interface BookSearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BookSearchTabs = ({ activeTab, onTabChange }: BookSearchTabsProps) => {
  return (
    <TabContainer>
      <Tab active={activeTab === 'saved'} onClick={() => onTabChange('saved')}>
        저장한 책
      </Tab>
      <Tab active={activeTab === 'group'} onClick={() => onTabChange('group')}>
        모임 책
      </Tab>
    </TabContainer>
  );
};

export default BookSearchTabs;
