import type { LocalString, OptionContent } from "@/types";

interface AVSummaryOptionObject {
  title: LocalString;
  handle: string;
  image?: string;
  crosses: number;
  rank?: number;
  parent?: OptionContent;
}

interface AVSummaryOptionParent {
  title: LocalString;
}

export type { AVSummaryOptionObject, AVSummaryOptionParent };
