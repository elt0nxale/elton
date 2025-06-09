'use client';

import { useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiTimerProps {
  seconds: number;
  word: string;
}

export function ConfettiTimer({ seconds, word }: ConfettiTimerProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCalledRef = useRef<number>(0);
  const DEBOUNCE_DELAY = 1000;

  const fireConfetti = useCallback(() => {
    const now = Date.now();
    if (now - lastCalledRef.current < DEBOUNCE_DELAY) return;

    lastCalledRef.current = now;
    
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
      <u>{word}</u>
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