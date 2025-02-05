import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import localI18n from "../src/i18n";
import decorators from "./decorators";
import globals from "./globals";
import parameters from "./parameters";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import "@/bootstrap/bootstrap.customized.scss"; // Bootstrap CSS
import "@/bootstrap"; // Bootstrap JS
import "@/bootstrap/mock.scss"; // Mocked theme CSS

import {
  AVIcon,
  AVAnimatedTransition,
  AVSpinner,
  AVCollapser,
  AVLinkVisualizer,
  AVOptionSelect,
  AVOptionCheckbox,
  AVTooltip,
  AVOptionLiveResults,
  AVSummaryOption,
  AVPileSummary,
  AVBlankOption,
  AVOption,
  AVSearchBallot,
  AVSubmissionHelper,
  AVWriteInOption,
  //   AVSplitWizardHeader,
  //   AVBallot,
  //   AVSplitWeightHelper,
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
  app.component("AVOptionCheckbox", AVOptionCheckbox);
  app.component("AVTooltip", AVTooltip);
  app.component("AVOptionLiveResults", AVOptionLiveResults);
  app.component("AVSummaryOption", AVSummaryOption);
  app.component("AVPileSummary", AVPileSummary);
  app.component("AVBlankOption", AVBlankOption);
  app.component("AVOption", AVOption);
  app.component("AVSearchBallot", AVSearchBallot);
  app.component("AVSubmissionHelper", AVSubmissionHelper);
  app.component("AVWriteInOption", AVWriteInOption);
  // app.component("AVSplitWizardHeader", AVSplitWizardHeader);
  // app.component("AVBallot", AVBallot);
  // app.component("AVSplitWeightHelper", AVSplitWeightHelper);
  // app.component("AVElectaContestCard", AVElectaContestCard);
  // app.component("AVProgressBar", AVProgressBar);
  // app.component("AVWaitingDots", AVWaitingDots);
  // app.component("AVResultOption", AVResultOption);

  app.provide("i18n", localI18n);
  app.use(localI18n);
  app.use(FloatingVue);
});

const preview: Preview = {
  parameters: parameters,
  globalTypes: globals,
  decorators: decorators,
};

export default preview;
