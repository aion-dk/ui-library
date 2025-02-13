import type { AVSplitHelperState, AVSummaryOptionObject } from "@/types";

type AVPileSummaryState = AVSplitHelperState | "summary";

interface AVSummaryWriteInObject {
  partyLetter: string;
  partyName: string;
  candidateName: string;
}

interface AVPileSummaryOptionSummary {
  options: AVSummaryOptionObject[];
  writeIns: AVSummaryWriteInObject[];
}

export type { AVPileSummaryState, AVPileSummaryOptionSummary };
