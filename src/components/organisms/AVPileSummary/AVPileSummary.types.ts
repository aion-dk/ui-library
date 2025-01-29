import type { AVSplitHelperState, AVSummaryOptionObject, AVSummaryWriteInObject } from "@/types";

type AVPileSummaryState = AVSplitHelperState | "summary";

interface AVPileSummaryOptionSummary {
  options: AVSummaryOptionObject[];
  writeIns: AVSummaryWriteInObject[];
}

export type { AVPileSummaryState, AVPileSummaryOptionSummary };
