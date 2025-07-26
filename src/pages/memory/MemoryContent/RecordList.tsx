import type { Record } from '../../../pages/memory/Memory';
import RecordItem from '../../../components/memory/RecordItem/RecordItem';
import { RecordListContainer } from './RecordList.styled';

interface RecordListProps {
  records: Record[];
  readingProgress: number;
}

const RecordList = ({ records, readingProgress }: RecordListProps) => {
  return (
    <RecordListContainer>
      {records.map(record => (
        <RecordItem
          key={record.id}
          record={record}
          shouldBlur={record.recordType === 'overall' && readingProgress < 80}
        />
      ))}
    </RecordListContainer>
  );
};

export default RecordList;
