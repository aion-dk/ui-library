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
  eliminated: string;
  exhausted: number;
  elected: string;
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
};
