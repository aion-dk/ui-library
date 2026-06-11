import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: [
    "../src/components/Introduction.mdx",
    "../src/components/Colors.mdx",
    "../src/components/Typography.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "storybook-addon-rtl",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {},
  features: {
    backgrounds: true,
    viewport: true,
  },
};

export default config;
