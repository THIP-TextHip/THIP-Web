import { HeaderWrapper, InnerHeader, NextButton } from './TitleHeader.styled';

type HeaderProps = {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightButton?: React.ReactNode;
  isNextActive?: boolean;
  onLeftClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const TitleHeader = ({
  leftIcon,
  rightIcon,
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
      {rightIcon ? (
        <div onClick={onRightClick} style={{ cursor: onRightClick ? 'pointer' : 'default' }}>
          {rightIcon}
        </div>
      ) : rightButton ? (
        <NextButton onClick={isNextActive ? onRightClick : undefined} active={isNextActive}>
          {rightButton}
        </NextButton>
      ) : (
        <div />
      )}
    </InnerHeader>
  </HeaderWrapper>
);

export default TitleHeader;
