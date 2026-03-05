import { TabContainer, Tab } from './BookSearchBottomSheet.styled';

export type TabType = 'saved' | 'group';

interface BookSearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  showGroupTab?: boolean;
}

const BookSearchTabs = ({ activeTab, onTabChange, showGroupTab = true }: BookSearchTabsProps) => {
  return (
    <TabContainer>
      <Tab active={activeTab === 'saved'} onClick={() => onTabChange('saved')}>
        저장한 책
      </Tab>
      {showGroupTab && (
        <Tab active={activeTab === 'group'} onClick={() => onTabChange('group')}>
          모임 책
        </Tab>
      )}
    </TabContainer>
  );
};

export default BookSearchTabs;
