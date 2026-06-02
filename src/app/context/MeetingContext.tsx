import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type MeetingContextValue = {
  currentTranscript: string | null;
  setCurrentTranscript: (transcript: string | null) => void;
};

const MeetingContext = createContext<MeetingContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export function MeetingProvider({ children }: Props) {
  const [currentTranscript, setCurrentTranscriptState] = useState<string | null>(null);

  const setCurrentTranscript = useCallback((transcript: string | null) => {
    setCurrentTranscriptState(transcript);
  }, []);

  return (
    <MeetingContext.Provider value={{ currentTranscript, setCurrentTranscript }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeetingContext(): MeetingContextValue {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetingContext must be used inside MeetingProvider');
  }
  return context;
}
