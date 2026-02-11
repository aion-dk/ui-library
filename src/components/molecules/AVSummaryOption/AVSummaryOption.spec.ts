import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getOption } from "@/examples";

import AVSummaryOption from "./AVSummaryOption.vue";

describe("AVSummaryOption", () => {
  const wrapper = mount(AVSummaryOption, {
    props: {
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 1,
        rank: undefined,
        locale: "en",
        reference: getOption([], 1).reference,
      },
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      stubs: {
        AVOptionCheckbox: {
          template: "<span />",
        },
        AVIcon: {
          template: `<span data-test="write-in-icon" />`,
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.text()).to.contain("Example option 1");
    expect(wrapper.findAll("[data-test=summary-cross]").length).to.eq(1);
    expect(wrapper.find("[data-test=summary-cross]").attributes().checked).to.eq("true");
    expect(wrapper.find("[data-test=summary-cross]").attributes().disabled).to.eq("true");
    expect(wrapper.find("[data-test=summary-option]").attributes()["aria-label"]).to.eq("Option");
  });

  it("can display blank", async () => {
    await wrapper.setProps({
      option: undefined,
      blank: true,
    });

    expect(wrapper.text()).to.contain("Blank");
  });

  it("can display rank", async () => {
    expect(wrapper.find("[data-test=summary-cross]").attributes().rank).to.be.undefined;

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 1,
        rank: 2,
        reference: getOption([], 1).reference,
      },
      blank: false,
    });

    expect(wrapper.find("[data-test=summary-cross]").attributes().rank).to.eq("2");
  });

  it("can display hierarchy", async () => {
    expect(wrapper.findAll("[data-test=summary-option-ancestry]").length).to.eq(0);

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 1,
        rank: undefined,
        reference: getOption([], 1).reference,
      },
      parents: [{ title: { en: "Parent 1" } }, { title: { en: "Parent 2" } }],
    });

    expect(wrapper.findAll("[data-test=summary-option-ancestry]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=breadcrumb-item]").length).to.eq(2);
    expect(wrapper.findAll("[data-test=breadcrumb-item]")[0].text()).to.eq("Parent 2");
    expect(wrapper.findAll("[data-test=breadcrumb-item]")[1].text()).to.eq("Parent 1");
  });

  it("can display multiple votes", async () => {
    expect(wrapper.findAll("[data-test=summary-cross]").length).to.eq(1);

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 5,
        rank: undefined,
        reference: getOption([], 1).reference,
      },
      parents: [],
      multipleVotesAllowed: true,
    });

    expect(wrapper.findAll("[data-test=summary-cross]").length).to.eq(5);
  });

  it("can display images", async () => {
    expect(wrapper.findAll("[data-test=summary-option-image]").length).to.eq(0);

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 1,
        rank: undefined,
        image: "http://image.com",
        reference: getOption([], 1).reference,
      },
      multipleVotesAllowed: false,
    });

    expect(wrapper.findAll("[data-test=summary-option-image]").length).to.eq(1);
    expect(wrapper.find("[data-test=summary-option-image]").attributes().src).to.eq(
      "http://image.com/square",
    );
    expect(wrapper.find("[data-test=summary-option-image]").attributes().alt).to.eq("Option image");
  });

  it("can display accent color", async () => {
    expect(wrapper.find("[data-test=summary-option]").attributes().style).to.not.contain(
      "border-left-color: #FF0000; border-left-width: 0.5rem",
    );

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        crosses: 1,
        accentColor: "#FF0000",
        reference: getOption([], 1).reference,
      },
      multipleVotesAllowed: false,
    });

    expect(wrapper.find("[data-test=summary-option]").attributes().style).to.contain(
      "border-left-color: #FF0000; border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=summary-option]").attributes().style).to.not.contain(
      "border-top-color: #FF0000; border-top-width: 0.5rem;",
    );
  });

  it("can render in gallery mode", async () => {
    expect(wrapper.find("[data-test=summary-option]").attributes().style).to.not.contain(
      "border-left-color: #FF00FF; border-left-width: 0.5rem",
    );
    expect(wrapper.findAll("[data-test=parent-bagde]").length).to.eq(0);

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        handle: getOption([], 1).reference,
        image: "http://image.com",
        crosses: 1,
        reference: getOption([], 1).reference,
      },
      multipleVotesAllowed: false,
      parents: [{ title: { en: "Parent 1" }, accentColor: "#FF00FF" }],
      galleryMode: true,
    });

    expect(wrapper.find("[data-test=summary-option]").attributes().style).to.contain(
      "border-left-color: #FF00FF; border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=summary-option]").attributes().style).to.contain(
      "border-top-color: #FF00FF; border-top-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=parent-bagde]").text()).to.contain("Parent 1");
    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.contain(
      "background-color: rgb(255, 0, 255);",
    );
    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.contain("color: black;");

    await wrapper.setProps({
      parents: [{ title: { en: "Parent 1" }, accentColor: "#0000AA" }],
    });

    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.contain(
      "background-color: rgb(0, 0, 170);",
    );
    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.contain("color: white;");
  });

  it("can display description", async () => {
    expect(wrapper.findAll("[data-test=summary-option-description]").length).to.eq(0);

    await wrapper.setProps({
      option: {
        title: getOption([], 1).title,
        description: getOption(["description"], 1).description,
        handle: getOption([], 1).reference,
        image: "http://image.com",
        crosses: 1,
        reference: getOption([], 1).reference,
      },
    });

    expect(wrapper.find("[data-test=summary-option-description]").html()).to.contain(
      "<p>This is a description...</p>",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "nl",
    });

    expect(wrapper.find("[data-test=summary-option]").attributes()["aria-label"]).to.eq("Optie");
    expect(wrapper.find("[data-test=summary-option-image]").attributes().alt).to.eq(
      "Optie afbeelding",
    );
    expect(wrapper.find("[data-test=summary-option-description]").html()).to.contain(
      "<p>Dit is een beschrijving...</p>",
    );
  });

  it("can display write-ins", async () => {
    expect(wrapper.findAll("[data-test=write-in-icon]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=write-in-badge]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=write-in-section]").length).to.eq(0);

    await wrapper.setProps({
      locale: "en",
      writeIn: "Here's something I wrote",
    });

    expect(wrapper.findAll("[data-test=write-in-icon]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=write-in-badge]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=write-in-section]").length).to.eq(1);
    expect(wrapper.find("[data-test=write-in-icon]").attributes().icon).to.eq("signature");
    expect(wrapper.find("[data-test=write-in-badge]").text()).to.contain("Write in");
    expect(wrapper.find("[data-test=write-in-section]").text()).to.contain(
      "Here's something I wrote",
    );
  });
});
