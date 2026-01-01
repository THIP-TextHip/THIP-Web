import { useNavigate } from 'react-router-dom';
import type { FabProps } from '../../types/fab';
import { Button } from './Fab.styled';

const Fab = ({ src, path }: FabProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };
  return (
    <Button onClick={handleClick}>
      <img src={src} alt="FAB" />
    </Button>
  );
};

export default Fab;
