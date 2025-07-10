import headerLogo from '../../assets/header/header-logo.svg';
import groupDoneLogo from '../../assets/header/group-done.svg';
import findUserLogo from '../../assets/header/findUser.svg';
import bellLogo from '../../assets/header/bell.svg';
import styled from '@emotion/styled';
import { IconButton } from './IconButton';

interface MainHeaderProps {
  type: 'home' | 'group';
  leftButtonClick?: () => void;
  rightButtonClick?: () => void;
}

const MainHeader = ({ type, leftButtonClick, rightButtonClick }: MainHeaderProps) => {
  return (
    <HeaderWrapper>
      <LogoImg src={headerLogo} alt="headerLogo" />
      <Actions>
        <IconButton
          onClick={leftButtonClick}
          src={type === 'group' ? groupDoneLogo : findUserLogo}
          alt={type === 'group' ? '모임 완료 아이콘' : '사용자 찾기 아이콘'}
        />
        <IconButton onClick={rightButtonClick} src={bellLogo} alt="알림 아이콘" />
      </Actions>
    </HeaderWrapper>
  );
};

export default MainHeader;

const HeaderWrapper = styled.div`
  background-color: var(--color-black-main);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 767px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  height: 24px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
