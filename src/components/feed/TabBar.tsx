import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin: 0 auto;

  min-width: 320px;
  max-width: 767px;
  gap: 20px;
  padding: 88px 20px 0 20px;
  background-color: var(--color-black-main);
`;

const TabButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60px;
  padding: 8px 4px;
  font-size: var(--font-size-lg);
  cursor: pointer;

  &.active {
    color: var(--color-white);
    border-bottom: 2px solid var(--color-white);
    font-weight: var(--font-weight-semibold);
    line-height: 24px;
  }
  &.inactive {
    color: var(--color-grey-300);
    border-bottom: 2px solid transparent;
    font-weight: var(--font-weight-medium);
    line-height: 24px;
  }
`;

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const TabBar = ({ tabs, activeTab, onTabClick }: TabProps) => {
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
    </Container>
  );
};

export default TabBar;
