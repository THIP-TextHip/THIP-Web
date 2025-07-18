import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import { useState } from 'react';
import { IconButton } from './IconButton';
import downImg from '../../assets/filter/filterDown.svg';
import upImg from '../../assets/filter/filterUp.svg';

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

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 85px;
`;

const Text = styled.p`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

const SelectedText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 20px;
  position: absolute;
  top: 30px;
  left: -20px;
  border: solid 1px ${colors.grey[200]};
  border-radius: 16px;
  background: ${colors.black.main};
`;
