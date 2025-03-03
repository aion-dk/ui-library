import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getLiveResult } from "@/examples";

import AVTweenedCount from "@/components/atoms/AVTweenedCount";
import AVOptionLiveResults from "./AVOptionLiveResults.vue";

describe("AVOptionLiveResults", () => {
  const wrapper = mount(AVOptionLiveResults, {
    props: {
      optionReference: "test",
      partialResults: getLiveResult(["blank"]).blank,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVTweenedCount,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=partial-results-internal]")).to.exist;
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.not.contain("-");
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.not.contain("%");
    expect(wrapper.find("[data-test=partial-results-internal]").classes()).to.not.contain("ms-1");
    expect(wrapper.find("[data-test=partial-results-internal]").classes()).to.not.contain("mt-1");
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.eq("0  votes");

    let isReady = false;
    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.find("[data-test=partial-results-internal]").text()).to.eq("5  votes");
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );
  });

  it("can display percentages", async () => {
    await wrapper.setProps({
      showPercentage: true,
    });

    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.eq("5  votes-0.0%");

    let isReady = false;
    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.find("[data-test=partial-results-internal]").text()).to.eq("5  votes-25.2%");
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );
  });

  it("can switch to external", async () => {
    await wrapper.setProps({
      mode: "external",
    });

    expect(wrapper.find("[data-test=partial-results-external]")).to.exist;
    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.find("[data-test=partial-results-external]").classes()).to.contain("ms-1");
    expect(wrapper.find("[data-test=partial-results-external]").classes()).to.contain("mt-1");
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "ru",
    });

    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain(
      "5  голосов-25.2%",
    );
  });
});
