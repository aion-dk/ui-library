import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/vue3";

// Import the a11y addon annotations
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

// Optionally import your own annotations
import * as projectAnnotations from "./preview";

const project = setProjectAnnotations([
  // Add the a11y addon annotations
  a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(project.beforeAll);
