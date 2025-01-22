import { useEffect, useGlobals } from "@storybook/preview-api";
import type { Decorator } from "@storybook/vue3";
import localI18n from "../src/i18n";
import { ref, watch } from "vue";
import type { Locale } from "vue-i18n";

const sbLocale = ref<Locale>("en");

const decorators: Decorator[] = [
  (story) => {
    const [{ locale }] = useGlobals();

    useEffect(() => {
      sbLocale.value = locale;
    }, [locale]);

    return {
      template: `<div ref="element"><story /></div>`,
      components: { story },
      setup() {
        const element = ref("");
        watch(sbLocale, (newLocale) => {
          localI18n.global.locale = newLocale;
          const dir = newLocale === "ar" ? "rtl" : "ltr";
          document.querySelector("html")?.setAttribute("dir", dir);
          document.querySelector("html")?.setAttribute("lang", newLocale);
        });
        return { element };
      },
    };
  },
];

export default decorators;
