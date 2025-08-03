import styled from '@emotion/styled';

interface BlankProps {
  height: string | number;
  color?: string;
  margin: string | number;
}

const Blank = ({ height, color = 'var(--color-darkgrey-dark)', margin }: BlankProps) => {
  return <Wrapper style={{ height, backgroundColor: color, margin }} />;
};

export default Blank;

const Wrapper = styled.div`
  width: 100%;
  min-height: 10px;
`;
