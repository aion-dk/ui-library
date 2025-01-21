import type { App } from "vue";
// import type { I18n } from "vue-i18n";
// import localI18n from "@/i18n";
import { iconNames } from "@/helpers/iconHelper";
// import FloatingVue from "floating-vue";
// import "floating-vue/dist/style.css";

import {
  // ATOMS
  AVIcon,
  //   AVButton,
  //   AVSpinner,
  //   AVBullet,
  //   AVTextInput,
  //   AVNumberInput,
  //   AVPasswordInput,
  //   AVCard,
  //   AVRoundButton,
  //   AVLabel,
  //   AVDatetimeInput,
  //   AVTextArea,
  //   AVDropdown,
  //   AVDropdownContent,
  //   AVDropdownItem,
  //   AVAlert,
  //   AVFileInput,
  //   AVRadio,
  //   AVLink,
  //   AVNavbarItem,
  //   AVSidebarItem,
  //   AVTooltip,
  //   AVMenuDropdown,
  //   AVMenuDropdownItem,
  //   AVMenuDropdownContent,
  //   AVAsyncButton,
  //   AVTabSwitcher,
  //   AVBallotSummary,
  //   AVTimedCard,
  //   AVBasicSteps,
  //   AVSteps,
  //   AVOptionSelect,
  //   AVOptionCheckbox,
  //   AVAnimatedTransition,
  //   AVCollapser,
  //   AVLinkVisualizer,
  //   AVVerticalStep,
  //   AVAnimatedMenuButton,
  //   AVProgressBar,
  //   AVWaitingDots,

  //   // MOLECULES
  //   AVRadioGroup,
  //   AVNavigationItemList,
  //   AVBreadcrumb,
  //   AVElectionCard,
  //   AVBallotStyleCard,
  //   AVSummaryOption,
  //   AVOption,
  //   AVBlankOption,
  //   AVWriteInOption,
  //   AVSubmissionHelper,
  //   AVSearchBallot,
  //   AVSplitWeightHelper,
  //   AVSplitWizardHeader,
  //   AVElectaContestCard,
  //   AVResultOption,
  //   AVRecommendationList,

  //   // ORGANISMS
  //   AVFooter,
  //   AVSidebar,
  //   AVNavbar,
  //   AVContent,
  //   AVModal,
  //   AVBallot,
  //   AVPileSummary,
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

  //   // ...Components
} from "@/components";

