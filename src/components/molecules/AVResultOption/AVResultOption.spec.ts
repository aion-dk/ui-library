import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getOption } from "@/examples";

import AVResultOption from "./AVResultOption.vue";
import type { NormalResultListOption, OptionContent } from "@/types";

const toListOption = (option: OptionContent): NormalResultListOption => ({
  count: 0,
  elected: false,
  imageUrl: option.image ?? null,
  reference: option.reference,
  tied: false,
  title: option.title,
});

describe("AVResultOption", () => {
  let option: NormalResultListOption = {
    ...toListOption(getOption(["selectable"], 1)),
    count: 1,
  };

  const wrapper = mount(AVResultOption, {
    props: {
      option,
      total: 2,
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
      },
    },
  });

  const setOption = (changes: Partial<NormalResultListOption>) =>
    wrapper.setProps({ option: (option = { ...option, ...changes }) });

  it("renders properly", async () => {
    expect(wrapper.findAll("[data-test=result-image]").length).to.eq(0);

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-body-alt-10");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-success-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-warning-faded");

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("Example option 1");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("1");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("50%");
  });

  it("can update values", async () => {
    await wrapper.setProps({ total: 10 });
    await setOption({
      title: { ...option.title, en: "I've changed" },
      count: 2,
      elected: true,
    });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-success-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-body-80");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-warning-faded");

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("I've changed");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("2");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("20%");
  });

  it("can hide percentage", async () => {
    await wrapper.setProps({ hidePercentage: true });
    await setOption({ elected: false, tied: true });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-warning-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-body-80");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-success-faded");

    expect(wrapper.find("[data-test=result-results]").text()).to.contain("2");
    expect(wrapper.find("[data-test=result-results]").text()).to.not.contain("20%");
  });

  it("can handle ties", async () => {
    await wrapper.setProps({ hidePercentage: false });
    await setOption({ elected: true, tied: true });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-success-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-warning-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-body-80");
  });

  it("can hide elected and tied", async () => {
    const classes = () => wrapper.find("[data-test=result-option]").classes();

    await wrapper.setProps({ hideElected: true });
    expect(classes()).to.not.contain("bg-success-faded");
    expect(classes()).to.contain("bg-warning-faded");

    await wrapper.setProps({ hideTied: true });
    expect(classes()).to.not.contain("bg-warning-faded");
    expect(classes()).to.contain("bg-body-alt-10");

    await wrapper.setProps({ hideElected: false, hideTied: false });
  });

  it("can display image", async () => {
    const imageOption = getOption(["selectable", "image"], 1);

    await wrapper.setProps({
      option: (option = toListOption(imageOption)),
    });

    expect(wrapper.findAll("[data-test=result-image]").length).to.eq(1);
    expect(wrapper.find("[data-test=result-image]").attributes().src).to.eq(imageOption.image);
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "is",
    });

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("Dæmi um valmöguleika 1");
  });

  it("can render as a list", async () => {
    const classes = () => wrapper.find("[data-test=result-option]").classes();

    await wrapper.setProps({ list: true });
    await setOption({ elected: false, tied: false, ineligible: false });
    expect(classes()).to.contain("bg-body");
    expect(classes()).to.not.contain("bg-body-alt-10");

    await setOption({ elected: true });
    expect(classes()).to.contain("bg-success-faded");
  });

  it("marks ineligible options", async () => {
    await setOption({ elected: false, ineligible: true });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-danger-faded");
  });
});
