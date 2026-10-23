import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { getOption, getVoteCounts } from "@/examples";
import type { NormalResultDataForDisplay } from "@/types";
import localI18n from "@/i18n";
import AVResultSummaryItem from "@/components/atoms/AVResultSummaryItem";

import AVNormalSummary from "./AVNormalSummary.vue";

// Exposes the passed-down option's result fields as attributes so tests can read them.
const AVResultOptionStub = {
  props: ["option"],
  template:
    '<span :data-count="option.count" :data-elected="option.elected" :data-tied="option.tied" />',
};

describe("AVNormalSummary", () => {
  const wrapper = mount(AVNormalSummary, {
    props: {
      voteCounts: getVoteCounts(),
      sortedResult: [
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          imageUrl: null,
          count: 30,
          elected: true,
          tied: false,
        },
      ],
      totalCount: 100,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVResultOption: AVResultOptionStub,
      },
      components: {
        AVResultSummaryItem,
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
          imageUrl: null,
          count: 30,
          elected: true,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          imageUrl: null,
          count: 20,
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          imageUrl: null,
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
      expect(e.attributes()["data-count"]).to.eq(value);
    });

    await wrapper.setProps({
      sortedResult: [
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          imageUrl: null,
          count: 10,
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          imageUrl: null,
          count: 20,
          elected: false,
          tied: false,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          imageUrl: null,
          count: 30,
          elected: true,
          tied: false,
        },
        {
          reference: "blank",
          title: { en: "Blank" },
          imageUrl: null,
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
      expect(e.attributes()["data-count"]).to.eq(value);
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

  it("hides elected", async () => {
    const electedBefore: Array<string> = [];
    wrapper
      .findAll("[data-test=result-option]")
      .forEach((e) => electedBefore.push(e.attributes()["data-elected"]));
    expect(electedBefore.some((e) => e === "true")).to.be.true;

    await wrapper.setProps({
      hidePercentage: true,
      hideElected: true,
    });

    const electedAfter: Array<string> = [];
    wrapper
      .findAll("[data-test=result-option]")
      .forEach((e) => electedAfter.push(e.attributes()["hide-elected"]));
    expect(electedAfter.every((e) => e === "true")).to.be.true;
  });

  it("hides tied", async () => {
    await wrapper.setProps({
      sortedResult: [
        {
          reference: getOption(["selectable"], 3).reference,
          title: getOption(["selectable"], 3).title,
          imageUrl: null,
          count: 20,
          elected: false,
          tied: true,
        },
        {
          reference: getOption(["selectable"], 2).reference,
          title: getOption(["selectable"], 2).title,
          imageUrl: null,
          count: 20,
          elected: false,
          tied: true,
        },
        {
          reference: getOption(["selectable"], 1).reference,
          title: getOption(["selectable"], 1).title,
          imageUrl: null,
          count: 10,
          elected: true,
          tied: false,
        },
        {
          reference: "blank",
          title: { en: "Blank" },
          imageUrl: null,
          count: 5,
          elected: false,
          tied: false,
        },
      ],
    });

    const tiedBefore: Array<string> = [];
    wrapper
      .findAll("[data-test=result-option]")
      .forEach((e) => tiedBefore.push(e.attributes()["data-tied"]));
    expect(tiedBefore.some((e) => e === "true")).to.be.true;

    await wrapper.setProps({
      hideElected: false,
      hideTied: true,
    });

    const tiedAfter: Array<string> = [];
    wrapper
      .findAll("[data-test=result-option]")
      .forEach((e) => tiedAfter.push(e.attributes()["hide-tied"]));
    expect(tiedAfter.every((e) => e === "true")).to.be.true;
  });

  it("can switch language", async () => {
    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Null votes:  8");

    await wrapper.setProps({
      locale: "cy",
    });

    expect(wrapper.find("[data-test=null_votes]").text()).to.contain("Pleidleisiau gwag:  8");
  });

  describe("when voteCounts don't include excludedCount", async () => {
    beforeEach(async () => {
      const voteCounts = getVoteCounts();
      delete voteCounts.excludedCount;

      await wrapper.setProps({ voteCounts });
    });

    it("doesn't show null votes", async () => {
      expect(wrapper.find("[data-test=null_votes]").exists()).to.be.false;
    });
  });

  describe("with list results", () => {
    const parent = getOption(["selectable", "children"], 1);
    const listResult: NormalResultDataForDisplay = [
      {
        reference: parent.reference,
        title: parent.title,
        imageUrl: null,
        seatsWon: 2,
        children: [
          {
            reference: parent.reference,
            title: parent.title,
            imageUrl: null,
            count: 6,
            elected: false,
            tied: false,
          },
          {
            reference: parent.children![0].reference,
            title: parent.children![0].title,
            imageUrl: null,
            count: 4,
            elected: true,
            tied: false,
          },
          {
            reference: parent.children![1].reference,
            title: parent.children![1].title,
            imageUrl: null,
            count: 2,
            elected: false,
            tied: true,
          },
        ],
      },
      {
        reference: getOption(["selectable"], 2).reference,
        title: getOption(["selectable"], 2).title,
        imageUrl: null,
        count: 1,
        elected: false,
        tied: false,
      },
      {
        reference: "blank",
        title: { en: "Blank" },
        imageUrl: null,
        count: 3,
        elected: false,
        tied: false,
      },
    ];

    const listWrapper = () =>
      mount(AVNormalSummary, {
        props: { voteCounts: getVoteCounts(), sortedResult: listResult, totalCount: 16 },
        global: {
          provide: { i18n: localI18n },
          stubs: { AVResultOption: AVResultOptionStub },
          components: { AVResultSummaryItem },
        },
      });

    it("renders groups with their children, including the parent", () => {
      const groups = listWrapper().findAll("[data-test=result-group]");

      expect(groups.length).to.eq(1);
      expect(groups[0].find("[data-test=group-title]").text()).to.eq("Example option 1");
      expect(
        groups[0].findAll("[data-test=result-option]").map((e) => e.attributes()["data-count"]),
      ).to.deep.eq(["6", "4", "2"]);
    });

    it("marks the list's own option", () => {
      expect(
        listWrapper()
          .findAll("[data-test=result-group] [data-test=result-option]")
          .map((e) => e.attributes().list),
      ).to.deep.eq(["true", "false", "false"]);
    });

    it("renders plain options in the order given", () => {
      expect(
        listWrapper()
          .findAll("[data-test=result-option]")
          .map((e) => e.attributes()["data-count"]),
      ).to.deep.eq(["6", "4", "2", "1", "3"]);
    });

    it("shows seats won when given", async () => {
      const wrapper = listWrapper();
      expect(wrapper.find("[data-test=group-seats-won]").text()).to.eq("2 seats");

      await wrapper.setProps({ locale: "da" });
      expect(wrapper.find("[data-test=group-seats-won]").text()).to.eq("2 mandater");

      await wrapper.setProps({ hideElected: true });
      expect(wrapper.find("[data-test=group-seats-won]").exists()).to.be.false;
    });

    it("renders the group image as decorative", () => {
      const imageUrl = getOption(["selectable", "image"], 1).image ?? null;
      const wrapper = mount(AVNormalSummary, {
        props: {
          voteCounts: getVoteCounts(),
          sortedResult: [{ ...listResult[0], imageUrl }],
          totalCount: 16,
        },
        global: {
          provide: { i18n: localI18n },
          stubs: { AVResultOption: AVResultOptionStub },
          components: { AVResultSummaryItem },
        },
      });

      const image = wrapper.find("[data-test=result-group] [data-test=result-image]");
      expect(image.attributes().src).to.eq(imageUrl);
      expect(image.attributes().alt).to.eq("");
      expect(image.attributes()["aria-hidden"]).to.eq("true");
    });

    it("hides seats won when null", () => {
      const wrapper = mount(AVNormalSummary, {
        props: {
          voteCounts: getVoteCounts(),
          sortedResult: [{ ...listResult[0], seatsWon: null }],
          totalCount: 16,
        },
        global: {
          provide: { i18n: localI18n },
          stubs: { AVResultOption: AVResultOptionStub },
          components: { AVResultSummaryItem },
        },
      });

      expect(wrapper.find("[data-test=result-group]").exists()).to.be.true;
      expect(wrapper.find("[data-test=group-seats-won]").exists()).to.be.false;
    });

    it("applies hide flags to children", async () => {
      const wrapper = listWrapper();
      const attr = (name: string) =>
        wrapper.findAll("[data-test=result-option]").map((e) => e.attributes()[name]);

      expect(attr("data-elected")).to.include("true");
      expect(attr("data-tied")).to.include("true");
      expect(attr("hide-elected").every((e) => e === "false")).to.be.true;
      expect(attr("hide-tied").every((e) => e === "false")).to.be.true;

      await wrapper.setProps({ hideElected: true, hideTied: true, disregardBlank: true });

      expect(attr("hide-elected").every((e) => e === "true")).to.be.true;
      expect(attr("hide-tied").every((e) => e === "true")).to.be.true;
      expect(attr("hide-percentage")).to.deep.eq(["false", "false", "false", "false", "true"]);
    });

    it("doesn't use dynamic columns with groups", async () => {
      const wrapper = listWrapper();
      await wrapper.setProps({
        sortedResult: [...listResult, ...Array.from({ length: 8 }, () => listResult[1])],
      });

      expect(wrapper.find(".AVNormalSummary").classes()).not.to.include("dynamic-columns");
    });
  });
});
