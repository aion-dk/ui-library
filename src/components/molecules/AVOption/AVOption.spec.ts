/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getOption, getContest, getLiveResult } from "@/examples";

import AVOption from "./AVOption.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVOptionSelect from "@/components/atoms/AVOptionSelect";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";

describe("AVOption", () => {
  const wrapper = mount(AVOption, {
    props: {
      option: getOption(["selectable"], 1),
      selections: [],
      contest: getContest([]),
      invalid: false,
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      components: {
        AVCollapser,
        AVAnimatedTransition,
        AVOptionCheckbox,
        AVOptionSelect,
        AVOptionLiveResults,
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=option-container]").text()).to.contain("Example option 1");
    expect(wrapper.findAll("[data-test=option-summary]").length).to.eq(0);
  });

  it("can be selected", async () => {
    expect(wrapper.findAll("[data-test=check]").length).to.eq(0);
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-checked"]).to.eq("false");

    await wrapper.setProps({
      selections: [{ reference: "exampleOption1" }],
    });

    expect(wrapper.findAll("[data-test=check]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-checkbox]").attributes()["aria-checked"]).to.eq("true");

    await wrapper.setProps({
      selections: [],
    });

    expect(wrapper.findAll("[data-test=check]").length).to.eq(0);
    expect(wrapper.emitted().checked).to.not.exist;
    await wrapper.find("[data-test=option-checkbox]").trigger("click");
    expect(wrapper.emitted().checked).to.exist;
    expect((wrapper.emitted().checked as any)[0][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as any)[0][0].amount).to.eq(1);
  });

  it("can be disabled", async () => {
    expect(wrapper.find("[data-test=option]").classes()).to.not.contain("AVOption--disabled");
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.not.contain(
      "AVOptionCheckbox--disabled",
    );
    expect(wrapper.find("[data-test=option-checkbox]").attributes().disabled).to.be.undefined;

    await wrapper.setProps({
      selections: [],
      disabled: true,
    });

    expect(wrapper.find("[data-test=option]").classes()).to.contain("AVOption--disabled");
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain(
      "AVOptionCheckbox--disabled",
    );
    expect(wrapper.find("[data-test=option-checkbox]").attributes().disabled).not.to.be.undefined;
  });

  it("can be invalid", async () => {
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.not.contain(
      "AVOptionCheckbox--error",
    );

    await wrapper.setProps({
      selections: [{ reference: "exampleOption1" }],
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
      invalid: false,
      exclusiveError: true,
    });

    expect(wrapper.findAll("[data-test=exclusive-error]").length).to.eq(1);
    expect(wrapper.find("[data-test=exclusive-error]").text()).to.eq("Exclusive");
    expect(wrapper.find("[data-test=option-checkbox]").classes()).to.contain(
      "AVOptionCheckbox--error",
    );
  });

  it("can display accent color", async () => {
    expect(wrapper.find("[data-test=option-section]").classes()).to.not.include("AVOption--accent");
    expect(wrapper.find("[data-test=option-section]").classes()).to.not.include(
      "border-start-theme",
    );

    await wrapper.setProps({
      option: getOption(["selectable", "color"], 1),
      exclusiveError: false,
    });

    expect(wrapper.find("[data-test=option-section]").classes()).to.include("AVOption--accent");
    expect(wrapper.find("[data-test=option-section]").classes()).to.include("border-start-theme");
  });

  it("can display partial results", async () => {
    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);

    await wrapper.setProps({
      partialResults: getLiveResult(["exampleOption1"]),
    });

    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(1);
    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("5 votes");

    await wrapper.setProps({
      observerMode: true,
    });

    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(1);
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("5 votes");
  });

  it("can show percentages", async () => {
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.not.contain("25.2%");

    await wrapper.setProps({
      partialResults: getLiveResult(["exampleOption1"], true),
    });

    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("25.2%");

    await wrapper.setProps({
      observerMode: false,
    });

    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("25.2%");
  });

  it("can display image", async () => {
    expect(wrapper.findAll("[data-test=option-image]").length).to.eq(0);

    await wrapper.setProps({
      option: getOption(["selectable", "image"], 1),
      partialResults: undefined,
    });

    expect(wrapper.findAll("[data-test=option-image]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-image]").attributes().src).to.eq(
      "https://electa.staging-1.assemblyvoting.net/uploads_proxy/option/image/657750/square",
    );
    expect(wrapper.find("[data-test=option-image]").attributes().alt).to.contain("Option image");
  });

  it("can change image format", async () => {
    expect(wrapper.find("[data-test=option-image]").attributes().src).to.contain("square");
    expect(wrapper.find("[data-test=option-image]").attributes().src).to.not.contain("passport");

    await wrapper.setProps({
      imageOption: "passport",
    });

    expect(wrapper.find("[data-test=option-image]").attributes().src).to.not.contain("square");
    expect(wrapper.find("[data-test=option-image]").attributes().src).to.contain("passport");
  });

  it("can have children", async () => {
    expect(wrapper.findAll("[data-test=option-children]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=option-expander]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=option-child-selected]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=option-children]").length).to.eq(0);

    await wrapper.setProps({
      option: getOption(["selectable", "children"], 1),
      contest: getContest(["children_options"]),
    });

    expect(wrapper.findAll("[data-test=option-children]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
    expect(wrapper.find("[data-test=option-children]").text()).to.contain("Child option 1.1");
    expect(wrapper.find("[data-test=option-children]").text()).to.contain("Child option 1.2");
  });

  it("can be collapsed", async () => {
    expect(wrapper.findAll("[data-test=option-expander]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["children_options", "collapsable"]),
      selections: [{ reference: "exampleChildren1-2" }],
    });

    expect(wrapper.findAll("[data-test=option-expander]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-expander]").text()).to.contain("Click to expand");
    expect(wrapper.find("[data-test=option-children]").text()).to.contain("1 selected");
    await wrapper.find("[data-test=collapser-button]").trigger("click");
    expect(wrapper.find("[data-test=option-expander]").text()).to.contain("Collapse");
    expect(wrapper.find("[data-test=option-children]").text()).to.not.contain("1 selected");
    await wrapper.find("[data-test=collapser-button]").trigger("click");
    expect(wrapper.find("[data-test=option-expander]").text()).to.contain("Click to expand");
    expect(wrapper.find("[data-test=option-children]").text()).to.contain("1 selected");
  });

  it("can handle multivote with less than 5 crosses", async () => {
    await wrapper.setProps({
      option: getOption(["selectable"], 1),
      selections: [],
    });

    expect(wrapper.findAll("[data-test=option-checkbox]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.contain(
      "AVOption--singlevote",
    );
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.not.contain("bg-secondary");

    await wrapper.setProps({
      contest: getContest(["multiple_votes_sm"]),
    });

    expect(wrapper.findAll("[data-test=option-checkbox]").length).to.eq(5);
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.not.contain(
      "AVOption--singlevote",
    );
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.contain(
      "AVOption--multivote-aside",
    );
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.contain("bg-secondary");
  });

  it("can handle multivote with more than 5 crosses", async () => {
    await wrapper.setProps({
      contest: getContest(["multiple_votes_lg"]),
    });

    expect(wrapper.findAll("[data-test=option-checkbox]").length).to.eq(10);
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.not.contain(
      "AVOption--singlevote",
    );
    expect(wrapper.find("[data-test=option-multivote]").classes()).to.contain(
      "AVOption--multivote-footer",
    );

    expect(wrapper.emitted().checked.length).to.eq(1);
    await wrapper.findAll("[data-test=option-checkbox]")[6].trigger("click");
    expect(wrapper.emitted().checked.length).to.eq(2);
    expect((wrapper.emitted().checked as any)[1][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as any)[1][0].amount).to.eq(7);
  });

  it("can have a candidacy attached", async () => {
    expect(wrapper.findAll("[data-test=option-candidacy]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest([]),
      option: getOption(["selectable", "candidacy"], 1),
    });

    expect(wrapper.findAll("[data-test=option-candidacy]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-candidacy]").text()).to.contain("View candidate");

    expect(wrapper.emitted()["view-candidate"]).to.not.exist;
    await wrapper.find("[data-test=option-candidacy]").trigger("click");
    expect((wrapper.emitted()["view-candidate"] as any)[0][0]).to.eq(1); // candidate ID
  });

  it("can display links", async () => {
    expect(wrapper.findAll("[data-test=option-link]").length).to.eq(0);

    await wrapper.setProps({
      option: getOption(["selectable", "url"], 1),
    });

    expect(wrapper.findAll("[data-test=option-link]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-link]").text()).to.contain("Info");
    expect(wrapper.find("[data-test=option-link]").attributes().href).to.eq(
      "https://www.google.com/",
    );
    expect(wrapper.find("[data-test=option-link]").attributes().target).to.eq("_blank");
  });

  it("can display description", async () => {
    expect(wrapper.findAll("[data-test=option-description]").length).to.eq(0);

    await wrapper.setProps({
      option: getOption(["selectable", "description", "url"], 1),
    });

    expect(wrapper.findAll("[data-test=option-description]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-description]").text()).to.contain(
      "This is a description...",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "da",
    });

    expect(wrapper.find("[data-test=option-content]").text()).to.contain("Eksempel mulighed 1");
    expect(wrapper.find("[data-test=option-description]").text()).to.contain(
      "Dette er en beskrivelse...",
    );
    expect(wrapper.find("[data-test=option-link]").attributes().href).to.eq(
      "https://www.google.dk",
    );
  });
});
