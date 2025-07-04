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
export * from "@/components/atoms/AVAnimatedMenuButton/AVAnimatedMenuButton.types";

// MOLECULES
export * from "@/components/molecules/AVSummaryOption/AVSummaryOption.types";
export * from "@/components/molecules/AVRecommendationList/AVRecommendationList.types";

// ORGANISMS
export * from "@/components/organisms/AVPileSummary/AVPileSummary.types";
export * from "@/components/organisms/AVRankedSummary/AVRankedSummary.types";
export * from "@/components/organisms/AVDhondtAPSummary/AVDhondtAPSummary.types";
export * from "@/components/organisms/AVDhondtSummary/AVDhondtSummary.types";
export * from "@/components/organisms/AVCalculateResultContent/AVCalculateResultContent.types";
export * from "@/components/organisms/AVBallot/AVBallot.types";

// TEMPLATES
export * from "@/components/templates/AVSplitHelper/AVSplitHelper.types";

export type { BootstrapColor, BootstrapBasicSize, BootstrapExpandedSize, ImageOption };
