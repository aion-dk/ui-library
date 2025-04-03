import type { LocalString } from "@/types";

interface AVDhondtResultOptionRow {
  reference: string;
  title: LocalString;
  count: number;
  tied: boolean;
  elected: boolean;
  group?: LocalString | null | undefined;
  comparativeFigure?: number | null | undefined;
}

export type { AVDhondtResultOptionRow };
