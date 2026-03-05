import { useCallback, useRef, useState } from 'react';

export const usePreventDoubleClick = () => {
  const lockRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async (asyncFn: () => Promise<void>) => {
    if (lockRef.current) return;

    lockRef.current = true;
    setIsLoading(true);

    try {
      await asyncFn();
    } finally {
      lockRef.current = false;
      setIsLoading(false);
    }
  }, []);

  return { isLoading, run };
};
