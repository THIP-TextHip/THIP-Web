import { Container, Inner } from './TotalBar.styled';
interface TotalBarProps {
  count: number;
}

const TotalBar = ({ count }: TotalBarProps) => {
  return (
    <Container>
      <Inner>
        <div className="total">전체</div>
        <div className="count">{count}</div>
      </Inner>
    </Container>
  );
};

export default TotalBar;
