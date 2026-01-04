import { Overlay, ModalBox, CloseButton, Title, Content } from './IntroModal.styled';
import modalCloseIcon from '../../assets/common/modalClose.svg';

interface IntroModal {
  title: string;
  content: string;
  onClose: () => void;
}

export const IntroModal = ({ title, content, onClose }: IntroModal) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBox>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </ModalBox>
      <CloseButton onClick={onClose}>
        <img src={modalCloseIcon} alt="닫기 버튼" />
      </CloseButton>
    </Overlay>
  );
};
