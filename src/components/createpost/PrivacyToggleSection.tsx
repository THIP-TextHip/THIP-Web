import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import {
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  ToggleSlider,
} from './PrivacyToggleSection.styled';

interface PrivacyToggleSectionProps {
  isPrivate: boolean;
  onToggle: () => void;
}

const PrivacyToggleSection = ({ isPrivate, onToggle }: PrivacyToggleSectionProps) => {
  return (
    <Section>
      <SectionTitle>공개 설정</SectionTitle>
      <ToggleContainer>
        <ToggleLabel>비공개로 설정</ToggleLabel>
        <ToggleSwitch active={isPrivate} onClick={onToggle}>
          <ToggleSlider active={isPrivate} />
        </ToggleSwitch>
      </ToggleContainer>
    </Section>
  );
};

export default PrivacyToggleSection;
