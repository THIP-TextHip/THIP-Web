import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import type { FabProps } from '../../types/fab';

const Button = styled.div`
  position: absolute;
  right: 20px;
  bottom: 105px;
  img {
    cursor: pointer;
  }
`;

const Fab = ({ src, path }: FabProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };
  return (
    <Button onClick={handleClick}>
      <img src={src} />
    </Button>
  );
};

export default Fab;
