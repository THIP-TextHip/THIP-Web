import { useState } from 'react';
import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import {
  TagContainer,
  GenreButtonGroup,
  GenreButton,
  SubTagGrid,
  SubTagButton,
  SelectedTagsSection,
  SelectedTagsTitle,
  SelectedTagList,
  SelectedTagItem,
  TagCount,
} from './TagSelectionSection.styled';
import closeIcon from '../../assets/post/close.svg';

interface TagSelectionSectionProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

// 상위 장르와 하위 태그 매핑
const genreTagsMap = {
  문학: ['소설', '시', '에세이', '인문학', '철학'],
  '과학·IT': ['기술', '과학', 'AI', '데이터'],
  사회과학: ['정치', '경제', '사회학', '심리학', '역사'],
  인문학: ['철학', '역사', '문화', '언어학', '종교'],
  예술: ['미술', '음악', '영화', '디자인', '사진'],
};

const availableGenres = Object.keys(genreTagsMap);

const TagSelectionSection = ({ selectedTags, onTagToggle }: TagSelectionSectionProps) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('문학');

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleTagToggle = (tag: string) => {
    // 이미 선택된 태그면 해제
    if (selectedTags.includes(tag)) {
      onTagToggle(tag);
      return;
    }

    // 5개 미만이면 추가 가능
    if (selectedTags.length < 5) {
      onTagToggle(tag);
    }
  };

  const handleSelectedTagRemove = (tag: string) => {
    onTagToggle(tag);
  };

  const currentSubTags = genreTagsMap[selectedGenre] || [];

  return (
    <Section>
      <SectionTitle>태그</SectionTitle>
      <TagContainer>
        {/* 상위 장르 선택 */}
        <GenreButtonGroup>
          {availableGenres.map(genre => (
            <GenreButton
              key={genre}
              active={selectedGenre === genre}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre}
            </GenreButton>
          ))}
        </GenreButtonGroup>

        {/* 하위 태그 그리드 */}
        <SubTagGrid>
          {currentSubTags.map(tag => (
            <SubTagButton
              key={tag}
              active={selectedTags.includes(tag)}
              disabled={!selectedTags.includes(tag) && selectedTags.length >= 5}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </SubTagButton>
          ))}
        </SubTagGrid>

        {/* 태그 선택 개수 표시 */}
        <TagCount>{selectedTags.length} / 5개</TagCount>

        {/* 선택된 태그 목록 */}
        {selectedTags.length > 0 && (
          <SelectedTagsSection>
            <SelectedTagsTitle>선택된 태그</SelectedTagsTitle>
            <SelectedTagList>
              {selectedTags.map(tag => (
                <SelectedTagItem key={tag} onClick={() => handleSelectedTagRemove(tag)}>
                  #{tag}
                  <img src={closeIcon} alt="삭제" />
                </SelectedTagItem>
              ))}
            </SelectedTagList>
          </SelectedTagsSection>
        )}
      </TagContainer>
    </Section>
  );
};

export default TagSelectionSection;
