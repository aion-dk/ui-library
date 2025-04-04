import type { LocalString } from "@/types";

interface AVDhondtSummaryBlankOption {
  reference: string;
  title: LocalString;
  tied: boolean;
  elected: boolean;
  count?: number;
}

interface AVDhondtSummaryOption extends AVDhondtSummaryBlankOption {
  raffled: boolean;
  comparativeFigure: number;
}

type AVDhondtSummarySeat = Array<AVDhondtSummaryOption>;

type AVDhondtSummaryResult = Array<AVDhondtSummarySeat | AVDhondtSummaryBlankOption>;

interface AVDhondtSummarySortedResult {
  seats: Array<AVDhondtSummarySeat>;
  blank: AVDhondtSummaryBlankOption | null;
}

interface AVDhondtSummaryOptionData {
  title: string;
  tied: number;
  elected: number;
}

type AVDhondtSummaryAdditionalData = {
  [reference: string]: AVDhondtSummaryOptionData;
};

export type {
  AVDhondtSummaryBlankOption,
  AVDhondtSummaryOption,
  AVDhondtSummarySeat,
  AVDhondtSummaryResult,
  AVDhondtSummarySortedResult,
  AVDhondtSummaryOptionData,
  AVDhondtSummaryAdditionalData,
};
