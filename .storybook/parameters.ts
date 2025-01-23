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
          // Don't show accesibility warnings regarding VUE devtools
          id: "aria-prohibited-attr",
          selector: ".panel-entry-btn",
          enabled: false,
        },
      ],
    },
  },
};

export default parameters;
