import { DropdownContainer, DropdownItem } from './SortDropdown.styled';

export type SortType = 'latest' | 'popular' | 'comments';

interface SortDropdownProps {
  isOpen: boolean;
  selectedSort: SortType;
  onSortSelect: (sort: SortType) => void;
}

const SortDropdown = ({ isOpen, selectedSort, onSortSelect }: SortDropdownProps) => {
  if (!isOpen) return null;

  const sortOptions = [
    { value: 'latest' as SortType, label: '최신순' },
    { value: 'popular' as SortType, label: '인기순' },
    { value: 'comments' as SortType, label: '댓글 많은순' },
  ];

  return (
    <DropdownContainer>
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
