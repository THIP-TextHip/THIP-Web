import {
  Section,
  SectionTitle,
  TextAreaBox,
  TextArea,
  CharacterCount,
} from './RecordContentSection.styled';

interface RecordContentSectionProps {
  content: string;
  onContentChange: (value: string) => void;
}

const RecordContentSection = ({ content, onContentChange }: RecordContentSectionProps) => {
  const maxLength = 500;

  return (
    <Section>
      <SectionTitle>지금 읽은 그 부분, 어땠나요?</SectionTitle>
      <TextAreaBox>
        <TextArea
          placeholder="...한 생각이 들었어요. 🤔"
          value={content}
          onChange={e => onContentChange(e.target.value)}
          maxLength={maxLength}
          rows={8}
        />
        <CharacterCount>
          {content.length} / {maxLength}
        </CharacterCount>
      </TextAreaBox>
    </Section>
  );
};

export default RecordContentSection;
