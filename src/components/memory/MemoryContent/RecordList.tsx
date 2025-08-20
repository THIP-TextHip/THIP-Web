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
      {records.map(record => {
        // 기록의 페이지 범위와 현재 읽기 진행도를 비교하여 블라인드 처리 여부 결정
        const shouldBlur = record.pageRange ? parseInt(record.pageRange) > readingProgress : false;
        
        return (
          <RecordItem
            key={record.id}
            record={record}
            shouldBlur={shouldBlur}
          />
        );
      })}
    </RecordListContainer>
  );
};

export default RecordList;
