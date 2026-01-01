import { Container, TabButton, ActiveIndicator } from './TabBar.styled';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const TabBar = ({ tabs, activeTab, onTabClick }: TabProps) => {
  // 현재 활성 탭의 인덱스 계산
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
      {/* 슬라이드 애니메이션 밑줄 */}
      <ActiveIndicator activeIndex={activeIndex} />
    </Container>
  );
};

export default TabBar;
