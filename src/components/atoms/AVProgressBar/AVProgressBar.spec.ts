import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import AVProgressBar from "./AVProgressBar.vue";

describe("AVProgressBar", () => {
  it("renders properly", async () => {
    const wrapper = mount(AVProgressBar, {
      props: {
        value: 37,
      },
    });

    expect(wrapper.text()).to.contain("37%");
    expect(wrapper.html()).to.not.contain("bg-success");
    expect(wrapper.html()).to.contain("bg-brand-dark");
    expect(wrapper.html()).to.contain('style="width: 37%;"');
  });

  it("succeeds on 100%", async () => {
    const wrapper = mount(AVProgressBar, {
      props: {
        value: 100,
      },
    });

    expect(wrapper.text()).to.contain("100%");
    expect(wrapper.html()).to.contain("bg-success");
    expect(wrapper.html()).to.contain('style="width: 100%;"');
  });

  it("hides percentage", async () => {
    const wrapper = mount(AVProgressBar, {
      props: {
        value: 37,
        hidePercentage: true,
      },
    });

    expect(wrapper.text()).to.not.contain("37%");
    expect(wrapper.html()).to.not.contain("AVProgressBar--percentage");
    expect(wrapper.html()).to.contain('style="width: 37%;"');
  });
});
