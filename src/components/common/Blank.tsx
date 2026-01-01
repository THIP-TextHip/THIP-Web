import { Wrapper } from './Blank.styled';

interface BlankProps {
  height: string | number;
  color?: string;
  margin: string | number;
}

const Blank = ({ height, color = 'var(--color-darkgrey-dark)', margin }: BlankProps) => {
  return <Wrapper style={{ height, backgroundColor: color, margin }} />;
};

export default Blank;
