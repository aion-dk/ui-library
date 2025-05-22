import type { LocalString, PartialResult } from "@/types";

interface PartialResults {
  [key: string]: PartialResult;
}

interface Party {
  letter: string;
  name: string;
}

interface Result {
  reference: string;
  title: LocalString;
  elected?: boolean;
  tied?: boolean;
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

interface NormalResult extends Result {
  image?: string;
  count: number;
}

interface RankedResult extends Result {
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

type Theme = "dark" | "light";

export type {
  PartialResults,
  Party,
  Result,
  Round,
  InstantRunoffRound,
  NormalResult,
  RankedResult,
  Theme,
  VoteCounts,
};
