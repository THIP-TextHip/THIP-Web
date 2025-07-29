import {
  Container,
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  ToggleSlider,
} from './VoiceToggleSection.styled';

interface VoiceToggleSectionProps {
  isVoiceEnabled: boolean;
  onToggle: () => void;
}

const VoiceToggleSection = ({ isVoiceEnabled, onToggle }: VoiceToggleSectionProps) => {
  return (
    <Container>
      <ToggleContainer>
        <ToggleLabel>종명</ToggleLabel>
        <ToggleSwitch active={isVoiceEnabled} onClick={onToggle}>
          <ToggleSlider active={isVoiceEnabled} />
        </ToggleSwitch>
      </ToggleContainer>
    </Container>
  );
};

export default VoiceToggleSection;
