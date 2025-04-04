import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        provider: "istanbul",
        include: ["src/components/**"],
        extension: [".ts", ".vue"],
        exclude: [
          "**/*.stories.ts",
          "**/*.messages.ts",
          "**/*.types.ts",
          "**/atoms/AVIcon/**",
          "**/atoms/AVAnimatedTransition/**",
          "**/atoms/AVFileInput/**", // Lot of stuff can't be easily tested, but covered in Liminal.
          "**/molecules/AVWriteInOption/**", // Not needed until we actually start using the component.
          "**/organisms/AVDhondtSummary/**", // SKIP TEMPORARILY
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
