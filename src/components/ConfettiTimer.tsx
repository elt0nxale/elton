'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiTimerProps {
  seconds: number;
}

export function ConfettiTimer({ seconds }: ConfettiTimerProps) {
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <em 
      className="relative group" 
      onMouseEnter={fireConfetti}
    >
      <u>recently</u>
      <span 
        className="absolute bottom-full transform -translate-x-1/2 w-max px-3 py-2 text-sm 
                   text-white bg-black rounded opacity-0 group-hover:opacity-100 
                   transition-all duration-300 delay-500"
      >
        {seconds} secs ago
      </span>
    </em>
  );
}