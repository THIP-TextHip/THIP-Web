import {
  Container,
  ToggleContainer,
  LeftSection,
  InfoIcon,
  ToggleLabel,
  ToggleSwitch,
  ToggleSlider,
} from './VoiceToggleSection.styled';
import infoIcon from '../../assets/memory/info.svg';

interface VoiceToggleSectionProps {
  isOverallEnabled: boolean;
  onToggle: () => void;
}

const VoiceToggleSection = ({ isOverallEnabled, onToggle }: VoiceToggleSectionProps) => {
  return (
    <Container>
      <ToggleContainer>
        <LeftSection>
          <InfoIcon>
            <img src={infoIcon} alt="정보" />
          </InfoIcon>
          <ToggleLabel>총평</ToggleLabel>
        </LeftSection>
        <ToggleSwitch active={isOverallEnabled} onClick={onToggle}>
          <ToggleSlider active={isOverallEnabled} />
        </ToggleSwitch>
      </ToggleContainer>
    </Container>
  );
};

export default VoiceToggleSection;
