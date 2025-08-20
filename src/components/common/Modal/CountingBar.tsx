import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

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

const BarContainer = styled.div`
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 101;
`;

const Bar = styled.div`
  padding: 8px 16px;
  background: ${colors.darkgrey.dark};
  color: ${colors.neongreen};
  border-radius: 16px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  transform: none;
  transition: none;

  &[data-leaving='true'] {
    transform: translateY(-32px) scale(0.98);
    opacity: 0;
    transition:
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
