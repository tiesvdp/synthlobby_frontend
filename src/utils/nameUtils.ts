import { Synth } from "@/models/synths";

export const formatSynthName = (synth: Synth): string => {
  if (!synth) return "";
  return synth.source.toLowerCase().includes("thomann")
    ? `${synth.brand} ${synth.name}`
    : synth.name;
};