export default {
  // install: (app: App, i18n: I18n = null) => {
  install: (app: App) => {
    // app.use(FloatingVue);

    // ATOMS
    app.component("AVIcon", AVIcon);
    // app.component("AVButton", AVButton);
    // app.component("AVSpinner", AVSpinner);
    // app.component("AVBullet", AVBullet);
    // app.component("AVTextInput", AVTextInput);
    // app.component("AVNumberInput", AVNumberInput);
    // app.component("AVPasswordInput", AVPasswordInput);
    // app.component("AVDatetimeInput", AVDatetimeInput);
    // app.component("AVTextArea", AVTextArea);
    // app.component("AVCard", AVCard);
    // app.component("AVRoundButton", AVRoundButton);
    // app.component("AVLabel", AVLabel);
    // app.component("AVDropdown", AVDropdown);
    // app.component("AVDropdownContent", AVDropdownContent);
    // app.component("AVDropdownItem", AVDropdownItem);
    // app.component("AVAlert", AVAlert);
    // app.component("AVFileInput", AVFileInput);
    // app.component("AVRadio", AVRadio);
    // app.component("AVLink", AVLink);
    // app.component("AVNavbarItem", AVNavbarItem);
    // app.component("AVSidebarItem", AVSidebarItem);
    // app.component("AVTooltip", AVTooltip);
    // app.component("AVMenuDropdown", AVMenuDropdown);
    // app.component("AVMenuDropdownContent", AVMenuDropdownContent);
    // app.component("AVMenuDropdownItem", AVMenuDropdownItem);
    // app.component("AVAsyncButton", AVAsyncButton);
    // app.component("AVTabSwitcher", AVTabSwitcher);
    // app.component("AVBallotSummary", AVBallotSummary);
    // app.component("AVTimedCard", AVTimedCard);
    // app.component("AVBasicSteps", AVBasicSteps);
    // app.component("AVSteps", AVSteps);
    // app.component("AVOptionSelect", AVOptionSelect);
    // app.component("AVOptionCheckbox", AVOptionCheckbox);
    // app.component("AVAnimatedTransition", AVAnimatedTransition);
    // app.component("AVCollapser", AVCollapser);
    // app.component("AVLinkVisualizer", AVLinkVisualizer);
    // app.component("AVVerticalStep", AVVerticalStep);
    // app.component("AVAnimatedMenuButton", AVAnimatedMenuButton);
    // app.component("AVProgressBar", AVProgressBar);
    // app.component("AVWaitingDots", AVWaitingDots);

    // MOLECULES
    // app.component("AVRadioGroup", AVRadioGroup);
    // app.component("AVNavigationItemList", AVNavigationItemList);
    // app.component("AVBreadcrumb", AVBreadcrumb);
    // app.component("AVElectionCard", AVElectionCard);
    // app.component("AVBallotStyleCard", AVBallotStyleCard);
    // app.component("AVSummaryOption", AVSummaryOption);
    // app.component("AVOption", AVOption);
    // app.component("AVBlankOption", AVBlankOption);
    // app.component("AVWriteInOption", AVWriteInOption);
    // app.component("AVSubmissionHelper", AVSubmissionHelper);
    // app.component("AVSearchBallot", AVSearchBallot);
    // app.component("AVSplitWeightHelper", AVSplitWeightHelper);
    // app.component("AVSplitWizardHeader", AVSplitWizardHeader);
    // app.component("AVElectaContestCard", AVElectaContestCard);
    // app.component("AVResultOption", AVResultOption);
    // app.component("AVRecommendationList", AVRecommendationList);

    // ORGANISMS
    // app.component("AVFooter", AVFooter);
    // app.component("AVSidebar", AVSidebar);
    // app.component("AVNavbar", AVNavbar);
    // app.component("AVContent", AVContent);
    // app.component("AVModal", AVModal);
    // app.component("AVBallot", AVBallot);
    // app.component("AVPileSummary", AVPileSummary);
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
    // app.provide("i18n", i18n ? i18n : localI18n);
    // app.provide("iconNames", iconNames);
  },
};

export {
  // ATOMS
  AVIcon,
  //   AVButton,
  //   AVSpinner,
  //   AVBullet,
  //   AVTextInput,
  //   AVNumberInput,
  //   AVPasswordInput,
  //   AVCard,
  //   AVRoundButton,
  //   AVLabel,
  //   AVDatetimeInput,
  //   AVTextArea,
  //   AVDropdown,
  //   AVDropdownContent,
  //   AVDropdownItem,
  //   AVAlert,
  //   AVFileInput,
  //   AVRadio,
  //   AVLink,
  //   AVNavbarItem,
  //   AVSidebarItem,
  //   AVTooltip,
  //   AVMenuDropdown,
  //   AVMenuDropdownItem,
  //   AVMenuDropdownContent,
  //   AVAsyncButton,
  //   AVTabSwitcher,
  //   AVBallotSummary,
  //   AVTimedCard,
  //   AVBasicSteps,
  //   AVSteps,
  //   AVOptionSelect,
  //   AVOptionCheckbox,
  //   AVAnimatedTransition,
  //   AVCollapser,
  //   AVLinkVisualizer,
  //   AVProgressBar,
  //   AVWaitingDots,

  //   // MOLECULES
  //   AVRadioGroup,
  //   AVNavigationItemList,
  //   AVBreadcrumb,
  //   AVElectionCard,
  //   AVBallotStyleCard,
  //   AVSummaryOption,
  //   AVOption,
  //   AVBlankOption,
  //   AVWriteInOption,
  //   AVSubmissionHelper,
  //   AVSearchBallot,
  //   AVSplitWeightHelper,
  //   AVSplitWizardHeader,
  //   AVElectaContestCard,
  //   AVResultOption,
  //   AVRecommendationList,

  //   // ORGANISMS
  //   AVFooter,
  //   AVSidebar,
  //   AVNavbar,
  //   AVContent,
  //   AVModal,
  //   AVBallot,
  //   AVPileSummary,
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
