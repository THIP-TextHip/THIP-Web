import { useRef, useEffect } from 'react';
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
  autoFocus?: boolean;
}

const RecordContentSection = ({
  content,
  onContentChange,
  autoFocus = false,
}: RecordContentSectionProps) => {
  const maxLength = 500;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  useEffect(() => {
    adjustHeight();

    if (autoFocus && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  return (
    <Section>
      <SectionTitle>지금 읽은 그 부분, 어땠나요?</SectionTitle>
      <TextAreaBox>
        <TextArea
          ref={textareaRef}
          placeholder="...한 생각이 들었어요. 🤔"
          value={content}
          onChange={handleChange}
          maxLength={maxLength}
          rows={1}
        />
        <CharacterCount>
          {content.length} / {maxLength}
        </CharacterCount>
      </TextAreaBox>
    </Section>
  );
};

export default RecordContentSection;
