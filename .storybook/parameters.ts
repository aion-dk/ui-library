import { SUPPORTED_LOCALES } from "../src/constants";
import localI18n from "../src/i18n";

const parameters = {
  locale: localI18n.global.locale.value,
  locales: SUPPORTED_LOCALES,
  actions: { argTypesRegex: "^on.*" },
  backgrounds: {
    options: {
      light: { name: "Light", value: "#FFFFFF" },
      dark: { name: "Dark", value: "#1e293b" },
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
  a11y: {
    context: "body",
    config: {
      // Pin the WCAG conformance levels evaluated by axe so coverage is deterministic
      // across axe-core upgrades. Must live in `config` (passed to axe.configure),
      // NOT `options` (passed to axe.run), because `options.runOnly` overrides rule disables.
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
      },
      rules: [
        {
          // Don't show accessibility warnings regarding VUE devtools.
          id: "aria-prohibited-attr",
          selector: ".panel-entry-btn",
          enabled: false,
        },
        {
          // Don't show accessibility warnings on Playwright messups.
          id: "region",
          selector: "#storybook-root",
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
        {
          // Page-level rule: isolated stories are not full pages, so a single <main> landmark is not expected.
          id: "landmark-one-main",
          enabled: false,
        },
        {
          // Page-level rule: isolated stories are not full pages, so an h1 is not expected.
          id: "page-has-heading-one",
          enabled: false,
        },
        {
          // Page-level rule: a "skip to content" link is a full-page concern, not relevant to isolated components.
          id: "bypass",
          enabled: false,
        },
      ],
    },
    test: "error",
  },
};

export default parameters;
