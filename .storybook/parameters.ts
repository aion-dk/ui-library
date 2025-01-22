import localI18n from "../src/i18n";

const parameters = {
  locale: localI18n.global.locale,
  locales: ["ar", "ca", "da", "de", "en", "es", "fi", "fr", "is", "nl", "pl", "pt", "ro", "ru", "sv"],
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
};

export default parameters;
