import type { ConfirmModalProps } from '@/stores/usePopupStore';
import { Container, ButtonContainer, Button } from './ConfirmModal.styled';

const ConfirmModal = ({
  title,
  disc,
  onConfirm,
  onClose,
  confirmText = '예',
  cancelText = '아니요',
}: ConfirmModalProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container onClick={handleContainerClick}>
      <div className="title">{title}</div>
      <div className="disc" dangerouslySetInnerHTML={{ __html: disc }} />
      <ButtonContainer>
        <Button variant="no" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="yes" onClick={onConfirm}>
          {confirmText}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ConfirmModal;
