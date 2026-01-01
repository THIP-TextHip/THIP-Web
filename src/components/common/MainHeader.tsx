import { useEffect, useState } from 'react';
import headerLogo from '../../assets/header/header-logo.svg';
import findUserLogo from '../../assets/header/findUser.svg';
import bellLogo from '../../assets/header/bell.svg';
import bellExistLogo from '../../assets/header/exist-bell.svg';
import { IconButton } from './IconButton';
import { getNotificationExist } from '@/api/notifications/getNotificationExist';
import { useAuthReadyStore } from '@/stores/useAuthReadyStore';
import { HeaderWrapper, LogoImg, Actions } from './MainHeader.styled';

interface MainHeaderProps {
  type: 'home' | 'group';
  leftButtonClick?: () => void;
  rightButtonClick?: () => void;
}

const MainHeader = ({ type, leftButtonClick, rightButtonClick }: MainHeaderProps) => {
  const [hasUnchecked, setHasUnchecked] = useState(false);
  const isAuthReady = useAuthReadyStore(s => s.isReady);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      if (!localStorage.getItem('authToken')) return;
      try {
        const res = await getNotificationExist();
        if (mounted && res.isSuccess) setHasUnchecked(res.data.exists);
      } catch {
        // ignore
      }
    };
    if (isAuthReady) void fetchData();
    return () => {
      mounted = false;
    };
  }, [isAuthReady]);

  return (
    <HeaderWrapper>
      <LogoImg src={headerLogo} alt="headerLogo" />
      <Actions>
        {type === 'home' && (
          <IconButton onClick={leftButtonClick} src={findUserLogo} alt={'사용자 찾기 아이콘'} />
        )}

        <IconButton
          onClick={rightButtonClick}
          src={hasUnchecked ? bellExistLogo : bellLogo}
          alt="알림 아이콘"
        />
      </Actions>
    </HeaderWrapper>
  );
};

export default MainHeader;
