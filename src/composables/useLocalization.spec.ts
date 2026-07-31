import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, type PropType } from "vue";
import { createI18n } from "vue-i18n";
import localI18n, { switchLocale } from "@/i18n";
import type { SupportedLocale } from "@/types";

import { useLocalization } from "./useLocalization";

// A key that exists in every locale of the library's own messages.
const SPINNER_KEY = "js.components.AVSpinner.loading";

const Child = defineComponent({
  props: {
    locale: {
      type: String as PropType<SupportedLocale>,
      default: null,
    },
  },
  setup(props) {
    const { locale, t } = useLocalization(() => props.locale);
    return () => h("span", { "data-test": "child", "data-locale": locale.value }, t(SPINNER_KEY));
  },
});

const Parent = defineComponent({
  props: {
    locale: {
      type: String as PropType<SupportedLocale>,
      default: null,
    },
    childLocale: {
      type: String as PropType<SupportedLocale>,
      default: null,
    },
  },
  setup(props) {
    const { locale, t } = useLocalization(() => props.locale);
    return () =>
      h("div", { "data-test": "parent", "data-locale": locale.value }, [
        h("span", { "data-test": "parent-text" }, t(SPINNER_KEY)),
        h(Child, { locale: props.childLocale }),
      ]);
  },
});

const mountWith = (props = {}, i18n: unknown = localI18n) =>
  mount(Parent, { props, global: { provide: { i18n } } });

describe("useLocalization", () => {
  afterEach(() => switchLocale("en"));

  it("falls back to the injected i18n instance's locale when no prop is given", () => {
    switchLocale("da");
    const wrapper = mountWith();

    expect(wrapper.find("[data-test=parent]").attributes()["data-locale"]).to.eq("da");
    expect(wrapper.find("[data-test=parent-text]").text()).to.eq("Indlæser...");
  });

  it("lets the prop override the injected instance's locale", () => {
    switchLocale("en");
    const wrapper = mountWith({ locale: "da" });

    expect(wrapper.find("[data-test=parent]").attributes()["data-locale"]).to.eq("da");
  });

  it("translates in the resolved locale, not the injected instance's global locale", () => {
    // The heart of the fix: `t` must carry the locale. Destructuring `i18n.global.t`
    // bound translations to the host app's global locale, so ballot content switched
    // while the library's own chrome stayed in the admin language.
    switchLocale("en");
    const wrapper = mountWith({ locale: "da" });

    expect(wrapper.find("[data-test=parent-text]").text()).to.eq("Indlæser...");
    // The injected instance itself is left untouched.
    expect(localI18n.global.locale.value).to.eq("en");
  });

  it("hands the resolved locale down to children that were not passed the prop", () => {
    switchLocale("en");
    const wrapper = mountWith({ locale: "da" });

    expect(wrapper.find("[data-test=child]").attributes()["data-locale"]).to.eq("da");
    expect(wrapper.find("[data-test=child]").text()).to.eq("Indlæser...");
  });

  it("lets a child's own prop win over the inherited locale", () => {
    switchLocale("en");
    const wrapper = mountWith({ locale: "da", childLocale: "de" });

    expect(wrapper.find("[data-test=parent]").attributes()["data-locale"]).to.eq("da");
    expect(wrapper.find("[data-test=child]").attributes()["data-locale"]).to.eq("de");
    expect(wrapper.find("[data-test=child]").text()).to.eq("Laden...");
  });

  it("reacts to prop changes, for both the component and its children", async () => {
    const wrapper = mountWith({ locale: "da" });
    expect(wrapper.find("[data-test=child]").text()).to.eq("Indlæser...");

    await wrapper.setProps({ locale: "de" });

    expect(wrapper.find("[data-test=parent]").attributes()["data-locale"]).to.eq("de");
    expect(wrapper.find("[data-test=child]").attributes()["data-locale"]).to.eq("de");
    expect(wrapper.find("[data-test=child]").text()).to.eq("Laden...");
  });

  it("reacts to the injected instance's locale changing when no prop is given", async () => {
    const wrapper = mountWith();
    expect(wrapper.find("[data-test=parent-text]").text()).to.eq("Loading...");

    switchLocale("da");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("[data-test=parent]").attributes()["data-locale"]).to.eq("da");
    expect(wrapper.find("[data-test=parent-text]").text()).to.eq("Indlæser...");
  });

  it("works without any provided i18n, so tests/storybook/playground keep rendering", () => {
    // No `provide` at all — `localI18n` is the inject default.
    const wrapper = mount(Parent, { props: { locale: "da" } });

    expect(wrapper.find("[data-test=parent-text]").text()).to.eq("Indlæser...");
    expect(wrapper.find("[data-test=child]").text()).to.eq("Indlæser...");
  });

  it("reads the locale off a legacy i18n instance, where it is a plain string", () => {
    const legacyI18n = createI18n({
      legacy: true,
      locale: "de",
      messages: localI18n.global.messages.value,
    });

    const wrapper = mountWith({}, legacyI18n);

    expect(wrapper.find("[data-test=parent]").attributes()["data-locale"]).to.eq("de");
    expect(wrapper.find("[data-test=parent-text]").text()).to.eq("Laden...");
  });

  it("keeps pluralization working while pinning the locale", () => {
    const Plural = defineComponent({
      props: { locale: { type: String as PropType<SupportedLocale>, default: null } },
      setup(props) {
        const { t } = useLocalization(() => props.locale);
        return () => h("span", {}, t("js.components.AVOptionCounter.amount", { n: 2 }));
      },
    });

    const wrapper = mount(Plural, {
      props: { locale: "en" },
      global: { provide: { i18n: localI18n } },
    });

    expect(wrapper.text()).to.eq("2 votes");
  });

  it("formats dates in the resolved locale", () => {
    const Dated = defineComponent({
      props: { locale: { type: String as PropType<SupportedLocale>, default: null } },
      setup(props) {
        const { d } = useLocalization(() => props.locale);
        return () => h("span", {}, d(new Date("2024-03-05T00:00:00Z")));
      },
    });

    const i18n = createI18n({
      legacy: false,
      locale: "en",
      messages: localI18n.global.messages.value,
      datetimeFormats: {
        en: { short: { year: "numeric", month: "long", day: "numeric" } },
        da: { short: { year: "numeric", month: "long", day: "numeric" } },
      },
    });

    const en = mount(Dated, { props: { locale: "en" }, global: { provide: { i18n } } });
    const da = mount(Dated, { props: { locale: "da" }, global: { provide: { i18n } } });

    expect(da.text()).to.not.eq(en.text());
  });
});
