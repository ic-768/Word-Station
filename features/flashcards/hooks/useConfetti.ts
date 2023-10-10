import { useRef } from "react";

export const useConfetti = (score: number, multiplier: number) => {
  const refConfetti = useRef<any>(null);

  const getInstance = (instance: any) => {
    refConfetti.current = instance;
  };

  const particleCount = (score || 10) * 10 * multiplier;

  const makeShot = () =>
    refConfetti?.current({
      spread: 140,
      startVelocity: 55,
      gravity: 0.2,
      ticks: 60,
      scalar: 1,
      origin: { y: 0.7 },
      particleCount,
    });

  return [makeShot, getInstance] as const;
};
