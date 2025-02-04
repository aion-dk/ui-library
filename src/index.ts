import type { App } from "vue";
import type { I18n } from "vue-i18n";
import localI18n from "@/i18n";
import { iconNames } from "@/helpers/iconHelper";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import "@/bootstrap/bootstrap.customized.scss";

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
  //   AVVerticalStep,
  //   AVAnimatedMenuButton,
  //   AVProgressBar,
  //   AVWaitingDots,

  // MOLECULES
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  //   AVAsyncButton,
  //   AVRadioGroup,
  //   AVNavigationItemList,
  //   AVBreadcrumb,
  //   AVElectionCard,
  //   AVBallotStyleCard,
  //   AVWriteInOption,
  //   AVSubmissionHelper,
  //   AVSearchBallot,
  //   AVSplitWeightHelper,
  //   AVSplitWizardHeader,
  //   AVElectaContestCard,
  //   AVResultOption,
  //   AVRecommendationList,

  // ORGANISMS
  AVPileSummary,
  //   AVFooter,
  //   AVSidebar,
  //   AVNavbar,
  //   AVContent,
  //   AVModal,
  //   AVBallot,
  //   AVSplitHelper,
  //   AVResourceSection,
  //   AVCalculateResultContent,
  //   AVNormalSummary,
  //   AVRankedSummary,
  //   AVInstantRunoffSummary,

  // TEMPLATES
  //   OneColumnLayout,
  //   TwoColumnsLayout,
  //   NoSidebarLayout,
  //   ElectionDashboardLayout,

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
    // app.component("AVVerticalStep", AVVerticalStep);
    // app.component("AVAnimatedMenuButton", AVAnimatedMenuButton);
    // app.component("AVProgressBar", AVProgressBar);
    // app.component("AVWaitingDots", AVWaitingDots);

    // MOLECULES
    app.component("AVSummaryOption", AVSummaryOption);
    app.component("AVBlankOption", AVBlankOption);
    app.component("AVOption", AVOption);
    // app.component("AVAsyncButton", AVAsyncButton);
    // app.component("AVRadioGroup", AVRadioGroup);
    // app.component("AVNavigationItemList", AVNavigationItemList);
    // app.component("AVBreadcrumb", AVBreadcrumb);
    // app.component("AVElectionCard", AVElectionCard);
    // app.component("AVBallotStyleCard", AVBallotStyleCard);
    // app.component("AVWriteInOption", AVWriteInOption);
    // app.component("AVSubmissionHelper", AVSubmissionHelper);
    // app.component("AVSearchBallot", AVSearchBallot);
    // app.component("AVSplitWeightHelper", AVSplitWeightHelper);
    // app.component("AVSplitWizardHeader", AVSplitWizardHeader);
    // app.component("AVElectaContestCard", AVElectaContestCard);
    // app.component("AVResultOption", AVResultOption);
    // app.component("AVRecommendationList", AVRecommendationList);

    // ORGANISMS
    app.component("AVPileSummary", AVPileSummary);
    // app.component("AVFooter", AVFooter);
    // app.component("AVSidebar", AVSidebar);
    // app.component("AVNavbar", AVNavbar);
    // app.component("AVContent", AVContent);
    // app.component("AVModal", AVModal);
    // app.component("AVBallot", AVBallot);
    // app.component("AVSplitHelper", AVSplitHelper);
    // app.component("AVResourceSection", AVResourceSection);
    // app.component("AVCalculateResultContent", AVCalculateResultContent);
    // app.component("AVNormalSummary", AVNormalSummary);
    // app.component("AVRankedSummary", AVRankedSummary);
    // app.component("AVInstantRunoffSummary", AVInstantRunoffSummary);

    // TEMPLATES
    // app.component("OneColumnLayout", OneColumnLayout);
    // app.component("TwoColumnsLayout", TwoColumnsLayout);
    // app.component("NoSidebarLayout", NoSidebarLayout);
    // app.component("ElectionDashboardLayout", ElectionDashboardLayout);

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
  //   AVProgressBar,
  //   AVWaitingDots,

  // MOLECULES
  AVSummaryOption,
  AVBlankOption,
  AVOption,
  //   AVAsyncButton,
  //   AVRadioGroup,
  //   AVNavigationItemList,
  //   AVBreadcrumb,
  //   AVElectionCard,
  //   AVBallotStyleCard,
  //   AVWriteInOption,
  //   AVSubmissionHelper,
  //   AVSearchBallot,
  //   AVSplitWeightHelper,
  //   AVSplitWizardHeader,
  //   AVElectaContestCard,
  //   AVResultOption,
  //   AVRecommendationList,

  // ORGANISMS
  AVPileSummary,
  //   AVFooter,
  //   AVSidebar,
  //   AVNavbar,
  //   AVContent,
  //   AVModal,
  //   AVBallot,
  //   AVSplitHelper,
  //   AVResourceSection,
  //   AVCalculateResultContent,
  //   AVNormalSummary,
  //   AVRankedSummary,
  //   AVInstantRunoffSummary,

  //   // TEMPLATES
  //   OneColumnLayout,
  //   TwoColumnsLayout,
  //   NoSidebarLayout,
  //   ElectionDashboardLayout,

  // ...Components

  // HELPERS
  iconNames,
};
