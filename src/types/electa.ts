import type { LocalString, PartialResult } from "@/types";

interface PartialResults {
  [key: string]: PartialResult;
}

interface Party {
  letter: string;
  name: string;
}

interface OptionResult {
  reference: string;
  title: LocalString;
  elected?: boolean;
  tied?: boolean;
  ineligible?: boolean;
}

interface VoteCounts {
  voted: number;
  disabledCount: number;
  disabledWeight: number;
  votedWeight: number;
  present: number;
  presentWeight: number;
  eligible: number;
  eligibleWeight: number;
  invalidVotes: number;
  votedMultipleChannels: number;
  excludedCount?: number;
  blankCount: number;
}

interface NormalResult extends OptionResult {
  image?: string;
  count: number;
}

interface RankedResult extends OptionResult {
  optionPosition: number;
}

interface Round {
  accumulatedCounts: Record<string, number>;
  elected: string[];
  tied: string[];
}

interface InstantRunoffRound {
  counts: Record<string, number>;
  eliminated: string | null;
  exhausted: number;
  elected: string | null;
  transferred: number;
  event: string;
}

interface VoiceCredits {
  total: number;
  remaining: number;
  credits: Map<string, number>;
}

export type {
  PartialResults,
  Party,
  OptionResult,
  Round,
  InstantRunoffRound,
  NormalResult,
  RankedResult,
  VoteCounts,
  VoiceCredits,
};
