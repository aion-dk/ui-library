import { useEffect, useGlobals } from "storybook/preview-api";
import type { Decorator } from "@storybook/vue3-vite";
import { switchLocale } from "../src/i18n";
import { computed, ref, watch } from "vue";

const sbLocale = ref<Locale>("en");

const decorators: Decorator[] = [
  (story, context) => {
    const [{ locale }] = useGlobals();

    useEffect(() => {
      sbLocale.value = locale;
    }, [locale]);

    return {
      template: `<div ref="element" :data-bs-theme="colorMode"><story /></div>`,
      components: { story },
      setup() {
        const element = ref("");
        const colorMode = computed(() =>
          context.globals.backgrounds?.value === "dark" ? "dark" : "light",
        );
        watch(sbLocale, (newLocale) => {
          switchLocale(newLocale);
          const dir = newLocale === "ar" ? "rtl" : "ltr";
          document.querySelector("html")?.setAttribute("dir", dir);
          document.querySelector("html")?.setAttribute("lang", newLocale);
        });
        return { element, colorMode };
      },
    };
  },
];

export default decorators;
