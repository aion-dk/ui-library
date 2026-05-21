import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";

import AVSubmissionHelper from "./AVSubmissionHelper.vue";

describe("AVSubmissionHelper", () => {
  const wrapper = mount(AVSubmissionHelper, {
    props: {
      minMarks: 1,
      maxMarks: 1,
      chosenCount: 1,
      errors: [],
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders properly", async () => {
    expect(wrapper.find("[data-test=submission-helper]").text()).to.contain(
      "Select one (1) option",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]").length).to.eq(0);
    expect(wrapper.find("[data-test=submission-helper]").classes()).to.not.contain(
      "AVSubmissionHelper--danger",
    );
  });

  it("can track marks", async () => {
    await wrapper.setProps({
      chosenCount: 3,
      maxMarks: 5,
    });

    expect(wrapper.find("[data-test=submission-helper]").text()).to.contain(
      "Select between 1 and 5 options",
    );
    expect(wrapper.find("[data-test=submission-helper-count]").text()).to.contain("Selected: 3");
  });

  it("can display exclusive", async () => {
    await wrapper.setProps({
      hasExclusiveOptions: true,
    });

    expect(wrapper.find("[data-test=submission-helper]").text()).to.contain(
      "Select between 1 and 5 options. Or select one (1) exclusive option",
    );
  });

  it("can display an exclusive error", async () => {
    await wrapper.setProps({
      errors: [{ message: "exclusive" }],
    });

    expect(wrapper.findAll("[data-test=submission-helper-error]").length).to.eq(1);
    expect(wrapper.find("[data-test=submission-helper-error]").text()).to.contain(
      "Exclusive options cannot be combined with other options",
    );
    expect(wrapper.find("[data-test=submission-helper]").classes()).to.contain("bg-theme-danger");
  });

  it("can display an error", async () => {
    await wrapper.setProps({
      hasExclusiveOptions: false,
      errors: [{ message: "too_many" }],
    });

    expect(wrapper.findAll("[data-test=submission-helper-error]").length).to.eq(1);
    expect(wrapper.find("[data-test=submission-helper-error]").text()).to.contain(
      "Too many options selected",
    );
  });

  it("can display multiple errors", async () => {
    await wrapper.setProps({
      errors: [
        { message: "blank" },
        { message: "cross_party_voting" },
        { message: "write_in_required" },
        { message: "write_in_too_long" },
        { message: "exceeded_list_limit" },
      ],
    });

    expect(wrapper.findAll("[data-test=submission-helper-error]").length).to.eq(5);
    expect(wrapper.findAll("[data-test=submission-helper-error]")[0].text()).to.contain(
      "Blank is exclusive and cannot be combined with other options",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[1].text()).to.contain(
      "Your selection included more than one list. Please select only within a single list",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[2].text()).to.contain(
      "You are required to specify at least a party when 'Write in' is selected",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[3].text()).to.contain(
      "The write in value is too long. Try to reduce its length",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[4].text()).to.contain(
      "Your selection exceeded the maximum amount of options",
    );
  });

  it("can display credits", async () => {
    expect(wrapper.findAll("[data-test=submission-helper-quadratic]").length).to.eq(0);

    await wrapper.setProps({
      voiceCredits: {
        total: 100,
        remaining: 86,
        credits: new Map(),
      },
    });

    expect(wrapper.findAll("[data-test=submission-helper-quadratic]").length).to.eq(1);
    expect(wrapper.find("[data-test=submission-helper-quadratic]").text()).to.contain(
      "Remaining voice credits:86/100",
    );
  });

  it("can display scroll to bottom", async () => {
    expect(wrapper.findAll("[data-test=scroll-bottom]").length).to.eq(0);

    await wrapper.setProps({
      displayScrollToBottom: true,
    });

    expect(wrapper.findAll("[data-test=scroll-bottom]").length).to.eq(1);
    expect(wrapper.find("[data-test=scroll-bottom]").text()).to.contain("Go to the bottom");

    await wrapper.find("[data-test=scroll-bottom]").trigger("click");
    // Can't actually test the scrolling as it is pointing to an external HTML element.
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "ro",
    });
    expect(wrapper.find("[data-test=scroll-bottom]").text()).to.contain("Mergeți la partea de jos");
    expect(wrapper.find("[data-test=submission-helper]").text()).to.contain(
      "Selectați între 1 și 5 opțiuni",
    );
    expect(wrapper.find("[data-test=submission-helper-count]").text()).to.contain("Selectat: 3");
    expect(wrapper.find("[data-test=submission-helper-quadratic]").text()).to.contain(
      "Credite vocale rămase:86/100",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[0].text()).to.contain(
      "Golul este exclusiv și nu poate fi combinat cu alte opțiuni",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[1].text()).to.contain(
      "Selecția dvs. a inclus mai mult de o listă. Vă rugăm să selectați doar dintr-o singură listă",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[2].text()).to.contain(
      "Trebuie să specificați cel puțin un partid când este selectată opțiunea „Scrieți în”",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[3].text()).to.contain(
      "Valoarea introdusă pentru scriere este prea lungă. Încercați să o scurtați",
    );
    expect(wrapper.findAll("[data-test=submission-helper-error]")[4].text()).to.contain(
      "Selecția dvs. a depășit numărul maxim de opțiuni",
    );
  });

  it("does not render error modal when displayErrorModal is false", async () => {
    await wrapper.setProps({
      errors: [{ message: "too_many" }],
      displayErrorModal: false,
    });

    expect(wrapper.findAll("[data-test=error-modal]").length).to.eq(0);
  });

  it("renders error modal when displayErrorModal is true and errors exist", async () => {
    await wrapper.setProps({
      locale: "en",
      errors: [{ message: "too_many" }],
      displayErrorModal: true,
    });

    expect(wrapper.findAll("[data-test=error-modal]").length).to.eq(1);
    expect(wrapper.find("[data-test=dismiss-error-modal]").text()).to.contain("Dismiss");
  });

  it("closes error modal when dismiss button is clicked", async () => {
    await wrapper.find("[data-test=dismiss-error-modal]").trigger("click");

    expect(wrapper.findAll("[data-test=error-modal]").length).to.eq(0);
  });

  it("does not show error modal when there are no errors even with displayErrorModal true", async () => {
    await wrapper.setProps({
      errors: [],
      displayErrorModal: true,
    });

    expect(wrapper.findAll("[data-test=error-modal]").length).to.eq(0);
  });

  it("shows inline errors when displayErrorModal is false", async () => {
    await wrapper.setProps({
      errors: [{ message: "too_many" }],
      displayErrorModal: false,
    });

    expect(wrapper.findAll("[data-test=submission-helper-error]").length).to.eq(1);
  });

  it("hides inline errors when displayErrorModal is true", async () => {
    await wrapper.setProps({
      errors: [{ message: "too_many" }],
      displayErrorModal: true,
    });

    expect(wrapper.findAll("[data-test=submission-helper-error]").length).to.eq(0);
  });
});

