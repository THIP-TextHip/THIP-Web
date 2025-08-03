import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TitleHeader from '../../components/common/TitleHeader';
import { usePopupActions } from '@/hooks/usePopupActions';
import leftArrow from '../../assets/common/leftArrow.svg';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

const AlertPage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = usePopupActions();

  const [toggleStates, setToggleStates] = useState({
    push: true,
    // feed: true,
    // group: false,
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
    // { key: 'feed' as const, label: '피드 알림', desc: '새로운 피드 소식을 알려드려요' },
    // { key: 'group' as const, label: '모임 알림', desc: '모임 관련 소식을 알려드려요' },
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

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  padding-top: 76px;
  background-color: #121212;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 24px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const SettingTitle = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SettingDesc = styled.div`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
`;

const Toggle = styled.div<{ isActive: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => (props.isActive ? colors.purple.main : colors.grey[300])};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleSlider = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${colors.white};
  position: absolute;
  top: 2px;
  left: ${props => (props.isActive ? '22px' : '2px')};
  transition: left 0.3s ease;
`;

export default AlertPage;
