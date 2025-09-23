import type { PartialResult } from "@/types";

type OptionArg =
  | "description"
  | "selectable"
  | "exclusive"
  | "children"
  | "color"
  | "url"
  | "video"
  | "randomizeChildren"
  | "image"
  | "candidacy"
  | "gallery"
  | "gallery_parents";

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
  | "many_options"
  | "huge"
  | "gallery"
  | "gallery_parents"
  | "gallery_short"
  | "allow_splitting";

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
