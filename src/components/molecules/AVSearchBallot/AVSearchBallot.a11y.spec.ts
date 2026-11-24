import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getOption } from "@/examples";
import { mountForA11y, runAxe } from "@/test-utils/a11y";
import AVSearchBallot from "@/components/molecules/AVSearchBallot/AVSearchBallot.vue";

describe("AVSearchBallot accessibility", () => {
  const options = [
    getOption(["selectable"], 1),
    getOption(["selectable"], 2),
    getOption(["selectable"], 3),
  ];

  it("has no violations with an empty search", async () => {
    const result = await mountForA11y(AVSearchBallot, {
      props: { options, locale: "en" },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations with search results", async () => {
    const wrapper = mount(AVSearchBallot, {
      props: { options, locale: "en" },
      attachTo: document.body,
      global: { provide: { i18n: localI18n } },
    });
    await wrapper.find("[data-test=search-ballot-input]").setValue("option 2");
    await wrapper.vm.$nextTick();
    const result = await runAxe(wrapper.element as HTMLElement);
    wrapper.unmount();
    expect(result).toHaveNoViolations();
  });
});
