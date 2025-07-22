import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import { GenreButtonGroup, GenreButton } from '../creategroup/GenreSelectionSection.styled';

interface TagSelectionSectionProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const availableTags = ['문학', '과학·IT', '사회과학', '인문학', '예술'];

const TagSelectionSection = ({ selectedTags, onTagToggle }: TagSelectionSectionProps) => {
  return (
    <Section>
      <SectionTitle>태그</SectionTitle>
      <GenreButtonGroup>
        {availableTags.map(tag => (
          <GenreButton
            key={tag}
            active={selectedTags.includes(tag)}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </GenreButton>
        ))}
      </GenreButtonGroup>
    </Section>
  );
};

export default TagSelectionSection;
