import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { mountForA11y, runAxe } from "@/test-utils/a11y";
import AVAsyncButton from "@/components/molecules/AVAsyncButton/AVAsyncButton.vue";
import AVSpinner from "@/components/atoms/AVSpinner";

describe("AVAsyncButton accessibility", () => {
  const slots = { label: "Save changes", waitingLabel: "Saving..." };

  it("has no violations when idle", async () => {
    const result = await mountForA11y(AVAsyncButton, {
      props: { onClick: () => Promise.resolve() },
      slots,
      global: { components: { AVSpinner } },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations when disabled", async () => {
    const result = await mountForA11y(AVAsyncButton, {
      props: { onClick: () => Promise.resolve(), disabled: true },
      slots,
      global: { components: { AVSpinner } },
    });
    expect(result).toHaveNoViolations();
  });

  it("has no violations in the loading state", async () => {
    const wrapper = mount(AVAsyncButton, {
      props: { onClick: () => new Promise(() => {}) },
      slots,
      attachTo: document.body,
      global: { components: { AVSpinner }, provide: { i18n: localI18n } },
    });
    await wrapper.trigger("click");
    await wrapper.vm.$nextTick();
    const result = await runAxe(wrapper.element as HTMLElement);
    wrapper.unmount();
    expect(result).toHaveNoViolations();
  });
});
