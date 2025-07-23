import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
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

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${colors.darkgrey.main};
  color: ${colors.white};
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 674px;
  max-height: 50%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid ${colors.grey[300]};
  background-color: ${colors.darkgrey[50]};
  border-radius: 50%;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: 12px;
`;

const Content = styled.p`
  white-space: pre-wrap;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 1.6;
  color: ${colors.grey[100]};
`;
