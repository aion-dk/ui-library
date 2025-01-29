import type {
  BOOTSTRAP_COLORS,
  BOOTSTRAP_BASIC_SIZES,
  BOOTSTRAP_EXPANDED_SIZES,
} from "@/constants";

type BootstrapColor = (typeof BOOTSTRAP_COLORS)[number];

type BootstrapBasicSize = (typeof BOOTSTRAP_BASIC_SIZES)[number];

type BootstrapExpandedSize = (typeof BOOTSTRAP_EXPANDED_SIZES)[number];

export * from "@/components/atoms/AVSpinner/AVSpinner.types";
export * from "@/components/atoms/AVLinkVisualizer/AVLinkVisualizer.types";
export * from "@/components/atoms/AVTooltip/AVTooltip.types";
export * from "@/components/molecules/AVSummaryOption/AVSummaryOption.types";

// -------- Old stuff
import type { AVSummaryOptionObject } from "@/components/molecules/AVSummaryOption/AVSummaryOption.types";

type AVSplitHelperState = "ballot" | "assign" | "overview";
type AVPileSummaryState = AVSplitHelperState | "summary";
type ImageOption = "square" | "passport";

interface AVDropdownOption {
  value: unknown;
  label: string;
}

interface OptionSummary {
  options: AVSummaryOptionObject[];
  writeIns: AVSummaryWriteInObject[];
}

interface AVSummaryWriteInObject {
  partyLetter: string;
  partyName: string;
  candidateName: string;
}

type AVCalculateResultContentRole = "mixer" | "decrypter" | "all" | "observer";

type AVCalculateResultContentStatus =
  | "initial"
  | "mixing"
  | "decrypting"
  | "aggregating"
  | "finished";

type AVCalculateResultContentElapsed = `${string}:${string}:${string}`;

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

export type {
  BootstrapColor,
  BootstrapBasicSize,
  BootstrapExpandedSize,
  AVSplitHelperState,
  AVPileSummaryState,
  AVDropdownOption,
  AVSummaryWriteInObject,
  AVCalculateResultContentRole,
  AVCalculateResultContentStatus,
  AVCalculateResultContentElapsed,
  ImageOption,
  OptionSummary,
  AVRankedSummaryResultOptionRow,
};
