import type { SnackbarProps } from '@/stores/popupStore';
import { useEffect, useState } from 'react';
import { Container, Discription, Button } from './Snackbar.styled';

const Snackbar = ({
  message,
  actionText,
  variant,
  isError,
  onActionClick,
  onClose,
}: SnackbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const showDuration = variant === 'bottom' ? 5000 : 2000;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 2000);
    }, showDuration);

    return () => clearTimeout(timer);
  }, [variant, onClose]);

  return (
    <Container variant={variant} visible={visible}>
      <Discription isError={isError}>{message}</Discription>
      {variant === 'bottom' && actionText && <Button onClick={onActionClick}>{actionText}</Button>}
    </Container>
  );
};

export default Snackbar;
