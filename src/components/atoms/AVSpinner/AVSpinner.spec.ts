import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVSpinner from "./AVSpinner.vue";

describe("AVSpinner", () => {
  const wrapper = mount(AVSpinner, {
    props: {
      variant: "spinner-border",
      size: "sm",
      color: "primary",
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
    },
  });

  it("renders correctly", async () => {
    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-border");
    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-border-sm");
    expect(wrapper.find("[role=status]").classes()).to.contain("text-primary");
    expect(wrapper.find("[role=status]").text()).to.eq("Loading...");
  });

  it("can change size", async () => {
    await wrapper.setProps({
      size: "md",
    });

    expect(wrapper.find("[role=status]").classes()).to.not.contain("spinner-border-sm");
    expect(wrapper.find("[role=status]").classes()).to.not.contain("spinner-border-lg");

    await wrapper.setProps({
      size: "lg",
    });

    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-border-lg");
  });

  it("can change color", async () => {
    await wrapper.setProps({
      color: "light",
    });

    expect(wrapper.find("[role=status]").classes()).to.not.contain("text-primary");
    expect(wrapper.find("[role=status]").classes()).to.contain("text-light");

    await wrapper.setProps({
      color: "theme",
    });

    expect(wrapper.find("[role=status]").classes()).to.not.contain("text-light");
    expect(wrapper.find("[role=status]").classes()).to.contain("text-theme");

    await wrapper.setProps({
      color: "danger",
    });

    expect(wrapper.find("[role=status]").classes()).to.not.contain("text-theme");
    expect(wrapper.find("[role=status]").classes()).to.contain("text-danger");
  });

  it("can switch variant", async () => {
    await wrapper.setProps({
      variant: "spinner-grow",
    });

    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-grow");
    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-grow-lg");
    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-grow");
    expect(wrapper.find("[role=status]").classes()).to.contain("spinner-grow-lg");
  });

  it("can switch locale", async () => {
    await wrapper.setProps({
      locale: "it",
    });

    expect(wrapper.find("[role=status]").text()).to.not.eq("Loading...");
    expect(wrapper.find("[role=status]").text()).to.eq("Caricamento in corso...");
  });
});
