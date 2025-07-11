import TitleHeader from '@/components/common/TitleHeader';
import { Modal, Overlay } from '@/components/group/Modal.styles';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/search/SearchBar';
import { useState } from 'react';
import RecentSearchTabs from '@/components/search/RecentSearchTabs';

const GroupSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [recentSearches, setRecentSearches] = useState<string[]>([
    '딸기12',
    '당근',
    '수박245',
    '참',
    '메론1',
  ]);

  const handleSearch = (term: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t !== term);
      return [term, ...filtered].slice(0, 5);
    });
  };

  const handleDelete = (recentSearch: string) => {
    setRecentSearches(prev => prev.filter(t => t !== recentSearch));
  };

  const handleBackButton = () => {
    navigate('/group');
  };
  return (
    <Overlay>
      <Modal>
        <TitleHeader
          title="모임 검색"
          leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
          onLeftClick={handleBackButton}
        />
        <SearchBar
          placeholder="방제목 혹은 책제목을 검색해보세요."
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={() => {
            if (searchTerm.trim()) handleSearch(searchTerm.trim());
          }}
        />
        <RecentSearchTabs
          recentSearches={recentSearches}
          handleDelete={handleDelete}
        ></RecentSearchTabs>
      </Modal>
    </Overlay>
  );
};

export default GroupSearch;
