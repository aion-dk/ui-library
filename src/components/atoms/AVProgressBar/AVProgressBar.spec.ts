import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import AVTweenedCount from "@/components/atoms/AVTweenedCount";
import AVProgressBar from "./AVProgressBar.vue";

describe("AVProgressBar", () => {
  it("renders properly", async () => {
    const wrapper = mount(AVProgressBar, {
      props: {
        id: "test",
        value: 37,
      },
      global: {
        components: {
          AVTweenedCount,
        },
      },
    });

    expect(wrapper.text()).to.contain("0%");

    let isReady = false;
    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.text()).to.contain("37%");
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );

    expect(wrapper.html()).to.not.contain("bg-success");
    expect(wrapper.html()).to.contain("bg-brand-dark");
    expect(wrapper.html()).to.contain('style="width: 37%;"');
  });

  it("succeeds on 100%", async () => {
    const wrapper = mount(AVProgressBar, {
      props: {
        id: "test",
        value: 100,
      },
      global: {
        components: {
          AVTweenedCount,
        },
      },
    });

    expect(wrapper.text()).to.contain("0%");

    let isReady = false;
    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.text()).to.contain("100%");
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );

    expect(wrapper.html()).to.contain("bg-success");
    expect(wrapper.html()).to.contain('style="width: 100%;"');
  });

  it("hides percentage", async () => {
    const wrapper = mount(AVProgressBar, {
      props: {
        id: "test",
        value: 37,
        hidePercentage: true,
      },
      global: {
        components: {
          AVTweenedCount,
        },
      },
    });

    expect(wrapper.text()).to.not.contain("37%");
    expect(wrapper.html()).to.not.contain("AVProgressBar--percentage");
    expect(wrapper.html()).to.contain('style="width: 37%;"');
  });
});
