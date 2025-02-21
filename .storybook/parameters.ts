import { SUPPORTED_LOCALES } from "../src/constants/i18n";
import localI18n from "../src/i18n";

const parameters = {
  locale: localI18n.global.locale,
  locales: SUPPORTED_LOCALES,
  actions: { argTypesRegex: "^on.*" },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#FFFFFF" },
      { name: "dark", value: "#1e293b" },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
  a11y: {
    config: {
      rules: [
        {
          // Don't show accesibility warnings regarding VUE devtools.
          id: "aria-prohibited-attr",
          selector: ".panel-entry-btn",
          enabled: false,
        },
        {
          // Don't look at heading order because we are analyzing isolated components, so sometimes this won't make sense as it will be missing context.
          id: "heading-order",
          enabled: false,
        },
        {
          // These will always be Youtube/Vimeo embedded videos that we cannot change/fix, so we also don't care about accessibility inside them.
          id: "frame-tested",
          enabled: false,
        },
        {
          // Storybook doesn't know the actual background color when "dark mode" is enabled, as the table has a transparent background. This is why it incorrectly tags the contrast ratio as low.
          id: "color-contrast",
          selector: "[data-test=candidate-ranked-result]",
          enabled: false,
        },
      ],
    },
  },
};

export default parameters;
