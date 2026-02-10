import type { LocalString, OptionContent } from "@/types";

interface AVSummaryOptionObject {
  reference: string;
  title: LocalString;
  handle: string;
  image?: string;
  description?: LocalString;
  crosses: number;
  rank?: number;
  parent?: OptionContent;
  accentColor?: `#${string}`;
  writeIn?: string | undefined | null;
}

interface AVSummaryOptionParent {
  title: LocalString;
  accentColor?: `#${string}`;
}

export type { AVSummaryOptionObject, AVSummaryOptionParent };
