import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import type { ConfigEnv } from "vite";
import viteConfig from "./vite.config";

export default defineConfig(
  mergeConfig(viteConfig({ command: "serve", mode: "test" } as ConfigEnv), {
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      setupFiles: ["./.storybook/vitest.setup.ts"],
      coverage: {
        provider: "istanbul",
        include: ["src/components/**"],
        extension: [".ts", ".vue"],
        exclude: [
          "**/*.stories.ts",
          "**/*.mdx",
          "**/*.messages.ts",
          "**/*.types.ts",
          "**/atoms/AVIcon/**",
          "**/atoms/AVAnimatedTransition/**",
          "**/atoms/AVWaitingDots/**",
          "**/atoms/AVFileInput/**", // Lot of stuff can't be easily tested, but covered in Liminal.
          "**/atoms/AVShowMore/**", // Same as above.
        ],
        thresholds: {
          lines: 90,
          functions: 90,
          statements: 80,
          branches: 70,
        },
      },
    },
  }),
);
