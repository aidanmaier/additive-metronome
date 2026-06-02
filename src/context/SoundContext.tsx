import { createContext, useRef, useEffect, useContext } from "react";
import { useState, type ReactNode } from "react";
import { ClockContext } from "./ClockContext";

interface SoundContextType {
  step: number;
  setStep: (step: number) => void;
  sequence: Array<number>;
  setSequence: (sequence: Array<number>) => void;
  volume: number;
  setVolume: (volume: number) => void;
  mute: boolean;
  setMute: (mute: boolean) => void;
  fill: boolean;
  setFill: (fill: boolean) => void;
}

export const SoundContext = createContext<SoundContextType | null>(null);

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const audioRef = useRef<HTMLAudioElement[]>([]);
  const clockContext = useContext(ClockContext);
  const [step, setStep] = useState(0);
  const [sequence, setSequence] = useState([2, 0, 1, 0, 1, 0, 0]);
  const [volume, setVolume] = useState(50);
  const [mute, setMute] = useState(false);
  const [fill, setFill] = useState(false);

  // initialize audio elements
  useEffect(() => {
    const audioSource = [
      { fileName: "clave_mute.wav" },
      { fileName: "clave_lo.wav" },
      { fileName: "clave_hi.wav" }
    ];

    audioRef.current = audioSource.map((source) => {
      const audioUrl = new URL("../audio/" + source.fileName, import.meta.url).href;
      const audio = new Audio(audioUrl);
      audio.preload = "auto";
      return audio;
    });
  }, []);

  // sync audio element volume and mute state
  useEffect(() => {
    audioRef.current.forEach((audio) => {
      audio.muted = mute;
      audio.volume = mute ? 0 : Math.max(0, Math.min(1, volume / 100));
    });
  }, [mute, volume]);

  // play the sound at index of audioRef
  const playSound = (sound: number) => {
    const audio = audioRef.current[sound];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.error("Failed to play audio:", err);
    });
  };

  // play next sound in sequence on each beat
  useEffect(() => {
    if (!clockContext?.playState) {
      setStep(0); // reset step on stop
    } else {
      const sound = sequence[step];
      if (sound > 0 || fill) { 
        playSound(sound); // only play sound 0 if fill == true
      }
      setStep((prevStep) => (prevStep + 1) % sequence.length); // incr step with wrap-around
    }
  }, [clockContext?.time, clockContext?.playState, fill, sequence.length]);

  return (
    <SoundContext.Provider
      value={{
        step,
        setStep,
        sequence,
        setSequence,
        volume,
        setVolume,
        mute,
        setMute,
        fill,
        setFill
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};


