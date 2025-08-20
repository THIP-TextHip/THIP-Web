import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import { TextAreaBox, TextArea, CharacterCount } from './PostContentSection.styled';

interface PostContentSectionProps {
  content: string;
  onContentChange: (value: string) => void;
  readOnly?: boolean;
}

const PostContentSection = ({ content, onContentChange, readOnly = false }: PostContentSectionProps) => {
  const maxLength = 2000;

  return (
    <Section>
      <SectionTitle>글 작성</SectionTitle>
      <TextAreaBox>
        <TextArea
          placeholder="...한 생각이 들었어요. 🤔"
          value={content}
          onChange={e => onContentChange(e.target.value)}
          maxLength={maxLength}
          rows={4}
          readOnly={readOnly}
        />
        <CharacterCount>
          {content.length} / {maxLength}
        </CharacterCount>
      </TextAreaBox>
    </Section>
  );
};

export default PostContentSection;
