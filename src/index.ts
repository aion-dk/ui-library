import type { App } from "vue";
import type { I18n } from "vue-i18n";
import localI18n from "@/i18n";
import { iconNames } from "@/helpers/iconHelper";
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
  //   AVVerticalStep,
  //   AVWaitingDots,
  //   AVFileInput,

  // MOLECULES
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  AVSearchBallot,
  AVSubmissionHelper,
  AVWriteInOption,
  AVSplitWeightHelper,
  AVSplitWizardHeader,
  AVRecommendationList,
  AVResultOption,
  //   AVAsyncButton,
  //   AVRadioGroup,
  //   AVNavigationItemList,
  //   AVBreadcrumb,
  //   AVElectionCard,
  //   AVBallotStyleCard,
  //   AVElectaContestCard,

  // ORGANISMS
  AVPileSummary,
  AVBallot,
  AVResourceSection,
  AVNormalSummary,
  AVRankedSummary,
  AVInstantRunoffSummary,
  AVDhondtSummary,
  //   AVFooter,
  //   AVSidebar,
  //   AVNavbar,
  //   AVContent,
  //   AVModal,
  //   AVCalculateResultContent,

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
    // app.component("AVVerticalStep", AVVerticalStep);
    // app.component("AVWaitingDots", AVWaitingDots);
    // app.component("AVFileInput", AVFileInput);

    // MOLECULES
    app.component("AVSummaryOption", AVSummaryOption);
    app.component("AVBlankOption", AVBlankOption);
    app.component("AVOption", AVOption);
    app.component("AVSearchBallot", AVSearchBallot);
    app.component("AVSubmissionHelper", AVSubmissionHelper);
    app.component("AVWriteInOption", AVWriteInOption);
    app.component("AVSplitWeightHelper", AVSplitWeightHelper);
    app.component("AVSplitWizardHeader", AVSplitWizardHeader);
    app.component("AVRecommendationList", AVRecommendationList);
    app.component("AVResultOption", AVResultOption);
    // app.component("AVAsyncButton", AVAsyncButton);
    // app.component("AVRadioGroup", AVRadioGroup);
    // app.component("AVNavigationItemList", AVNavigationItemList);
    // app.component("AVBreadcrumb", AVBreadcrumb);
    // app.component("AVElectionCard", AVElectionCard);
    // app.component("AVBallotStyleCard", AVBallotStyleCard);
    // app.component("AVElectaContestCard", AVElectaContestCard);

    // ORGANISMS
    app.component("AVPileSummary", AVPileSummary);
    app.component("AVBallot", AVBallot);
    app.component("AVResourceSection", AVResourceSection);
    app.component("AVNormalSummary", AVNormalSummary);
    app.component("AVRankedSummary", AVRankedSummary);
    app.component("AVInstantRunoffSummary", AVInstantRunoffSummary);
    app.component("AVDhondtSummary", AVDhondtSummary);
    // app.component("AVFooter", AVFooter);
    // app.component("AVSidebar", AVSidebar);
    // app.component("AVNavbar", AVNavbar);
    // app.component("AVContent", AVContent);
    // app.component("AVModal", AVModal);
    // app.component("AVCalculateResultContent", AVCalculateResultContent);

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
  //   AVVerticalStep,
  //   AVWaitingDots,
  //   AVFileInput,

  // MOLECULES
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  AVSearchBallot,
  AVSubmissionHelper,
  AVWriteInOption,
  AVSplitWeightHelper,
  AVSplitWizardHeader,
  AVRecommendationList,
  AVResultOption,
  //   AVAsyncButton,
  //   AVRadioGroup,
  //   AVNavigationItemList,
  //   AVBreadcrumb,
  //   AVElectionCard,
  //   AVBallotStyleCard,
  //   AVElectaContestCard,

  // ORGANISMS
  AVPileSummary,
  AVBallot,
  AVResourceSection,
  AVNormalSummary,
  AVRankedSummary,
  AVInstantRunoffSummary,
  AVDhondtSummary,
  //   AVFooter,
  //   AVSidebar,
  //   AVNavbar,
  //   AVContent,
  //   AVModal,
  //   AVCalculateResultContent,

  // TEMPLATES
  AVSplitHelper,

  // ...Components

  // HELPERS
  iconNames,
};
