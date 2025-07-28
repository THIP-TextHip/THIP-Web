import { useState, useEffect } from 'react';
import { DropdownContainer, DropdownItem } from './SortDropdown.styled';

export type SortType = 'latest' | 'popular' | 'comments';

interface SortDropdownProps {
  isOpen: boolean;
  selectedSort: SortType;
  onSortSelect: (sort: SortType) => void;
}

const SortDropdown = ({ isOpen, selectedSort, onSortSelect }: SortDropdownProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // 다음 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // 애니메이션 완료 후 DOM에서 제거
      setTimeout(() => {
        setShouldRender(false);
      }, 150);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const sortOptions = [
    { value: 'latest' as SortType, label: '최신순' },
    { value: 'popular' as SortType, label: '인기순' },
    { value: 'comments' as SortType, label: '댓글 많은순' },
  ];

  return (
    <DropdownContainer isAnimating={isAnimating}>
      {sortOptions.map(option => (
        <DropdownItem
          key={option.value}
          selected={selectedSort === option.value}
          onClick={() => onSortSelect(option.value)}
        >
          {option.label}
        </DropdownItem>
      ))}
    </DropdownContainer>
  );
};

export default SortDropdown;
