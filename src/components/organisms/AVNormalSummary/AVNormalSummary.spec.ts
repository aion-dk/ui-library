import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption } from "@/examples";

import AVNormalSummary from "./AVNormalSummary.vue";

describe("AVNormalSummary", () => {
  const wrapper = mount(AVNormalSummary, {
    props: {
      sortedResult: [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          count: 30,
          elected: true,
          tied: false,
        },
      ],
      totalCount: 100,
    },
    global: {
      stubs: {
        AVResultOption: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.findAll("[data-test=result-option]").length).to.eq(1);

    await wrapper.setProps({
      sortedResult: [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          count: 30,
          elected: true,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          count: 20,
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          count: 10,
          elected: false,
          tied: false,
        },
      ],
    });

    expect(wrapper.findAll("[data-test=result-option]").length).to.eq(3);
  });

  it("can hide percentages", async () => {
    expect(wrapper.findAll("[data-test=result-option]")[0].attributes()["hide-percentage"]).to.eq(
      "false",
    );

    await wrapper.setProps({
      hidePercentage: true,
    });

    expect(wrapper.findAll("[data-test=result-option]")[0].attributes()["hide-percentage"]).to.eq(
      "true",
    );
  });

  it("renders in correct order", async () => {
    wrapper.findAll("[data-test=result-option]").forEach((e, i) => {
      let value: string = "";
      switch (i) {
        case 0:
          value = "30";
          break;
        case 1:
          value = "20";
          break;
        case 2:
          value = "10";
          break;
      }
      expect(e.attributes().votes).to.eq(value);
    });

    await wrapper.setProps({
      sortedResult: [
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          count: 10,
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          count: 20,
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          count: 30,
          elected: true,
          tied: false,
        },
        {
          reference: "blank",
          title: { en: "Blank" },
          count: 5,
          elected: false,
          tied: false,
        },
      ],
    });

    wrapper.findAll("[data-test=result-option]").forEach((e, i) => {
      let value: string = "";
      switch (i) {
        case 0:
          value = "10";
          break;
        case 1:
          value = "20";
          break;
        case 2:
          value = "30";
          break;
        case 3:
          value = "5";
          break;
      }
      expect(e.attributes().votes).to.eq(value);
    });
  });

  it("hides percentages on disregard blank", async () => {
    wrapper
      .findAll("[data-test=result-option]")
      .forEach((e) => expect(e.attributes()["hide-percentage"]).to.eq("true"));

    await wrapper.setProps({
      hidePercentage: false,
    });

    wrapper
      .findAll("[data-test=result-option]")
      .forEach((e) => expect(e.attributes()["hide-percentage"]).to.eq("false"));

    await wrapper.setProps({
      disregardBlank: true,
    });

    wrapper.findAll("[data-test=result-option]").forEach((e, i) => {
      if (i === 3) expect(e.attributes()["hide-percentage"]).to.eq("true");
      else expect(e.attributes()["hide-percentage"]).to.eq("false");
    });
  });
});
