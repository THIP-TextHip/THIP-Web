import { Section, SectionTitle } from '../../../pages/group/CommonSection.styled';
import {
  PrivacyToggleContainer,
  PrivacyLabel,
  ToggleSwitch,
  ToggleSlider,
} from './PrivacySettingSection.styled';
import PasswordInputSection from './PasswordInputSection';

interface PrivacySettingSectionProps {
  isPrivate: boolean;
  password: string;
  onToggle: () => void;
  onPasswordChange: (password: string) => void;
  onPasswordClose: () => void;
}

const PrivacySettingSection = ({
  isPrivate,
  password,
  onToggle,
  onPasswordChange,
  onPasswordClose,
}: PrivacySettingSectionProps) => {
  return (
    <Section>
      <SectionTitle>공개 설정</SectionTitle>
      <PrivacyToggleContainer>
        <PrivacyLabel>비공개로 설정하기</PrivacyLabel>
        <ToggleSwitch active={isPrivate} onClick={onToggle}>
          <ToggleSlider active={isPrivate} />
        </ToggleSwitch>
      </PrivacyToggleContainer>
      {isPrivate && (
        <PasswordInputSection
          password={password}
          onPasswordChange={onPasswordChange}
          onClose={onPasswordClose}
        />
      )}
    </Section>
  );
};

export default PrivacySettingSection;
