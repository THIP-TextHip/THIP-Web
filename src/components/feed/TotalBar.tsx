import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  padding-bottom: 4px;
  border-bottom: 1px solid #282828;
  margin: 0 auto;
  gap: 2px;
  color: var(--color-grey-100);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 24px;

  .total {
  }

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
      <div className="total">전체</div>
      <div className="count">{count}</div>
      {/* 피드 글 개수에 맞춰서 count 세야할듯 */}
    </Container>
  );
};

export default TotalBar;
