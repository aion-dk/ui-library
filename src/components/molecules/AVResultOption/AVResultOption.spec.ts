import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVResultOption from "./AVResultOption.vue";

describe("AVResultOption", () => {
  const wrapper = mount(AVResultOption, {
    props: {
      optionTitle: { en: "I'm the option title" },
      votes: 1,
      total: 2,
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

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("I'm the option title");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("1");
    expect(wrapper.find("[data-test=result-results]").text()).to.contain("50%");
  });

  it("can update values", async () => {
    await wrapper.setProps({
      optionTitle: { en: "I've changed" },
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
      optionImage: "http://image.com",
    });

    expect(wrapper.findAll("[data-test=result-image]").length).to.eq(1);
    expect(wrapper.find("[data-test=result-image]").attributes().src).to.eq("http://image.com");
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "is",
      optionTitle: { is: "Title in Icelandic" },
    });

    expect(wrapper.find("[data-test=result-title]").text()).to.contain("Title in Icelandic");
  });
});
