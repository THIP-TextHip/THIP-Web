import { useEffect, useState } from 'react';
import { BarContainer, Bar } from './CountingBar.styled';

interface Props {
  message: string;
  duration?: number;
  onClose: () => void;
}

const CountingBar = ({ message, duration = 5000, onClose }: Props) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onClose, 250);
    return () => clearTimeout(t);
  }, [leaving, onClose]);

  return (
    <BarContainer>
      <Bar data-leaving={leaving}>{message}</Bar>
    </BarContainer>
  );
};

export default CountingBar;
