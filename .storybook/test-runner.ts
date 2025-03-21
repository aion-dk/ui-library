import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext, waitForPageReady } from "@storybook/test-runner";

import { injectAxe, checkA11y, configureAxe } from "axe-playwright";

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const mutex = new Set();

const config: TestRunnerConfig = {
  async preVisit(page) {
    while (mutex.size > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    mutex.add(page);
    await injectAxe(page);
    mutex.delete(page);
  },

  async postVisit(page, context) {
    await waitForPageReady(page);
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    const element = storyContext.parameters?.a11y?.element ?? "body";

    await checkA11y(page, element, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
