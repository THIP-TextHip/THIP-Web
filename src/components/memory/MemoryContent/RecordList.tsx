import type { Record } from '../../../types/memory';
import RecordItem from '../RecordItem/RecordItem';
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
