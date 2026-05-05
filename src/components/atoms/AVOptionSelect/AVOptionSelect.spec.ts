import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVOptionSelect from "./AVOptionSelect.vue";

describe("AVOptionSelect", () => {
  const wrapper = mount(AVOptionSelect, {
    props: {
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
    },
  });

  it("does not render when unselected", async () => {
    expect(wrapper.find("[data-test=option-select]").attributes().style).to.contain(
      "display: none;",
    );
    expect(wrapper.findAll("[data-test=rank]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=check]").length).to.eq(1);
  });

  it("renders correctly", async () => {
    await wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find("[data-test=option-select]").attributes().style).to.not.contain(
      "display: none;",
    );
    expect(wrapper.findAll("[data-test=rank]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=check]").length).to.eq(1);
  });

  it("can be ranked", async () => {
    await wrapper.setProps({
      checked: true,
      rank: 3,
    });

    expect(wrapper.findAll("[data-test=option-select]")[0].attributes()["aria-label"]).to.eq(
      "Ranked 3",
    );
    expect(wrapper.findAll("[data-test=rank]").length).to.eq(1);
    expect(wrapper.find("[data-test=rank]").text()).to.eq("3");
    expect(wrapper.findAll("[data-test=check]").length).to.eq(0);
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "fi",
      rank: 7,
    });

    expect(wrapper.findAll("[data-test=option-select]")[0].attributes()["aria-label"]).to.eq(
      "Sijoitus 7",
    );
  });

  it("defaults selectionStyle to checkbox", async () => {
    await wrapper.setProps({
      locale: "en",
      rank: null,
    });

    expect(wrapper.find("[data-test=option-select]").classes()).to.contain("text-white");
    expect(wrapper.find("[data-test=option-select]").classes()).to.not.contain("text-ballot");
    expect(wrapper.find("[data-test=check]").attributes().stroke).to.eq("white");
  });

  it("can apply background selection style", async () => {
    await wrapper.setProps({
      selectionStyle: "background",
    });

    expect(wrapper.find("[data-test=option-select]").classes()).to.contain("text-ballot");
    expect(wrapper.find("[data-test=option-select]").classes()).to.not.contain("text-white");
    expect(wrapper.find("[data-test=check]").attributes().stroke).to.eq("var(--bs-ballot)");
  });
});
