import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import localI18n from "@/i18n";
import { getContest, getSelectionPile, getLiveResult } from "@/examples";

import AVBallot from "./AVBallot.vue";
import AVCollapser from "@/components/atoms/AVCollapser";
import AVAnimatedTransition from "@/components/atoms/AVAnimatedTransition";
import AVSearchBallot from "@/components/molecules/AVSearchBallot";
import AVOption from "@/components/molecules/AVOption";
import AVBlankOption from "@/components/molecules/AVBlankOption";
import AVOptionLiveResults from "@/components/atoms/AVOptionLiveResults";
import AVOptionCounter from "@/components/atoms/AVOptionCounter";
import AVSubmissionHelper from "@/components/molecules/AVSubmissionHelper";

describe("AVBallot", () => {
  const wrapper = mount(AVBallot, {
    props: {
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      showSubmissionHelper: false,
      locale: "en",
    },
    global: {
      components: {
        AVCollapser,
        AVAnimatedTransition,
        AVOption,
        AVBlankOption,
        AVSearchBallot,
        AVOptionLiveResults,
        AVOptionCounter,
        AVSubmissionHelper,
      },
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
        AVOptionCheckbox: {
          template: "<span data-test='checkbox' />",
        },
      },
    },
  });

  it("renders properly in list mode", async () => {
    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=option]")[0].text()).to.eq("Example option 1exampleOption1");
    expect(wrapper.findAll("[data-test=option]")[1].text()).to.eq("Example option 2exampleOption2");
    expect(wrapper.findAll("[data-test=option]")[2].text()).to.eq("Example option 3exampleOption3");

    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");
  });

  it("renders properly in gallery mode", async () => {
    await wrapper.setProps({
      contest: getContest(["gallery_short"]),
    });

    expect(wrapper.findAll("[data-test=option]").length).to.eq(12);
    expect(wrapper.findAll("[data-test=parent-bagde]").length).to.eq(12);
    expect(wrapper.findAll("[data-test=option-image]").length).to.eq(12);
    expect(wrapper.findAll("[data-test=option-description]").length).to.eq(12);
    wrapper.findAll("[data-test=parent-bagde]").forEach((badge, index) => {
      if (index < 6) {
        expect(badge.text()).to.contain("Example option 1");
      } else {
        expect(badge.text()).to.contain("Example option 2");
      }
    });
  });

  it("displays selectable parents in gallery mode", async () => {
    await wrapper.setProps({
      contest: getContest(["gallery_parents"]),
    });

    expect(wrapper.findAll("[data-test=option]").length).to.eq(14);
    expect(wrapper.findAll("[data-test=parent-bagde]").length).to.eq(12);
    expect(wrapper.findAll("[data-test=option-image]").length).to.eq(12);
    expect(wrapper.findAll("[data-test=option-description]").length).to.eq(12);
    wrapper.findAll("[data-test=option]").forEach((option, index) => {
      if (index === 0 || index === 7) {
        expect(option.findAll("[data-test=parent-bagde]").length).to.eq(0);
        expect(option.findAll("[data-test=option-image]").length).to.eq(0);
        expect(option.findAll("[data-test=option-description]").length).to.eq(0);
      } else {
        expect(option.findAll("[data-test=parent-bagde]").length).to.eq(1);
        expect(option.findAll("[data-test=option-image]").length).to.eq(1);
        expect(option.findAll("[data-test=option-description]").length).to.eq(1);
      }
    });
  });

  it("can display blank option", async () => {
    await wrapper.setProps({
      contest: getContest([]),
    });

    expect(wrapper.findAll("[data-test=blank-option]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["blank"]),
    });

    expect(wrapper.findAll("[data-test=option]").length).to.eq(3);
    expect(wrapper.findAll("[data-test=blank-option]").length).to.eq(1);
    expect(wrapper.find("[data-test=blank-option]").text()).to.eq("Blankblank");

    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .checked,
    ).to.eq("false");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .invalid,
    ).to.eq("false");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .disabled,
    ).to.eq("false");
  });

  it("can display errors", async () => {
    await wrapper.setProps({
      selectionPile: getSelectionPile(["blank", "multi"]),
    });

    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");

    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .checked,
    ).to.eq("true");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("true");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .invalid,
    ).to.eq("true");
    expect(
      wrapper.find("[data-test=blank-option]").get("[data-test=blank-checkbox]").attributes()
        .disabled,
    ).to.eq("false");

    await wrapper.setProps({
      contest: getContest(["blank", "children_options", "belgian_rules"]),
      selectionPile: {
        multiplier: 1,
        optionSelections: [
          { reference: "exampleChildren1-1" },
          { reference: "exampleChildren2-2" },
        ],
        explicitBlank: false,
      },
    });

    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[5].get("[data-test=checkbox]").attributes().checked,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[5].get("[data-test=checkbox]").attributes()[
        "exclusive-error"
      ],
    ).to.eq("false");
    expect(
      wrapper.findAll("[data-test=option]")[5].get("[data-test=checkbox]").attributes().invalid,
    ).to.eq("true");
    expect(
      wrapper.findAll("[data-test=option]")[5].get("[data-test=checkbox]").attributes().disabled,
    ).to.eq("false");
  });

  it("can perform search", async () => {
    expect(wrapper.findAll("[data-test=search-ballot-input]").length).to.eq(0);

    await wrapper.setProps({
      contest: getContest(["blank", "search_form"]),
      selectionPile: getSelectionPile([]),
    });

    expect(wrapper.findAll("[data-test=search-ballot-input]").length).to.eq(1);
    expect(wrapper.findAll("[data-test=search-result]").length).to.eq(0);

    await wrapper.find("[data-test=search-ballot-input]").setValue("option 2");
    expect(wrapper.findAll("[data-test=search-result]").length).to.eq(1);
    expect(wrapper.find("[data-test=search-result]").text()).to.contain("Example option 2");

    expect(wrapper.findAll("[data-test=option-section]")[1].classes()).to.not.contain(
      "AVOption--highlight",
    );
    await wrapper.find("[data-test=search-result]").trigger("click");
    expect(wrapper.findAll("[data-test=option-section]")[1].classes()).to.contain(
      "AVOption--highlight",
    );
  });

  it("can be disabled", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      disabled: true,
    });

    expect(
      wrapper.findAll("[data-test=option]")[0].get("[data-test=checkbox]").attributes().disabled,
    ).to.contain("true");
    expect(
      wrapper.findAll("[data-test=option]")[1].get("[data-test=checkbox]").attributes().disabled,
    ).to.contain("true");
    expect(
      wrapper.findAll("[data-test=option]")[2].get("[data-test=checkbox]").attributes().disabled,
    ).to.contain("true");
  });

  it("emits view-candidate from option children", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      disabled: false,
    });

    const previousEmits = wrapper.emitted("view-candidate")?.length || 0;

    wrapper.findComponent(AVOption).vm.$emit("view-candidate", "exampleContest", "exampleOption1");

    const emittedEvents = wrapper.emitted("view-candidate");

    expect(emittedEvents).to.have.length(previousEmits + 1);
    expect(emittedEvents?.[previousEmits]).to.deep.eq(["exampleContest", "exampleOption1"]);
  });

  it("calculates voice credits for quadratic voting", async () => {
    await wrapper.setProps({
      contest: getContest(["quadratic_voting"]),
      selectionPile: getSelectionPile(["multivote"]),
      disabled: false,
    });

    const optionWrappers = wrapper.findAllComponents(AVOption);
    const firstOptionVoiceCredits = optionWrappers[0].props("voiceCredits");
    const secondOptionVoiceCredits = optionWrappers[1].props("voiceCredits");

    expect(firstOptionVoiceCredits?.total).to.eq(100);
    expect(firstOptionVoiceCredits?.remaining).to.eq(84);
    expect(firstOptionVoiceCredits?.credits.get("exampleOption1")).to.eq(16);
    expect(secondOptionVoiceCredits?.credits.get("exampleOption2")).to.be.undefined;
  });

  it("can switch language", async () => {
    expect(wrapper.find("[data-test=ballot]").attributes()["aria-label"]).to.eq("Ballot");

    await wrapper.setProps({
      locale: "da",
    });

    expect(wrapper.find("[data-test=ballot]").attributes()["aria-label"]).to.contain(
      "Stemmeseddel",
    );
    expect(wrapper.findAll("[data-test=option]")[0].text()).to.contain("Eksempel mulighed 1");
    expect(wrapper.findAll("[data-test=option]")[1].text()).to.contain("Eksempel mulighed 2");
    expect(wrapper.findAll("[data-test=option]")[2].text()).to.contain("Eksempel mulighed 3");
  });

  it("passes partialResults to AVOption children", async () => {
    await wrapper.setProps({
      locale: "en",
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
    });

    const partialResults = getLiveResult(["exampleOption1"]);
    await wrapper.setProps({ partialResults });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("partialResults")).to.deep.eq(partialResults);
    expect(options[1].props("partialResults")).to.deep.eq(partialResults);
    expect(options[2].props("partialResults")).to.deep.eq(partialResults);
  });

  it("defaults partialResults to null", async () => {
    await wrapper.setProps({ partialResults: undefined });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("partialResults")).to.eq(null);
  });

  it("passes partialResults blank key to AVBlankOption", async () => {
    await wrapper.setProps({
      contest: getContest(["blank"]),
    });

    const partialResults = getLiveResult(["exampleOption1", "blank"]);
    await wrapper.setProps({ partialResults });

    const blankOption = wrapper.findComponent(AVBlankOption);
    expect(blankOption.props("partialResults")).to.deep.eq(partialResults["blank"]);
  });

  it("passes includeLazyErrors to validator", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      includeLazyErrors: true,
    });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("invalid")).to.eq(false);
  });

  it("defaults includeLazyErrors to false", async () => {
    await wrapper.setProps({ includeLazyErrors: undefined });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("invalid")).to.eq(false);
  });

  it("passes imageOption to AVOption children", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      imageOption: "passport",
    });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("imageOption")).to.eq("passport");
    expect(options[1].props("imageOption")).to.eq("passport");
    expect(options[2].props("imageOption")).to.eq("passport");
  });

  it("defaults imageOption to square", async () => {
    await wrapper.setProps({ imageOption: undefined });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("imageOption")).to.eq("square");
  });

  it("passes imageOption to AVOption in gallery mode", async () => {
    await wrapper.setProps({
      contest: getContest(["gallery_short"]),
      imageOption: "passport",
    });

    const options = wrapper.findAllComponents(AVOption);
    options.forEach((option) => {
      expect(option.props("imageOption")).to.eq("passport");
    });
  });

  it("passes reverseOption to AVOption children", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      reverseOption: true,
    });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("reverseOption")).to.eq(true);
    expect(options[1].props("reverseOption")).to.eq(true);
    expect(options[2].props("reverseOption")).to.eq(true);
  });

  it("defaults reverseOption to false", async () => {
    await wrapper.setProps({ reverseOption: undefined });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("reverseOption")).to.eq(false);
  });

  it("passes reverseOption to AVBlankOption", async () => {
    await wrapper.setProps({
      contest: getContest(["blank"]),
      reverseOption: true,
    });

    const blankOption = wrapper.findComponent(AVBlankOption);
    expect(blankOption.props("reverseOption")).to.eq(true);
  });

  it("passes selectionStyle to AVOption children", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      selectionStyle: "background",
    });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("selectionStyle")).to.eq("background");
    expect(options[1].props("selectionStyle")).to.eq("background");
    expect(options[2].props("selectionStyle")).to.eq("background");
  });

  it("defaults selectionStyle to checkbox", async () => {
    await wrapper.setProps({ selectionStyle: undefined });

    const options = wrapper.findAllComponents(AVOption);
    expect(options[0].props("selectionStyle")).to.eq("checkbox");
  });

  it("passes selectionStyle to AVBlankOption", async () => {
    await wrapper.setProps({
      contest: getContest(["blank"]),
      selectionStyle: "background",
    });

    const blankOption = wrapper.findComponent(AVBlankOption);
    expect(blankOption.props("selectionStyle")).to.eq("background");
  });

  it("passes displayErrorModal to AVSubmissionHelper", async () => {
    await wrapper.setProps({
      contest: getContest([]),
      selectionPile: getSelectionPile([]),
      showSubmissionHelper: true,
      displayErrorModal: true,
    });

    const submissionHelper = wrapper.findComponent(AVSubmissionHelper);
    expect(submissionHelper.exists()).to.eq(true);
    expect(submissionHelper.props("displayErrorModal")).to.eq(true);
  });

  it("defaults displayErrorModal to false", async () => {
    await wrapper.setProps({ displayErrorModal: undefined });

    const submissionHelper = wrapper.findComponent(AVSubmissionHelper);
    expect(submissionHelper.props("displayErrorModal")).to.eq(false);
  });
});
