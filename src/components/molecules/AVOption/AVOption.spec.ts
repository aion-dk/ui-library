import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getOption, getContest, getLiveResult } from "@/examples";
import type { VitestEmitted } from "@/types";

import AVOption from "./AVOption.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVOptionSelect from "@/components/atoms/AVOptionSelect";
import AVOptionCheckbox from "@/components/atoms/AVOptionCheckbox";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";
import AVTweenedCount from "@/components/atoms/AVTweenedCount";

describe("AVOption", () => {
  const wrapper = mount(AVOption, {
    props: {
      option: getOption(["selectable"], 1),
      selections: [],
      contest: getContest([]),
      invalid: false,
      locale: "en",
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
        AVTweenedCount,
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
    await wrapper.find("[data-test=option-section]").trigger("click");
    expect(wrapper.emitted().checked).to.exist;
    expect((wrapper.emitted().checked as VitestEmitted)[0][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as VitestEmitted)[0][0].amount).to.eq(1);
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
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.not.include(
      "border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.not.include(
      "border-left-color: #FF0000;",
    );

    await wrapper.setProps({
      option: getOption(["selectable", "color"], 1),
      exclusiveError: false,
    });

    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-color: #FF0000;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.not.include(
      "border-top-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.not.include(
      "border-top-color: #FF0000;",
    );
  });

  it("can display partial results", async () => {
    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);

    await wrapper.setProps({
      partialResults: getLiveResult(["exampleOption1"]),
    });

    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(1);
    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("0  votes");

    let isReady = false;
    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("5  votes");
        isReady = false;
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );

    await wrapper.setProps({
      observerMode: true,
    });

    expect(wrapper.findAll("[data-test=partial-results-external]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=partial-results-internal]").length).to.eq(1);
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("0  votes");

    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("5  votes");
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );
  });

  it("can show percentages", async () => {
    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.not.contain("0.0%");

    await wrapper.setProps({
      partialResults: getLiveResult(["exampleOption1"], true),
    });

    expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("0.0%");

    let isReady = false;
    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.find("[data-test=partial-results-internal]").text()).to.contain("25.2%");
        isReady = false;
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );

    await wrapper.setProps({
      observerMode: false,
    });

    expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("0.0%");

    setTimeout(() => (isReady = true), 1100);
    await vi.waitFor(
      () => {
        if (!isReady) throw new Error("Animation failed");
        expect(wrapper.find("[data-test=partial-results-external]").text()).to.contain("25.2%");
      },
      {
        timeout: 2000,
        interval: 500,
      },
    );
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

    await wrapper.setProps({
      option: getOption(["selectable", "children"], 1),
      contest: getContest(["children_options"]),
    });

    expect(wrapper.findAll("[data-test=option-children]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
    expect(wrapper.find("[data-test=option-children]").text()).to.contain("Child option 1.1");
    expect(wrapper.find("[data-test=option-children]").text()).to.contain("Child option 1.2");
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

    await wrapper.find("[data-test=option-section]").trigger("click");
    expect((wrapper.emitted().checked as VitestEmitted)[1][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as VitestEmitted)[1][0].amount).to.eq(5);
    await wrapper.findAll("[data-test=option-checkbox]")[2].trigger("click");
    expect((wrapper.emitted().checked as VitestEmitted)[2][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as VitestEmitted)[2][0].amount).to.eq(3);
    await wrapper.find("[data-test=option-section]").trigger("click");
    expect((wrapper.emitted().checked as VitestEmitted)[3][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as VitestEmitted)[3][0].amount).to.eq(5);
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

    expect(wrapper.emitted().checked.length).to.eq(4);
    await wrapper.findAll("[data-test=option-checkbox]")[6].trigger("click");
    expect(wrapper.emitted().checked.length).to.eq(5);
    expect((wrapper.emitted().checked as VitestEmitted)[4][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as VitestEmitted)[4][0].amount).to.eq(7);
  });

  it("can support write-ins", async () => {
    expect(wrapper.find("[data-test=option-title]").html()).not.to.contain("label");
    expect(wrapper.findAll("[data-test=write-in-exampleOption1-input]").length).to.eq(0);
    expect(wrapper.findAll("[data-test=space-counter]").length).to.eq(0);

    await wrapper.setProps({
      option: getOption(["selectable", "write_in"], 1),
      contest: getContest([]),
    });

    expect(wrapper.find("[data-test=option-title]").html()).to.contain("label");
    expect(wrapper.findAll("[data-test=write-in-exampleOption1-input]").length).to.eq(1);
    expect(wrapper.find("[data-test=space-counter]").text()).to.eq("0 / 20");

    expect(wrapper.emitted().checked.length).to.eq(5);
    await wrapper.find("[data-test=write-in-exampleOption1-input]").trigger("click");
    await wrapper.find("[data-test=write-in-exampleOption1-input]").setValue("Less than 20");
    expect(wrapper.find("[data-test=space-counter]").text()).to.eq("12 / 20");
    expect((wrapper.emitted().checked as VitestEmitted)[5][0].text).to.eq("Less than 20");
    expect((wrapper.emitted().checked as VitestEmitted)[5][0].onlyUpdate).to.be.true;
    expect(wrapper.findAll(".invalid-feedback").length).to.eq(0);
    await wrapper
      .find("[data-test=write-in-exampleOption1-input]")
      .setValue("Way more than 20 characters");
    expect(wrapper.find("[data-test=space-counter]").text()).to.eq("27 / 20");
    await wrapper.find("[data-test=write-in-exampleOption1-input]").trigger("click");
    expect((wrapper.emitted().checked as VitestEmitted)[6][0].text).to.eq(
      "Way more than 20 characters",
    );
    expect((wrapper.emitted().checked as VitestEmitted)[6][0].onlyUpdate).to.be.true;

    await wrapper.setProps({
      option: getOption(["selectable"], 1),
    });
  });

  it("can have a candidacy attached", async () => {
    expect(wrapper.findAll("[data-test=option-candidacy]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["children_options"]),
      option: getOption(["selectable", "candidacy", "children"], 1),
    });

    expect(wrapper.findAll("[data-test=option-candidacy]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=option-candidacy]")[0].text()).to.contain("View candidate");

    expect(wrapper.emitted()["view-candidate"]).to.not.exist;
    await wrapper.findAll("[data-test=option-candidacy]")[0].trigger("click");
    expect((wrapper.emitted()["view-candidate"] as VitestEmitted)[0][0]).to.eq("exampleContest"); // contest reference
    expect((wrapper.emitted()["view-candidate"] as VitestEmitted)[0][1]).to.eq("exampleOption1"); // option reference
    await wrapper.findAll("[data-test=option-candidacy]")[2].trigger("click");
    expect((wrapper.emitted()["view-candidate"] as VitestEmitted)[1][0]).to.eq("exampleContest"); // contest reference
    expect((wrapper.emitted()["view-candidate"] as VitestEmitted)[1][1]).to.eq(
      "exampleChildren1-2",
    ); // option reference
  });

  it("can display links", async () => {
    expect(wrapper.findAll("[data-test=option-link]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest([]),
      option: getOption(["selectable", "url"], 1),
    });

    expect(wrapper.findAll("[data-test=option-link]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-link]").text()).to.contain("Info");
    expect(wrapper.find("[data-test=option-link]").attributes().href).to.eq(
      "https://www.google.com/",
    );
    expect(wrapper.find("[data-test=option-link]").attributes().target).to.eq("_blank");

    await wrapper.setProps({
      option: getOption(["selectable"], 1),
    });
  });

  it("can display videos", async () => {
    expect(wrapper.findAll("[data-test=option-link]").length).to.eq(0);

    await wrapper.setProps({
      option: getOption(["selectable", "video"], 1),
    });

    expect(wrapper.findAll("[data-test=option-link]").length).to.eq(1);
    expect(wrapper.find("[data-test=option-link]").text()).to.contain("Video");
    expect(wrapper.find("[data-test=option-link]").attributes().href).to.eq(
      "https://www.youtube.com/watch?v=Lzmt-g4Xf6k",
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

  it("can work on gallery mode", async () => {
    expect(wrapper.findAll("[data-test=parent-bagde]").length).to.eq(0);
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.not.include(
      "border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.not.include(
      "border-left-color: #FF0000;",
    );

    await wrapper.setProps({
      option: getOption(["selectable", "image", "color", "children"], 1),
      contest: getContest(["gallery", "children_options"]),
      parentTitle: "Fruit",
    });

    expect(wrapper.findAll("[data-test=option-children]").length).to.eq(0);
    expect(wrapper.find("[data-test=parent-bagde]").text()).to.contain("Fruit");
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-color: #FF0000;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-top-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-top-color: #FF0000;",
    );

    await wrapper.find("[data-test=option-section]").trigger("click");
    expect((wrapper.emitted().checked as VitestEmitted)[5][0].reference).to.eq("exampleOption1");
    expect((wrapper.emitted().checked as VitestEmitted)[5][0].amount).to.eq(1);
  });

  it("can inherit parent accent color", async () => {
    await wrapper.setProps({
      parentColor: "#0000FF",
    });

    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-color: #FF0000;",
    );

    await wrapper.setProps({
      option: getOption(["selectable", "image", "children"], 1),
    });

    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-left-color: #0000FF;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-top-width: 0.5rem;",
    );
    expect(wrapper.find("[data-test=option-section]").attributes().style).to.include(
      "border-top-color: #0000FF;",
    );

    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.include(
      "background-color: rgb(0, 0, 255);",
    );
    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.include("color: white;");

    await wrapper.setProps({
      parentColor: "#00FF00",
    });

    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.include(
      "background-color: rgb(0, 255, 0);",
    );
    expect(wrapper.find("[data-test=parent-bagde]").attributes().style).to.include("color: black;");
  });

  it("can relocate title on gallery mode when no image", async () => {
    expect(wrapper.find("[data-test=option-header]").text()).to.not.include("Example option 1");
    expect(wrapper.find("[data-test=option-summary]").text()).to.include("Example option 1");

    await wrapper.setProps({
      option: getOption(["selectable", "children", "description", "url"], 1),
    });

    expect(wrapper.find("[data-test=option-header]").text()).to.include("Example option 1");
    expect(wrapper.find("[data-test=option-summary]").text()).to.not.include("Example option 1");
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "da",
    });

    expect(wrapper.find("[data-test=parent-bagde]").text()).to.contain("Fruit"); // Doesn't change because is sent from parent

    expect(wrapper.find("[data-test=option-title]").text()).to.contain("Eksempel mulighed 1");
    expect(wrapper.find("[data-test=option-description]").text()).to.contain(
      "Dette er en beskrivelse...",
    );
    expect(wrapper.find("[data-test=option-link]").attributes().href).to.eq(
      "https://www.google.dk",
    );
  });
});
