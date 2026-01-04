import { useState } from 'react';
import { IconButton } from './IconButton';
import downImg from '../../assets/filter/filterDown.svg';
import upImg from '../../assets/filter/filterUp.svg';
import { Container, Text, SelectedText, Modal } from './Filter.styled';

interface FilterProps {
  filters: string[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export const Filter = ({ filters, selectedFilter, setSelectedFilter }: FilterProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleFilterClick = (filter: string) => {
    setIsOpenModal(false);
    setSelectedFilter(filter);
  };

  const handleModalClick = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Container onClick={handleModalClick}>
      <Text>{selectedFilter}</Text>
      <IconButton src={isOpenModal ? upImg : downImg} />
      {isOpenModal ? (
        <Modal>
          {filters.map(filter =>
            filter === selectedFilter ? (
              <SelectedText onClick={() => handleFilterClick(filter)}>{filter}</SelectedText>
            ) : (
              <Text onClick={() => handleFilterClick(filter)}>{filter}</Text>
            ),
          )}
        </Modal>
      ) : (
        <></>
      )}
    </Container>
  );
};

export { Text as FilterText, SelectedText as FilterSelectedText };
