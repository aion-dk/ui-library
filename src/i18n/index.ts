import { createI18n } from "vue-i18n";
import localMessages from "@/i18n/LocalMessages";
import type { SupportedLocale } from "@/types";

const localI18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  warnHtmlInMessage: "off",
  messages: localMessages,
});

const switchLocale = (locale: SupportedLocale) => (localI18n.global.locale.value = locale);

export { switchLocale };
export default localI18n;
