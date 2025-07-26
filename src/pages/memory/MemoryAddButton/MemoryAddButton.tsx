import addFab from '../../../assets/common/makegroupfab.svg';
import { AddButton } from './MemoryAddButton.styled';

interface MemoryAddButtonProps {
  onAddRecord: () => void;
}

const MemoryAddButton = ({ onAddRecord }: MemoryAddButtonProps) => {
  return (
    <AddButton onClick={onAddRecord}>
      <img src={addFab} alt="기록 추가" />
    </AddButton>
  );
};

export default MemoryAddButton;
