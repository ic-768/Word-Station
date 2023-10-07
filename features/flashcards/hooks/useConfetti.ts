import { useRef } from "react";

export const useConfetti = () => {
  const refConfetti = useRef<any>(null);

  const getInstance = (instance: any) => {
    refConfetti.current = instance;
  };

  const makeShot = () =>
    refConfetti?.current({
      spread: 140,
      startVelocity: 55,
      gravity: 0.2,
      ticks: 60,
      scalar: 1,
      origin: { y: 0.7 },
      particleCount: 200,
    });

  return [makeShot, getInstance] as const;
};
