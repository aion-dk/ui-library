import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import localI18n from "../src/i18n";
import decorators from "./decorators";
import globals from "./globals";
import parameters from "./parameters";
import "@/bootstrap/bootstrap.customized.scss"; // Bootstrap CSS
import "@/bootstrap"; // Bootstrap JS

import {
  AVIcon,
  AVAnimatedTransition,
  AVSpinner,
  AVCollapser,
  AVLinkVisualizer,
  AVOptionSelect,
  //   AVTooltip,
  //   AVSplitWizardHeader,
  //   AVBallot,
  //   AVPileSummary,
  //   AVSplitWeightHelper,
  //   AVOption,
  //   AVBlankOption,
  //   AVOptionCheckbox,
  //   AVSummaryOption,
  //   AVSearchBallot,
  //   AVWriteInOption,
  //   AVSubmissionHelper,
  //   AVElectaContestCard,
  //   AVProgressBar,
  //   AVWaitingDots,
  //   AVResultOption,
} from "../src";

setup((app) => {
  app.component("AVIcon", AVIcon);
  app.component("AVAnimatedTransition", AVAnimatedTransition);
  app.component("AVSpinner", AVSpinner);
  app.component("AVCollapser", AVCollapser);
  app.component("AVLinkVisualizer", AVLinkVisualizer);
  app.component("AVOptionSelect", AVOptionSelect);
  // app.component("AVTooltip", AVTooltip);
  // app.component("AVSplitWizardHeader", AVSplitWizardHeader);
  // app.component("AVBallot", AVBallot);
  // app.component("AVPileSummary", AVPileSummary);
  // app.component("AVSplitWeightHelper", AVSplitWeightHelper);
  // app.component("AVOption", AVOption);
  // app.component("AVBlankOption", AVBlankOption);
  // app.component("AVOptionCheckbox", AVOptionCheckbox);
  // app.component("AVSummaryOption", AVSummaryOption);
  // app.component("AVSearchBallot", AVSearchBallot);
  // app.component("AVWriteInOption", AVWriteInOption);
  // app.component("AVSubmissionHelper", AVSubmissionHelper);
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
