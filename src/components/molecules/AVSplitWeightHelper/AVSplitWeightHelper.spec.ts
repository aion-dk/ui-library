import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVSplitWeightHelper from "./AVSplitWeightHelper.vue";

describe("AVSplitWeightHelper", () => {
  const wrapper = mount(AVSplitWeightHelper, {
    props: {
      assignedWeight: 4,
      unusedWeight: 6,
      activeAssigned: 4,
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=weight-helper-total]").text()).to.contain(
      "Total number of ballots:",
    );
    expect(wrapper.find("[data-test=weight-helper-total]").text()).to.contain("10");
    expect(wrapper.find("[data-test=weight-helper-assigned]").text()).to.contain(
      "Already assigned:",
    );
    expect(wrapper.find("[data-test=weight-helper-assigned]").text()).to.contain("4");
    expect(wrapper.find("[data-test=weight-helper-unused]").text()).to.contain("Left to assign:");
    expect(wrapper.find("[data-test=weight-helper-unused]").text()).to.contain("6");
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "ar",
    });

    expect(wrapper.find("[data-test=weight-helper-total]").text()).to.contain("وزنك الإجمالي:");
    expect(wrapper.find("[data-test=weight-helper-total]").text()).to.contain("10");
    expect(wrapper.find("[data-test=weight-helper-assigned]").text()).to.contain(
      "تم تعيينه بالفعل:",
    );
    expect(wrapper.find("[data-test=weight-helper-assigned]").text()).to.contain("4");
    expect(wrapper.find("[data-test=weight-helper-unused]").text()).to.contain("اليسار للتعيين:");
    expect(wrapper.find("[data-test=weight-helper-unused]").text()).to.contain("6");
  });
});
