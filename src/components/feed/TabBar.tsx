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
  padding: 8px 4px;
  font-size: var(--font-size-lg);

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
  activeTab: '피드' | '내 피드';
  onTabClick: (tab: '피드' | '내 피드') => void;
}

const TabBar = ({ activeTab, onTabClick }: TabProps) => {
  return (
    <Container>
      <TabButton
        className={activeTab === '피드' ? 'active' : 'inactive'}
        onClick={() => onTabClick('피드')}
      >
        피드
      </TabButton>
      <TabButton
        className={activeTab === '내 피드' ? 'active' : 'inactive'}
        onClick={() => onTabClick('내 피드')}
      >
        내 피드
      </TabButton>
    </Container>
  );
};

export default TabBar;
