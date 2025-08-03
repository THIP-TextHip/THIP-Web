import { TextContent } from './TextRecord.styled';

interface TextRecordProps {
  content: string;
}

const TextRecord = ({ content }: TextRecordProps) => {
  return <TextContent>{content}</TextContent>;
};

export default TextRecord;
