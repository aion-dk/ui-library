import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVCalculateResultContent from "./AVCalculateResultContent.vue";

describe("AVCalculateResultContent", () => {
  const wrapper = mount(AVCalculateResultContent, {
    props: {
      id: "test",
      progress: 0,
      role: "mixer",
      status: "initial",
      mixes: [0, 10],
      decryptions: [0, 10],
      elapsed: "00:00:00",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
        AVProgressBar: {
          template: "<span />",
        },
        AVWaitingDots: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=progress]").attributes().value).to.eq("0");
    expect(wrapper.find("[data-test=role]").text()).to.contain("Mixer");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Initializing");
    expect(wrapper.find("[data-test=status-icon]").attributes().icon).to.eq("hourglass-half");
    expect(wrapper.find("[data-test=mixes]").text()).to.contain("0/10");
    expect(wrapper.find("[data-test=decryptions]").text()).to.contain("0/10");
    expect(wrapper.find("[data-test=time]").text()).to.contain("00:00:00");
  });

  it("can go through whole flow", async () => {
    await wrapper.setProps({
      progress: 27,
      role: "decrypter",
      status: "mixing",
      mixes: [5, 10],
      elapsed: "00:00:01",
    });

    expect(wrapper.find("[data-test=progress]").attributes().value).to.eq("27");
    expect(wrapper.find("[data-test=role]").text()).to.contain("Decrypter");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Mixing");
    expect(wrapper.find("[data-test=status-icon]").attributes().icon).to.eq("shuffle");
    expect(wrapper.find("[data-test=mixes]").text()).to.contain("5/10");
    expect(wrapper.find("[data-test=decryptions]").text()).to.contain("0/10");
    expect(wrapper.find("[data-test=time]").text()).to.contain("00:00:01");

    await wrapper.setProps({
      role: "observer",
    });

    expect(wrapper.find("[data-test=role]").text()).to.contain("Observer");

    await wrapper.setProps({
      progress: 41,
      role: "all",
      status: "decrypting",
      mixes: [10, 10],
      decryptions: [3, 10],
      elapsed: "00:00:10",
    });

    expect(wrapper.find("[data-test=progress]").attributes().value).to.eq("41");
    expect(wrapper.find("[data-test=role]").text()).to.contain("Mixer and Decrypter");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Decrypting");
    expect(wrapper.find("[data-test=status-icon]").attributes().icon).to.eq("key");
    expect(wrapper.find("[data-test=mixes]").text()).to.contain("10/10");
    expect(wrapper.find("[data-test=decryptions]").text()).to.contain("3/10");
    expect(wrapper.find("[data-test=time]").text()).to.contain("00:00:10");

    await wrapper.setProps({
      progress: 64,
      status: "aggregating",
      decryptions: [10, 10],
      elapsed: "00:04:00",
    });

    expect(wrapper.find("[data-test=progress]").attributes().value).to.eq("64");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Aggregating");
    expect(wrapper.find("[data-test=status-icon]").attributes().icon).to.eq("calculator");
    expect(wrapper.find("[data-test=mixes]").text()).to.contain("10/10");
    expect(wrapper.find("[data-test=decryptions]").text()).to.contain("10/10");
    expect(wrapper.find("[data-test=time]").text()).to.contain("00:04:00");

    await wrapper.setProps({
      progress: 100,
      status: "finished",
      elapsed: "01:00:00",
    });

    expect(wrapper.find("[data-test=progress]").attributes().value).to.eq("100");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Finished");
    expect(wrapper.find("[data-test=status-icon]").attributes().icon).to.eq("circle-check");
    expect(wrapper.find("[data-test=time]").text()).to.contain("01:00:00");
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "da",
    });

    expect(wrapper.find("[data-test=role]").text()).to.contain("Din rolle:");
    expect(wrapper.find("[data-test=role]").text()).to.contain("Mixer og Decrypter");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Status:");
    expect(wrapper.find("[data-test=status]").text()).to.contain("Færdig");
  });
});
