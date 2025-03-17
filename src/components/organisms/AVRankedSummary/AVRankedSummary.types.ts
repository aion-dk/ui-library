import type { LocalString } from "@/types";

interface AVRankedSummaryResultOptionRow {
  reference: string;
  title: LocalString;
  rounds: {
    count: number;
    tied: boolean;
    elected: boolean;
  }[];
  tied: boolean;
  elected: boolean;
}

export type { AVRankedSummaryResultOptionRow };
