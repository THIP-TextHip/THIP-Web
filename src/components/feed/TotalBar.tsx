import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  /* min-width: 320px;
  max-width: 540px; */
  padding: 0 20px;
  margin: 0 auto;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  color: var(--color-grey-100);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 24px;
  border-bottom: 1px solid #282828;

  .count {
    text-align: right;
  }
`;

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
