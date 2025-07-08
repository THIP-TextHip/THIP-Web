import { Section, SectionTitle } from '../CommonSection.styled';
import {
  PrivacyToggleContainer,
  PrivacyLabel,
  ToggleSwitch,
  ToggleSlider,
} from './PrivacySettingSection.styled';

interface PrivacySettingSectionProps {
  isPrivate: boolean;
  onToggle: () => void;
}

const PrivacySettingSection = ({ isPrivate, onToggle }: PrivacySettingSectionProps) => {
  return (
    <Section>
      <SectionTitle>공개 설정</SectionTitle>
      <PrivacyToggleContainer>
        <PrivacyLabel>비공개로 설정하기</PrivacyLabel>
        <ToggleSwitch active={isPrivate} onClick={onToggle}>
          <ToggleSlider active={isPrivate} />
        </ToggleSwitch>
      </PrivacyToggleContainer>
    </Section>
  );
};

export default PrivacySettingSection;
