import type { App } from "vue";
import type { I18n } from "vue-i18n";
import localI18n from "@/i18n";
import { iconNames } from "@/helpers/iconHelper";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { getTextContrastColor } from "@/helpers/contrastCalculator";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

export {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
} from "bootstrap";

export { animate } from "motion";

import {
  // ATOMS
  AVIcon,
  AVAnimatedTransition,
  AVSpinner,
  AVCollapser,
  AVLinkVisualizer,
  AVOptionSelect,
  AVOptionCheckbox,
  AVTooltip,
  AVOptionLiveResults,
  AVProgressBar,
  AVAnimatedMenuButton,
  AVTweenedCount,
  AVFileInput,
  AVResultSummaryItem,
  AVVerticalStep,
  AVWaitingDots,
  AVShowMore,

  // MOLECULES
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  AVSearchBallot,
  AVSubmissionHelper,
  AVSplitWeightHelper,
  AVSplitWizardHeader,
  AVRecommendationList,
  AVResultOption,
  AVElectaContestCard,
  AVAsyncButton,

  // ORGANISMS
  AVPileSummary,
  AVBallot,
  AVResourceSection,
  AVNormalSummary,
  AVRankedSummary,
  AVInstantRunoffSummary,
  AVDhondtAPSummary,
  AVDhondtSummary,
  AVCalculateResultContent,

  // TEMPLATES
  AVSplitHelper,

  // ...Components
} from "@/components";

export default {
  install: (app: App, i18n: I18n | null = null) => {
    app.use(FloatingVue);

    // ATOMS
    app.component("AVIcon", AVIcon);
    app.component("AVAnimatedTransition", AVAnimatedTransition);
    app.component("AVSpinner", AVSpinner);
    app.component("AVCollapser", AVCollapser);
    app.component("AVLinkVisualizer", AVLinkVisualizer);
    app.component("AVOptionSelect", AVOptionSelect);
    app.component("AVOptionCheckbox", AVOptionCheckbox);
    app.component("AVTooltip", AVTooltip);
    app.component("AVOptionLiveResults", AVOptionLiveResults);
    app.component("AVProgressBar", AVProgressBar);
    app.component("AVAnimatedMenuButton", AVAnimatedMenuButton);
    app.component("AVTweenedCount", AVTweenedCount);
    app.component("AVFileInput", AVFileInput);
    app.component("AVResultSummaryItem", AVResultSummaryItem);
    app.component("AVVerticalStep", AVVerticalStep);
    app.component("AVWaitingDots", AVWaitingDots);
    app.component("AVShowMore", AVShowMore);

    // MOLECULES
    app.component("AVSummaryOption", AVSummaryOption);
    app.component("AVBlankOption", AVBlankOption);
    app.component("AVOption", AVOption);
    app.component("AVSearchBallot", AVSearchBallot);
    app.component("AVSubmissionHelper", AVSubmissionHelper);
    app.component("AVSplitWeightHelper", AVSplitWeightHelper);
    app.component("AVSplitWizardHeader", AVSplitWizardHeader);
    app.component("AVRecommendationList", AVRecommendationList);
    app.component("AVResultOption", AVResultOption);
    app.component("AVElectaContestCard", AVElectaContestCard);
    app.component("AVAsyncButton", AVAsyncButton);

    // ORGANISMS
    app.component("AVPileSummary", AVPileSummary);
    app.component("AVBallot", AVBallot);
    app.component("AVResourceSection", AVResourceSection);
    app.component("AVNormalSummary", AVNormalSummary);
    app.component("AVRankedSummary", AVRankedSummary);
    app.component("AVInstantRunoffSummary", AVInstantRunoffSummary);
    app.component("AVDhondtAPSummary", AVDhondtAPSummary);
    app.component("AVDhondtSummary", AVDhondtSummary);
    app.component("AVCalculateResultContent", AVCalculateResultContent);

    // TEMPLATES
    app.component("AVSplitHelper", AVSplitHelper);

    // COMPOSABLES
    app.provide("i18n", i18n ? i18n : localI18n);
    app.provide("iconNames", iconNames);
  },
};

export {
  // ATOMS
  AVIcon,
  AVAnimatedTransition,
  AVSpinner,
  AVCollapser,
  AVLinkVisualizer,
  AVOptionSelect,
  AVOptionCheckbox,
  AVTooltip,
  AVOptionLiveResults,
  AVProgressBar,
  AVAnimatedMenuButton,
  AVTweenedCount,
  AVFileInput,
  AVResultSummaryItem,
  AVVerticalStep,
  AVWaitingDots,
  AVShowMore,

  // MOLECULES
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  AVSearchBallot,
  AVSubmissionHelper,
  AVSplitWeightHelper,
  AVSplitWizardHeader,
  AVRecommendationList,
  AVResultOption,
  AVElectaContestCard,
  AVAsyncButton,

  // ORGANISMS
  AVPileSummary,
  AVBallot,
  AVResourceSection,
  AVNormalSummary,
  AVRankedSummary,
  AVInstantRunoffSummary,
  AVDhondtAPSummary,
  AVDhondtSummary,
  AVCalculateResultContent,

  // TEMPLATES
  AVSplitHelper,

  // ...Components

  // HELPERS
  iconNames,
  getMeaningfulLabel,
  getTextContrastColor,
};
