import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVitest from "@vitest/eslint-plugin";
import vuejsA11y from "eslint-plugin-vuejs-accessibility";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

const a11yRecommendedConfig = vuejsA11y.configs["flat/recommended"].find(
  (config) => config.rules && Object.keys(config.rules).length > 0,
);
const a11yRecommendedRulesAsWarn = a11yRecommendedConfig
  ? Object.fromEntries(
      Object.entries(a11yRecommendedConfig.rules).map(([ruleId, value]) => [
        ruleId,
        Array.isArray(value) ? ["warn", ...value.slice(1)] : "warn",
      ]),
    )
  : {};

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/storybook-static/**"],
  },

  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),

  ...vuejsA11y.configs["flat/recommended"],
  {
    name: "app/vuejs-accessibility-warn",
    files: ["**/*.vue"],
    rules: a11yRecommendedRulesAsWarn,
  },

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  skipFormatting,

  {
    files: ["**/*.{ts,mts,tsx,vue}"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];
