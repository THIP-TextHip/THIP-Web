import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TitleHeader from '../../components/common/TitleHeader';
import { usePopupActions } from '@/hooks/usePopupActions';
import leftArrow from '../../assets/common/leftArrow.svg';
import {
  Wrapper,
  Content,
  SettingItem,
  SettingInfo,
  SettingTitle,
  SubSection,
  SettingDesc,
  Toggle,
  ToggleSlider,
} from './AlertPage.styled';

const AlertPage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = usePopupActions();

  const [toggleStates, setToggleStates] = useState({
    push: true,
  });

  const handleBack = () => {
    navigate('/mypage');
  };

  const handleToggle = (key: keyof typeof toggleStates, label: string) => {
    const newState = !toggleStates[key];
    setToggleStates(prev => ({
      ...prev,
      [key]: newState,
    }));

    openSnackbar({
      message: `${label} 알림이 ${newState ? '설정되었어요.' : '해제되었어요.'}`,
      variant: 'top',
      onClose: () => {},
    });
  };

  const alertSettings = [
    { key: 'push' as const, label: '푸시 알림', desc: '알림센터의 모든 알림을 포함해요' },
  ];

  return (
    <Wrapper>
      <TitleHeader
        title="알림설정"
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBack}
      />
      <Content>
        {alertSettings.map(setting => (
          <SettingItem key={setting.key}>
            <SettingInfo>
              <SettingTitle>{setting.label}</SettingTitle>
              <SubSection>
                <SettingDesc>{setting.desc}</SettingDesc>
                <Toggle
                  isActive={toggleStates[setting.key]}
                  onClick={() => handleToggle(setting.key, setting.label)}
                >
                  <ToggleSlider isActive={toggleStates[setting.key]} />
                </Toggle>
              </SubSection>
            </SettingInfo>
          </SettingItem>
        ))}
      </Content>
    </Wrapper>
  );
};

export default AlertPage;
