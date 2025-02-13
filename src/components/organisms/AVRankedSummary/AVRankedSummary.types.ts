interface AVRankedSummaryResultOptionRow {
  reference: string;
  title: Record<string, string>;
  rounds: {
    count: number;
    tied: boolean;
    elected: boolean;
  }[];
  tied: boolean;
  elected: boolean;
}

export type { AVRankedSummaryResultOptionRow };
