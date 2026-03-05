import { Container, TabButton, ActiveIndicator } from './TabBar.styled';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const TabBar = ({ tabs, activeTab, onTabClick }: TabProps) => {
  const activeIndex = tabs.findIndex(tab => tab === activeTab);

  return (
    <Container>
      {tabs.map(tab => (
        <TabButton
          key={tab}
          className={activeTab === tab ? 'active' : 'inactive'}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </TabButton>
      ))}
      <ActiveIndicator activeIndex={activeIndex} />
    </Container>
  );
};

export default TabBar;