describe("AVSubmissionHelper with policy inline results", () => {
  const wrapper = mount(AVSubmissionHelper, {
    props: {
      minMarks: 1,
      maxMarks: 3,
      chosenCount: 0,
      errors: [],
      locale: "en",
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
      },
      stubs: {
        AVIcon: {
          template: "<span />",
        },
      },
    },
  });

  it("renders policy warning feedback inline", async () => {
    await wrapper.setProps({
      chosenCount: 1,
      policyInlineResults: [
        {
          scenario: "undervote_between",
          allowed: true,
          warning: true,
          blocked: false,
          feedbackMessage: "warnings.undervote_between",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      ],
    });

    expect(wrapper.findAll("[data-test=submission-helper-policy-feedback]").length).to.eq(1);
    expect(wrapper.find("[data-test=submission-helper-policy-feedback]").text()).to.contain(
      "You have selected fewer than the maximum allowed options",
    );
  });

  it("renders policy error feedback inline", async () => {
    await wrapper.setProps({
      chosenCount: 1,
      policyInlineResults: [
        {
          scenario: "undervote_below_min",
          allowed: false,
          warning: false,
          blocked: true,
          feedbackMessage: "errors.undervote_below_min",
          feedbackScreen: "ballot_page",
          feedbackType: "on_screen_message",
        },
      ],
    });

    expect(wrapper.findAll("[data-test=submission-helper-policy-feedback]").length).to.eq(1);
  });

  it("does not render policy feedback when no results", async () => {
    await wrapper.setProps({
      policyInlineResults: [],
    });

    expect(wrapper.findAll("[data-test=submission-helper-policy-feedback]").length).to.eq(0);
  });
});
