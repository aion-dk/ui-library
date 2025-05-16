import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import localI18n from "../src/i18n";
import decorators from "./decorators";
import globals from "./globals";
import parameters from "./parameters";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import "@/bootstrap"; // Bootstrap JS
import "@/bootstrap/local-style-entrypoint.scss"; // Bootstrap CSS + Mocked theme CSS

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
  AVBallot,
  AVSplitWeightHelper,
  AVSplitWizardHeader,
  AVResultOption,
  AVProgressBar,
  AVTweenedCount,
  AVResultSummaryItem,
  AVWaitingDots,
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
  app.component("AVBallot", AVBallot);
  app.component("AVSplitWeightHelper", AVSplitWeightHelper);
  app.component("AVSplitWizardHeader", AVSplitWizardHeader);
  app.component("AVResultOption", AVResultOption);
  app.component("AVProgressBar", AVProgressBar);
  app.component("AVTweenedCount", AVTweenedCount);
  app.component("AVResultSummaryItem", AVResultSummaryItem);
  app.component("AVWaitingDots", AVWaitingDots);

  app.provide("i18n", localI18n);
  app.use(localI18n);
  app.use(FloatingVue);
});

const preview: Preview = {
  parameters: parameters,
  globalTypes: globals,
  decorators: decorators,
  tags: ["autodocs"],
};

export default preview;
