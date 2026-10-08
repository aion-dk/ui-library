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
interface NormalResultListGroup {
  reference: string;
  title: LocalString;
  imageUrl: string | null;
  children: NormalResultListOption[];
  seatsWon?: number | null;
}
interface NormalResultListOption {
  reference: string;
  title: LocalString;
  imageUrl: string | null;
  count: number;
  elected: boolean;
  tied: boolean;
  ineligible?: boolean;
}
type NormalResultDataForDisplay = (NormalResultListGroup | NormalResultListOption)[];

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
  InstantRunoffRound,
  NormalResultListGroup,
  NormalResultListOption,
  NormalResultDataForDisplay,
  VoteCounts,
  VoiceCredits,
};
