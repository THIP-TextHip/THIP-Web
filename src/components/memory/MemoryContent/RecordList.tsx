import type { Record } from '../../../types/memory';
import RecordItem from '../RecordItem/RecordItem';
import { RecordListContainer } from './RecordList.styled';

interface RecordListProps {
  records: Record[];
}

const RecordList = ({ records }: RecordListProps) => {
  return (
    <RecordListContainer>
      {records.map(record => (
        <RecordItem key={record.id} record={record} shouldBlur={record.isLocked} />
      ))}
    </RecordListContainer>
  );
};

export default RecordList;
