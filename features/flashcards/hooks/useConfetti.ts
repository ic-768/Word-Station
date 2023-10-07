import { useCallback, useRef } from "react";

export const useConfetti = () => {
  const refConfetti = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refConfetti.current = instance;
  }, []);

  const makeShot = useCallback((opts: {}) => {
    refConfetti?.current(opts);
  }, []);

  const onWin = useCallback(() => {
    makeShot({
      spread: 140,
      startVelocity: 55,
      gravity: 0.2,
      ticks: 60,
      scalar: 1,
      origin: { y: 0.7 },
      particleCount: 200,
    });
  }, [makeShot]);

  return [onWin, getInstance] as const;
};
