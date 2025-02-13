import type {
  BOOTSTRAP_COLORS,
  BOOTSTRAP_BASIC_SIZES,
  BOOTSTRAP_EXPANDED_SIZES,
  IMAGE_OPTIONS,
} from "@/constants";

type BootstrapColor = (typeof BOOTSTRAP_COLORS)[number];

type BootstrapBasicSize = (typeof BOOTSTRAP_BASIC_SIZES)[number];

type BootstrapExpandedSize = (typeof BOOTSTRAP_EXPANDED_SIZES)[number];

type ImageOption = (typeof IMAGE_OPTIONS)[number];

// ATOMS
export * from "@/components/atoms/AVSpinner/AVSpinner.types";
export * from "@/components/atoms/AVLinkVisualizer/AVLinkVisualizer.types";
export * from "@/components/atoms/AVTooltip/AVTooltip.types";
export * from "@/components/atoms/AVOptionLiveResults/AVOptionLiveResults.types";

// MOLECULES
export * from "@/components/molecules/AVSummaryOption/AVSummaryOption.types";
export * from "@/components/molecules/AVRecommendationList/AVRecommendationList.types";

// ORGANISMS
export * from "@/components/organisms/AVPileSummary/AVPileSummary.types";
export * from "@/components/organisms/AVRankedSummary/AVRankedSummary.types";

// TEMPLATES
export * from "@/components/templates/AVSplitHelper/AVSplitHelper.types";

// -------- Old stuff

interface AVDropdownOption {
  value: unknown;
  label: string;
}

type AVCalculateResultContentRole = "mixer" | "decrypter" | "all" | "observer";

type AVCalculateResultContentStatus =
  | "initial"
  | "mixing"
  | "decrypting"
  | "aggregating"
  | "finished";

type AVCalculateResultContentElapsed = `${string}:${string}:${string}`;

export type {
  BootstrapColor,
  BootstrapBasicSize,
  BootstrapExpandedSize,
  AVDropdownOption,
  AVCalculateResultContentRole,
  AVCalculateResultContentStatus,
  AVCalculateResultContentElapsed,
  ImageOption,
};
