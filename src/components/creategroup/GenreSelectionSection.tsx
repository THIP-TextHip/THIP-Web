import { semanticColors, typography } from '../../styles/global/global';
import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import { GenreButtonGroup, GenreButton } from './GenreSelectionSection.styled';

interface GenreSelectionSectionProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

const GenreSelectionSection = ({ selectedGenre, onGenreSelect }: GenreSelectionSectionProps) => {
  const genres = ['문학', '과학·IT', '사회과학', '인문학', '예술'];

  return (
    <Section>
      <SectionTitle>책 장르</SectionTitle>
      <GenreButtonGroup>
        {genres.map(genre => (
          <GenreButton
            key={genre}
            active={selectedGenre === genre}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </GenreButton>
        ))}
      </GenreButtonGroup>
      <div
        style={{
          color: semanticColors.text.point.green,
          fontSize: typography.fontSize.xs,
          marginTop: '12px',
          textAlign: 'right',
        }}
      >
        {selectedGenre ? '1개만 선택 가능합니다.' : '책을 가장 잘 설명하는 장르를 하나 골라주세요.'}
      </div>
    </Section>
  );
};

export default GenreSelectionSection;
