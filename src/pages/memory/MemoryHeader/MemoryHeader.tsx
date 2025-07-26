import TitleHeader from '../../../components/common/TitleHeader';
import leftArrow from '../../../assets/common/leftArrow.svg';

interface MemoryHeaderProps {
  onBackClick: () => void;
}

const MemoryHeader = ({ onBackClick }: MemoryHeaderProps) => {
  return (
    <TitleHeader
      leftIcon={<img src={leftArrow} alt="뒤로가기" />}
      onLeftClick={onBackClick}
      title="기록장"
    />
  );
};

export default MemoryHeader;
