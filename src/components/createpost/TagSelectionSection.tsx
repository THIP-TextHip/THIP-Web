import { useState, useEffect } from 'react';
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
import { getWriteInfo, type CategoryData } from '@/api/feeds/getWriteInfo';

interface TagSelectionSectionProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const TagSelectionSection = ({ selectedTags, onTagToggle }: TagSelectionSectionProps) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // API에서 카테고리 및 태그 데이터 로드
  useEffect(() => {
    const loadWriteInfo = async () => {
      try {
        setLoading(true);
        const response = await getWriteInfo();

        if (response.isSuccess && response.data.categoryList.length > 0) {
          setCategories(response.data.categoryList);
          // 첫 번째 카테고리를 기본 선택
          setSelectedCategory(response.data.categoryList[0].category);
        }
      } catch (error) {
        console.error('카테고리 정보 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWriteInfo();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
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

  // 현재 선택된 카테고리의 태그 목록
  const currentTags = categories.find(cat => cat.category === selectedCategory)?.tagList || [];

  if (loading) {
    return (
      <Section>
        <SectionTitle>태그</SectionTitle>
        <TagContainer>
          <div>로딩 중...</div>
        </TagContainer>
      </Section>
    );
  }

  return (
    <Section>
      <SectionTitle>태그</SectionTitle>
      <TagContainer>
        <GenreButtonGroup>
          {categories.map(categoryData => (
            <GenreButton
              key={categoryData.category}
              active={selectedCategory === categoryData.category}
              onClick={() => handleCategorySelect(categoryData.category)}
            >
              {categoryData.category}
            </GenreButton>
          ))}
        </GenreButtonGroup>

        <SubTagGrid>
          {currentTags.map(tag => (
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
