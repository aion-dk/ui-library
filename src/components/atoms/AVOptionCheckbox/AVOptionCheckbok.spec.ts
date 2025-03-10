import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVOptionCheckbox from "./AVOptionCheckbox.vue";

describe("AVOptionCheckbox", () => {
  const wrapper = mount(AVOptionCheckbox, {
    props: {
      checked: false,
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVOptionSelect: {
          template: "<span />",
        },
      },
    },
  });

  it("renders correctly", async () => {
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-checked"]).to.eq("false");
    expect(wrapper.find("[data-test=option-checkbox]").findAll("span").length).to.eq(0);
    expect(wrapper.findAll("[data-test=select]").length).to.eq(0);
    expect(wrapper.emitted().click).to.not.exist;
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).to.exist;
  });

  it("updates correctly", async () => {
    await wrapper.setProps({
      checked: true,
      rank: 5,
    });

    expect(wrapper.find("[data-test=option-checkbox]").get("span").attributes().rank).to.contain(
      "5",
    );
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-checked"]).to.contain(
      "true",
    );
    expect(wrapper.findAll("[data-test=select]").length).to.eq(1);
  });

  it("can be disabled", async () => {
    expect(wrapper.find("[data-test=option-checkbox]").attributes().disabled).to.be.undefined;
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-disabled"]).to.be
      .undefined;

    await wrapper.setProps({
      disabled: true,
    });

    expect(wrapper.find("[data-test=option-checkbox]").attributes().disabled).to.exist;
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-disabled"]).to.contain(
      "true",
    );
  });

  it("can be invalid", async () => {
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.not.contain(
      "AVOptionCheckbox--error",
    );

    await wrapper.setProps({
      disabled: false,
      invalid: true,
    });

    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain(
      "AVOptionCheckbox--error",
    );
  });

  it("can display exclusive error", async () => {
    expect(wrapper.findAll("[data-test=exclusive-error]").length).to.eq(0);

    await wrapper.setProps({
      exclusiveError: true,
    });

    expect(wrapper.findAll("[data-test=exclusive-error]").length).to.eq(1);
    expect(wrapper.find("[data-test=exclusive-error]").text()).to.contain("Exclusive");
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain(
      "AVOptionCheckbox--error",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "ru",
    });

    expect(wrapper.find("[data-test=exclusive-error]").text()).to.contain("Эксклюзивный");
  });
});
