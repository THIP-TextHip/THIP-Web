import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 767px;
  margin: 0 auto;
  padding: 16px 20px;
  background-color: var(--color-black-main);
`;

const NextButton = styled.div<{ active: boolean }>`
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  width: 49px;
  height: 28px;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: ${({ active }) =>
    active ? 'var(--color-purple-main)' : 'var(--color-grey-300)'};
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 20px;
  text-align: center;
`;

const InnerHeader = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: var(--color-white);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }
`;

type HeaderProps = {
  title?: string;
  leftIcon?: React.ReactNode;
  rightButton?: React.ReactNode;
  isNextActive?: boolean;
  onLeftClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const TitleHeader = ({
  leftIcon,
  title,
  rightButton,
  isNextActive = false,
  onLeftClick,
  onRightClick,
}: HeaderProps) => (
  <HeaderWrapper>
    <InnerHeader>
      <div onClick={onLeftClick} style={{ cursor: onLeftClick ? 'pointer' : 'default' }}>
        {leftIcon}
      </div>
      <div className="title">{title}</div>
      {rightButton ? (
        <NextButton onClick={onRightClick} active={isNextActive}>
          {rightButton}
        </NextButton>
      ) : (
        <div />
      )}
    </InnerHeader>
  </HeaderWrapper>
);

export default TitleHeader;
