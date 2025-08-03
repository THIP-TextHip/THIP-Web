import type { RecordType } from '../../pages/memory/Memory';
import { Container, TabButton } from './RecordTabs.styled';

interface RecordTabsProps {
  activeTab: RecordType;
  onTabChange: (tab: RecordType) => void;
}

const RecordTabs = ({ activeTab, onTabChange }: RecordTabsProps) => {
  return (
    <Container>
      <TabButton active={activeTab === 'group'} onClick={() => onTabChange('group')}>
        그룹 기록
      </TabButton>
      <TabButton active={activeTab === 'my'} onClick={() => onTabChange('my')}>
        내 기록
      </TabButton>
    </Container>
  );
};

export default RecordTabs;
