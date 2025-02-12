import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getLiveResult } from "@/examples";

import AVBlankOption from "./AVBlankOption.vue";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";

describe("AVBlankOption", () => {
  const wrapper = mount(AVBlankOption, {
    props: {
      checked: false,
      error: false,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVOptionLiveResults,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
        AVOptionCheckbox: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=option-content]").text()).to.contain("Blank");
    expect(wrapper.find("[data-test=blank-checkbox]").attributes()["option-reference"]).to.contain(
      "blank",
    );
    expect(wrapper.find("[data-test=blank-checkbox]").attributes().checked).to.contain("false");
    expect(wrapper.find("[data-test=blank-checkbox]").attributes().invalid).to.contain("false");
    expect(wrapper.find("[data-test=blank-checkbox]").attributes().disabled).to.contain("false");
    expect(wrapper.find("[data-test=blank-checkbox]").attributes()["exclusive-error"]).to.contain(
      "false",
    );
  });

  it("can be checked", async () => {
    await wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find("[data-test=blank-checkbox]").attributes().checked).to.contain("true");
  });

  it("can be disabled", async () => {
    await wrapper.setProps({
      checked: false,
      disabled: true,
    });

    expect(wrapper.find("[data-test=blank-checkbox]").attributes().disabled).to.contain("true");
  });

  it("can be invalid", async () => {
    await wrapper.setProps({
      checked: true,
      disabled: false,
      invalid: true,
    });

    expect(wrapper.find("[data-test=blank-checkbox]").attributes().invalid).to.contain("true");
  });

  it("can display exclusive error", async () => {
    await wrapper.setProps({
      checked: true,
      invalid: false,
      error: true,
    });

    expect(wrapper.find("[data-test=blank-checkbox]").attributes()["exclusive-error"]).to.contain(
      "true",
    );
    expect(wrapper.find("[data-test=option-content]").text()).to.contain("Blank");
  });

  it("can display accent color", async () => {
    expect(wrapper.find("[data-test=option-container]").classes()).to.not.include(
      "AVBlankOption--accent",
    );
    expect(wrapper.find("[data-test=option-container]").attributes().style).to.not.include(
      "border-left-color: #FF0000;",
    );

    await wrapper.setProps({
      accentColor: "#FF0000",
    });

    expect(wrapper.find("[data-test=option-container]").classes()).to.include(
      "AVBlankOption--accent",
    );
    expect(wrapper.find("[data-test=option-container]").attributes().style).to.include(
      "border-left-color: #FF0000;",
    );
  });

  it("can display partial results", async () => {
    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);

    await wrapper.setProps({
      partialResults: getLiveResult(["blank"]).blank,
    });

    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(1);
    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("5 votes");

    await wrapper.setProps({
      observerMode: true,
    });

    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("5 votes");
  });

  it("can show percentages", async () => {
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.not.contain("25.2%");

    await wrapper.setProps({
      partialResults: getLiveResult(["blank"], true).blank,
    });

    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("25.2%");

    await wrapper.setProps({
      observerMode: false,
    });

    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("25.2%");
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "ca",
    });

    expect(wrapper.find("[data-test=option-content]").text()).to.contain("Vot en blanc");
    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("5 vots");
  });
});
