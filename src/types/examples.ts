import type { PartialResult } from "@/types";

type OptionArg =
  | "description"
  | "selectable"
  | "exclusive"
  | "children"
  | "color"
  | "url"
  | "randomizeChildren"
  | "image"
  | "candidacy";

type ContestArg =
  | "description"
  | "question"
  | "collapsable"
  | "collapse_default"
  | "search_form"
  | "blank"
  | "multi"
  | "ranked"
  | "multiple_votes_sm"
  | "multiple_votes_lg"
  | "randomize"
  | "color_options"
  | "children_options"
  | "default_options"
  | "complete_options"
  | "many_options";

type SelectionPileArg =
  | "single"
  | "multi"
  | "weighted"
  | "blank"
  | "many"
  | "children"
  | "multivote";

type ContestSelectionArg = "half" | "complete";

interface LiveResult {
  [key: string]: PartialResult;
}

type ExampleColor = {
  [key: number]: string;
};

export type {
  ExampleColor,
  ContestArg,
  ContestSelectionArg,
  LiveResult,
  OptionArg,
  SelectionPileArg,
};
