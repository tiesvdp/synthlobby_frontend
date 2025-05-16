// src/context/SynthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from "react";

import { useGetSynths } from "@/api/synths.ts";
import { Synth } from "@/models/synths.ts";

interface SynthContextProps {
  synths: Synth[];
  setSynths: React.Dispatch<React.SetStateAction<Synth[]>>;
}

const SynthContext = createContext<SynthContextProps | undefined>(undefined);

export const SynthProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: synthsData } = useGetSynths();
  const [synths, setSynths] = useState<Synth[]>([]);

  useEffect(() => {
    if (synthsData) {
      setSynths(synthsData);
    }
  }, [synthsData]);

  return (
    <SynthContext.Provider value={{ synths, setSynths }}>
      {children}
    </SynthContext.Provider>
  );
};

export const useSynths = (): SynthContextProps => {
  const context = useContext(SynthContext);

  if (!context) {
    throw new Error("useSynths must be used within a SynthProvider");
  }

  return context;
};
