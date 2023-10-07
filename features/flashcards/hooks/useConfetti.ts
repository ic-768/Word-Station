import { useCallback, useRef } from "react";

export const useConfetti = () => {
  const refConfetti = useRef<any | null>(null);

  const getInstance = useCallback((instance: any | null) => {
    if (instance) {
      refConfetti.current = instance;
    }
  }, []);

  const makeShot = useCallback((particleRatio: any, opts: any) => {
    refConfetti.current &&
      refConfetti.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const onWin = useCallback(() => {
    makeShot(2.85, {
      spread: 140,
      startVelocity: 55,
      gravity: 0.2,
      ticks: 60,
      scalar: 1,
    });
  }, [makeShot]);

  return [onWin, getInstance] as const;
};
