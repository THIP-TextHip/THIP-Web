import type { Record } from '../../../types/memory';
import RecordItem from '../RecordItem/RecordItem';
import { RecordListContainer } from './RecordList.styled';

interface RecordListProps {
  records: Record[];
  onDelete?: (id: string) => void;
}

const RecordList = ({ records, onDelete }: RecordListProps) => {
  return (
    <RecordListContainer>
      {records.map(record => (
        <RecordItem key={record.id} record={record} shouldBlur={record.isLocked} onDelete={onDelete} />
      ))}
    </RecordListContainer>
  );
};

export default RecordList;
