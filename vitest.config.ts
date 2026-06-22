import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import type { ConfigEnv } from "vite";
import viteConfig from "./vite.config";
import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(
  mergeConfig(
    viteConfig({
      command: "serve",
      mode: "test",
    } as ConfigEnv),
    {
      test: {
        coverage: {
          provider: "istanbul",
          include: ["src/components/**", "src/helpers/**"],
          extension: [".ts", ".vue"],
          exclude: [
            "**/*.stories.ts",
            "**/*.mdx",
            "**/*.messages.ts",
            "**/*.types.ts",
            "**/atoms/AVIcon/**",
            "**/atoms/AVAnimatedTransition/**",
            "**/atoms/AVWaitingDots/**",
            "**/atoms/AVFileInput/**",
            // Lot of stuff can't be easily tested, but covered in Liminal.
            "**/atoms/AVShowMore/**", // Same as above.
          ],
          thresholds: {
            lines: 90,
            functions: 90,
            statements: 80,
            branches: 70,
          },
        },
        projects: [
          {
            extends: true,
            test: {
              name: "unit",
              environment: "jsdom",
              exclude: [...configDefaults.exclude, "e2e/**"],
              root: fileURLToPath(new URL("./", import.meta.url)),
              setupFiles: ["./.storybook/vitest.setup.ts"],
            },
          },
          {
            extends: true,
            plugins: [
              // The plugin will run tests for the stories defined in your Storybook config
              // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
              storybookTest({
                configDir: path.join(dirname, ".storybook"),
              }),
            ],
            test: {
              name: "storybook",
              exclude: [...configDefaults.exclude],
              browser: {
                enabled: true,
                headless: true,
                provider: playwright({}),
                instances: [
                  {
                    browser: "chromium",
                  },
                ],
              },
            },
          },
        ],
      },
    },
  ),
);
