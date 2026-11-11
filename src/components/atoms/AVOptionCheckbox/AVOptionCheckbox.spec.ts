import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
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

  it("defaults selectionStyle to checkbox", async () => {
    await wrapper.setProps({
      locale: "en",
      checked: true,
      exclusiveError: false,
      invalid: false,
      disabled: false,
      selectionStyle: "checkbox",
    });

    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain(
      "AVOptionCheckbox--checked",
    );
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.not.contain(
      "AVOptionCheckbox--checked-white",
    );
  });

  it("can apply background selection style", async () => {
    await wrapper.setProps({
      checked: true,
      selectionStyle: "background",
    });

    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain(
      "AVOptionCheckbox--checked-white",
    );
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.not.contain(
      "AVOptionCheckbox--checked",
    );
  });

  it("does not emit a tick id when optionReference is empty (avoids duplicate-id collisions)", async () => {
    await wrapper.setProps({
      checked: true,
      optionReference: "",
      rank: 1,
    });

    const select = wrapper.find("[data-test=select]");
    expect(select.exists()).to.be.true;
    expect(select.attributes().id).to.be.undefined;
  });

  it("emits a unique tick id when optionReference is provided", async () => {
    await wrapper.setProps({
      checked: true,
      optionReference: "optA",
      rank: 1,
    });

    const select = wrapper.find("[data-test=select]");
    expect(select.attributes().id).to.eq("option_optA_tick");
  });

  it("drops the rank when the option is excluded", async () => {
    await wrapper.setProps({ checked: true, rank: 2, excluded: true });

    expect(wrapper.find("[data-test=select]").attributes().rank).to.be.undefined;
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-label"]).to.eq(
      localI18n.global.t("js.components.AVOptionCheckbox.aria_label.checked_normal"),
    );

    await wrapper.setProps({ excluded: false });
  });

  it("floats to the start in right-to-left documents", async () => {
    const html = document.documentElement;
    try {
      expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain("float-end");

      html.setAttribute("dir", "rtl");
      await flushPromises();
      expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain("float-start");

      const mountedInRtl = mount(AVOptionCheckbox, {
        props: { checked: false, locale: "en" },
        global: { provide: { i18n: localI18n } },
      });
      await flushPromises();
      expect(mountedInRtl.find("[data-test=option-checkbox]").classes()).to.contain("float-start");
      mountedInRtl.unmount();

      html.setAttribute("dir", "ltr");
      await flushPromises();
      expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain("float-end");
    } finally {
      html.removeAttribute("dir");
    }
  });
});
