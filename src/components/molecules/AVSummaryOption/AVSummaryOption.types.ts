import type { LocalString, OptionContent } from "@/types";

interface AVSummaryOptionObject {
  title: LocalString;
  handle: string;
  image?: string;
  description?: LocalString;
  crosses: number;
  rank?: number;
  parent?: OptionContent;
  accentColor?: `#${string}`;
  writeIn?: boolean;
}

interface AVSummaryOptionParent {
  title: LocalString;
  accentColor?: `#${string}`;
}

export type { AVSummaryOptionObject, AVSummaryOptionParent };
