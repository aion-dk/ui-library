import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import localI18n from "../src/i18n";
import decorators from "./decorators";
import globals from "./globals";
import parameters from "./parameters";
import "@/main.scss"; // Bootstrap CSS
import "@/bootstrap"; // Bootstrap JS

import {
  AVIcon,
  AVAnimatedTransition,
  AVSpinner,
  //   AVDropdownContent,
  //   AVDropdownItem,
  //   AVRadio,
  //   AVNavbarItem,
  //   AVMenuDropdownContent,
  //   AVMenuDropdownItem,
  //   AVSteps,
  //   AVNavigationItemList,
  //   AVMenuDropdown,
  //   AVNavbar,
  //   AVContent,
  //   AVSidebar,
  //   AVFooter,
  //   AVLabel,
  //   AVTabSwitcher,
  //   AVSidebarItem,
  //   AVButton,
  //   AVCard,
  //   AVElectionCard,
  //   AVTooltip,
  //   AVSplitWizardHeader,
  //   AVBallot,
  //   AVPileSummary,
  //   AVSplitWeightHelper,
  //   AVOption,
  //   AVBlankOption,
  //   AVOptionCheckbox,
  //   AVCollapser,
  //   AVOptionSelect,
  //   AVSummaryOption,
  //   AVSearchBallot,
  //   AVWriteInOption,
  //   AVSubmissionHelper,
  //   AVLinkVisualizer,
  //   AVElectaContestCard,
  //   AVProgressBar,
  //   AVWaitingDots,
  //   AVResultOption,
} from "../src";

setup((app) => {
  app.component("AVIcon", AVIcon);
  app.component("AVAnimatedTransition", AVAnimatedTransition);
  app.component("AVSpinner", AVSpinner);
  // app.component("AVDropdownContent", AVDropdownContent);
  // app.component("AVDropdownItem", AVDropdownItem);
  // app.component("AVRadio", AVRadio);
  // app.component("AVNavbarItem", AVNavbarItem);
  // app.component("AVMenuDropdownContent", AVMenuDropdownContent);
  // app.component("AVMenuDropdownItem", AVMenuDropdownItem);
  // app.component("AVSteps", AVSteps);
  // app.component("AVNavigationItemList", AVNavigationItemList);
  // app.component("AVMenuDropdown", AVMenuDropdown);
  // app.component("AVNavbar", AVNavbar);
  // app.component("AVContent", AVContent);
  // app.component("AVSidebar", AVSidebar);
  // app.component("AVFooter", AVFooter);
  // app.component("AVLabel", AVLabel);
  // app.component("AVTabSwitcher", AVTabSwitcher);
  // app.component("AVSidebarItem", AVSidebarItem);
  // app.component("AVButton", AVButton);
  // app.component("AVCard", AVCard);
  // app.component("AVElectionCard", AVElectionCard);
  // app.component("AVTooltip", AVTooltip);
  // app.component("AVSplitWizardHeader", AVSplitWizardHeader);
  // app.component("AVBallot", AVBallot);
  // app.component("AVPileSummary", AVPileSummary);
  // app.component("AVSplitWeightHelper", AVSplitWeightHelper);
  // app.component("AVOption", AVOption);
  // app.component("AVBlankOption", AVBlankOption);
  // app.component("AVOptionCheckbox", AVOptionCheckbox);
  // app.component("AVCollapser", AVCollapser);
  // app.component("AVOptionSelect", AVOptionSelect);
  // app.component("AVSummaryOption", AVSummaryOption);
  // app.component("AVSearchBallot", AVSearchBallot);
  // app.component("AVWriteInOption", AVWriteInOption);
  // app.component("AVSubmissionHelper", AVSubmissionHelper);
  // app.component("AVLinkVisualizer", AVLinkVisualizer);
  // app.component("AVElectaContestCard", AVElectaContestCard);
  // app.component("AVProgressBar", AVProgressBar);
  // app.component("AVWaitingDots", AVWaitingDots);
  // app.component("AVResultOption", AVResultOption);

  app.provide("i18n", localI18n);
  app.use(localI18n);
});

const preview: Preview = {
  parameters: parameters,
  globalTypes: globals,
  decorators: decorators,
};

export default preview;
