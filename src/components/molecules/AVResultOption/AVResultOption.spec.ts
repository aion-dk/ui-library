import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getOption } from "@/examples";

import AVResultOption from "./AVResultOption.vue";

const INITIAL_OPTION = getOption(["selectable"], 1);

describe("AVResultOption", () => {
  const wrapper = mount(AVResultOption, {
    props: {
      option: INITIAL_OPTION,
      votes: 1,
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

  it("renders properly", async () => {
    expect(wrapper.findAll("[data-test=result-image]").length).to.eq(0);

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-secondary");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-success-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-warning-faded");

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("Example option 1");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("1");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("50%");
  });

  it("can update values", async () => {
    INITIAL_OPTION.title.en = "I've changed";

    await wrapper.setProps({
      option: INITIAL_OPTION,
      votes: 2,
      total: 10,
      elected: true,
    });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-success-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-secondary");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-warning-faded");

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("I've changed");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("2");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("20%");
  });

  it("can hide percentage", async () => {
    await wrapper.setProps({
      hidePercentage: true,
      elected: false,
      tied: true,
    });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-warning-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-secondary");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-success-faded");

    expect(wrapper.find("[data-test=result-results]").text()).to.contain("2");
    expect(wrapper.find("[data-test=result-results]").text()).to.not.contain("20%");
  });

  it("can handle ties", async () => {
    await wrapper.setProps({
      hidePercentage: false,
      elected: true,
      tied: true,
    });

    expect(wrapper.find("[data-test=result-option]").classes()).to.contain("bg-success-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-warning-faded");
    expect(wrapper.find("[data-test=result-option]").classes()).to.not.contain("bg-secondary");
  });

  it("can display image", async () => {
    await wrapper.setProps({
      option: getOption(["selectable", "image"], 1),
    });

    expect(wrapper.findAll("[data-test=result-image]").length).to.eq(1);
    expect(wrapper.find("[data-test=result-image]").attributes().src).to.eq(
      "https://electa.staging-1.assemblyvoting.net/uploads_proxy/option/image/657750",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "is",
    });

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("Dæmi um valmöguleika 1");
  });
});
