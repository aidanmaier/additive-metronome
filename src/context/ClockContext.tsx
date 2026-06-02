import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ClockContextType {
  time: Date;
  bpm: number;
  playState: boolean;
  flashState: boolean;
  setSpeed: (interval: number) => void;
  setBpm: (bpm: number) => void;
  setPlayState: (state: boolean) => void;
  setFlashState: (state: boolean) => void;
}

export const ClockContext = createContext<ClockContextType | null>(null);

interface ClockProviderProps {
  children: ReactNode;
  initialInterval?: number;
}

export const ClockProvider = ({ children, initialInterval = 268 }: ClockProviderProps) => {
  const [time, setTime] = useState(new Date());
  const [intervalMs, setIntervalMs] = useState(initialInterval);
  const [playState, setPlayState] = useState(false);
  const [flashState, setFlashState] = useState(false);

  const bpm = Math.round(60000 / intervalMs);

  useEffect(() => {
    if (!playState) {
      return;
    }

    const timerId = window.setInterval(() => {
      setTime(new Date());
    }, intervalMs);

    return () => window.clearInterval(timerId);
  }, [intervalMs, playState]);

  const setBpm = (newBpm: number) => {
    // prevent invalid values
    const clamped = Math.max(1, newBpm);
    const newInterval = Math.round(60000 / clamped);
    setIntervalMs(newInterval);
  };

  return (
    <ClockContext.Provider 
      value={{ 
        time, 
        bpm, 
        playState, 
        flashState, 
        setSpeed: setIntervalMs, 
        setBpm, 
        setPlayState,
        setFlashState,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};