import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVVerticalStep from "./AVVerticalStep.vue";

describe("AVVerticalStep", () => {
  const wrapper = mount(AVVerticalStep, {
    props: {
      title: "BACK",
      collapsed: true,
      linkMode: true,
      summary: true,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly as summary link", async () => {
    expect(wrapper.findAll("[data-test=step-title]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=step-subtitle]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=step-line-pre]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=step-line-post]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=acronym-text]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=step-icon]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=back-icon]").length).toEqual(1);

    expect(wrapper.find("[data-test=back-icon]").findAll("span")[0].attributes().icon).toEqual(
      "grip-vertical",
    );
    expect(wrapper.find("[data-test=back-icon]").findAll("span")[1].attributes().icon).toEqual(
      "arrow-left",
    );

    expect(wrapper.text()).to.not.contain("BACK");
  });

  it("can uncollapse", async () => {
    await wrapper.setProps({
      collapsed: false,
    });

    expect(wrapper.findAll("[data-test=step-title]").length).toEqual(1);
    expect(wrapper.find("[data-test=step-title]").text()).to.contain("BACK");
  });

  it("renders properly as normal link", async () => {
    await wrapper.setProps({
      title: "link title",
      summary: false,
    });

    expect(wrapper.findAll("[data-test=acronym-text]").length).toEqual(1);
    expect(wrapper.findAll("[data-test=step-icon]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=back-icon]").length).toEqual(0);

    expect(wrapper.find("[data-test=acronym-text]").findAll("span")[0].text()).toEqual("LT");
    expect(wrapper.find("[data-test=acronym-text]").findAll("span")[1].attributes().icon).toEqual(
      "arrow-right",
    );

    expect(wrapper.find("[data-test=step-title]").text()).to.not.contain("BACK");
    expect(wrapper.find("[data-test=step-title]").text()).to.contain("link title");
  });

  it("renders properly as regular step", async () => {
    await wrapper.setProps({
      linkMode: false,
      stepNumber: 3,
      title: "I'm a title",
    });

    expect(wrapper.find("[data-test=step-title]").text()).toEqual("I'm a title");

    expect(wrapper.findAll("[data-test=acronym-text]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=step-icon]").length).toEqual(1);
    expect(wrapper.findAll("[data-test=back-icon]").length).toEqual(0);

    expect(wrapper.find("[data-test=step-icon]").attributes().icon).toEqual("3");
  });

  it("can have a subtitle", async () => {
    await wrapper.setProps({
      subtitle: "And I'm a subtitle",
    });

    expect(wrapper.findAll("[data-test=step-subtitle]").length).toEqual(1);
    expect(wrapper.find("[data-test=step-subtitle]").text()).toEqual("And I'm a subtitle");
  });

  it("can have previous step", async () => {
    await wrapper.setProps({
      hasPrevStep: true,
    });

    expect(wrapper.findAll("[data-test=step-line-pre]").length).toEqual(1);
  });

  it("can have following step", async () => {
    await wrapper.setProps({
      hasNextStep: true,
    });

    expect(wrapper.findAll("[data-test=step-line-post]").length).toEqual(1);
  });

  it("can switch status", async () => {
    expect(wrapper.find("[data-test=step-title]").classes()).to.contain(
      "AVVerticalStep--text-default",
    );
    expect(wrapper.find("[data-test=step-subtitle]").classes()).to.contain(
      "AVVerticalStep--text-default",
    );
    expect(wrapper.find("[data-test=step-circle]").classes()).to.contain(
      "AVVerticalStep--step-default",
    );

    await wrapper.setProps({
      status: "active",
    });

    expect(wrapper.find("[data-test=step-title]").classes()).to.contain(
      "AVVerticalStep--text-active",
    );
    expect(wrapper.find("[data-test=step-subtitle]").classes()).to.contain(
      "AVVerticalStep--text-active",
    );
    expect(wrapper.find("[data-test=step-circle]").classes()).to.contain(
      "AVVerticalStep--step-active",
    );

    await wrapper.setProps({
      status: "done",
    });

    expect(wrapper.find("[data-test=step-title]").classes()).to.contain(
      "AVVerticalStep--text-done",
    );
    expect(wrapper.find("[data-test=step-subtitle]").classes()).to.contain(
      "AVVerticalStep--text-done",
    );
    expect(wrapper.find("[data-test=step-circle]").classes()).to.contain(
      "AVVerticalStep--step-done",
    );
  });

  it("can collapse", async () => {
    await wrapper.setProps({
      collapsed: true,
    });

    expect(wrapper.findAll("[data-test=step-title]").length).toEqual(0);
    expect(wrapper.findAll("[data-test=step-subtitle]").length).toEqual(0);
  });
});
