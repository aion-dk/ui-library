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
    },
    global: {
      provide: {
        i18n: localI18n,
      },
      directives: {
        tooltip: () => {},
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
    expect(wrapper.find("[data-test=submission-helper]").classes()).to.contain("text-theme-danger");
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

  it("can display weight", async () => {
    expect(wrapper.findAll("[data-test=submission-helper-weight]").length).to.eq(0);

    await wrapper.setProps({
      weight: 14,
    });

    expect(wrapper.findAll("[data-test=submission-helper-weight]").length).to.eq(1);
    expect(wrapper.find("[data-test=submission-helper-weight]").text()).to.contain(
      "Your vote has a weight of 14",
    );
  });

  it("can switch language", async () => {
    await wrapper.setProps({
      locale: "ro",
    });

    expect(wrapper.find("[data-test=submission-helper]").text()).to.contain(
      "Selectați între 1 și 5 opțiuni",
    );
    expect(wrapper.find("[data-test=submission-helper-count]").text()).to.contain("Selectat: 3");
    expect(wrapper.find("[data-test=submission-helper-weight]").text()).to.contain(
      "Votul dvs. are o greutate de 14",
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
});
