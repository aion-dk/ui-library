import { createI18n } from "vue-i18n";
import localMessages from "@/i18n/LocalMessages";

type SupportedLocales =
  | "ar"
  | "ca"
  | "da"
  | "de"
  | "en"
  | "es"
  | "fi"
  | "fr"
  | "is"
  | "nl"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sv";

const localI18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  warnHtmlInMessage: "off",
  messages: localMessages,
});

const switchLocale = (locale: SupportedLocales) => (localI18n.global.locale = locale);

export { switchLocale };
export default localI18n;
export type { SupportedLocales };
