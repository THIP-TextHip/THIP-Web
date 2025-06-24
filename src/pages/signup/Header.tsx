import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  background-color: #121212;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 768px;
  margin: 0 auto;
  padding: 16px 20px;

  .title {
    color: #fefefe;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
  }

  .next {
    width: 49px;
    height: 28px;
    padding: 4px 12px;
    align-items: center;
    border-radius: 20px;
    background: #888;

    color: #fefefe;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }
`;

const InnerHeader = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type HeaderProps = {
  title: string;
  leftIcon?: React.ReactNode;
  rightButton?: React.ReactNode;
  onLeftClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Header = ({ leftIcon, title, rightButton, onLeftClick, onRightClick }: HeaderProps) => (
  <HeaderWrapper>
    <InnerHeader>
      <div onClick={onLeftClick} style={{ cursor: onLeftClick ? 'pointer' : 'default' }}>
        {leftIcon}
      </div>
      <div className="title">{title}</div>
      <div onClick={onRightClick} style={{ cursor: onRightClick ? 'pointer' : 'default' }}>
        {rightButton}
      </div>
    </InnerHeader>
  </HeaderWrapper>
);

export default Header;
