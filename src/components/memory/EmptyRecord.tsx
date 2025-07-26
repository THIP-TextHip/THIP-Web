import type { RecordType } from '../../pages/memory/Memory';
import { Container, MainMessage, SubMessage } from './EmptyRecord.styled';

interface EmptyRecordProps {
  type: RecordType;
  message: string;
}

const EmptyRecord = ({ type, message }: EmptyRecordProps) => {
  return (
    <Container>
      <MainMessage>아직 기록이 없어요.</MainMessage>
      <SubMessage>
        {type === 'group'
          ? '우리 모임의 첫번째 기록을 남겨보세요'
          : '나의 첫번째 기록을 남겨보세요'}
      </SubMessage>
    </Container>
  );
};

export default EmptyRecord;
